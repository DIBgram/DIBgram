import TdLib from './tdlib';

export function downloadFile (file_id, priority) {
    let onReject;
    TdLib.sendQuery({
        '@type': 'downloadFile',
        'file_id': file_id,
        'priority': priority,
        'offset': 0,
        'limit': 0,
        'synchronous': false
    }).catch(onReject);

    return new Promise((resolve, reject) => {
        downloadCallbacks[file_id]=result=> {
            resolve(result);
            delete downloadCallbacks[file_id];
        };
        onReject=reject;
    });
}
var downloadCallbacks = {};

TdLib.registerUpdateHandler('updateFile', function (update) {
    if(update.file.local.is_downloading_completed){
        downloadCallbacks[update.file.id]?.(update.file);
    }
});

// Downloads the file if it is not already downloaded, then reads the file and returns the file content as a blob.
export function getFileContent(file, priority) {
    if(file.local.is_downloading_completed){
        return TdLib.sendQuery({
            '@type': 'readFilePart',
            'file_id': file.id,
            'offset': 0,
            'count': 0
        });
    } else if(file.local.is_downloading_active){
        return new Promise((resolve, reject) => {
            const callback = downloadCallbacks[file.id];
            downloadCallbacks[file.id] = (result) => {
                callback(result);
                TdLib.sendQuery({
                    '@type': 'readFilePart',
                    'file_id': file.id,
                    'offset': 0,
                    'count': 0
                }).then(resolve).catch(reject);
            };
        });
    } else {
        return new Promise((resolve, reject) => {
            downloadFile(file.id, priority).then(()=> {
                TdLib.sendQuery({
                    '@type': 'readFilePart',
                    'file_id': file.id,
                    'offset': 0,
                    'count': 0
                }).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
}

export function blobToUrl (blob) {
    return (window.URL || window.webkitURL).createObjectURL(blob);
}
