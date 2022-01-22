import TdLib from './tdlib';
import TdApi from './td_api';

/**
 * Downloads a file. Promise is resolved when the file is downloaded.
 * @param file_id ID of file to be downloaded
 * @param priority From 1 to 32, higher number results in earlier download
 * @returns File object
 */
export function downloadFile (file_id: number, priority: number): Promise<TdApi.td_file> {
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
        downloadCallbacks[file_id]= (result: TdApi.td_file) => {
            resolve(result);
            delete downloadCallbacks[file_id];
        };
        onReject=reject;
    });
}
const downloadCallbacks: {[key: number]: (result: TdApi.td_file) => void} = {};

TdLib.registerUpdateHandler<TdApi.td_updateFile>('updateFile', function (update) {
    if(update.file.local.is_downloading_completed){
        downloadCallbacks[update.file.id]?.(update.file);
    }
});

const cachedFiles: {[key: number]: Blob} = {};

/**
 * Gets file content (downloads if necessary). Promise is resolved with a `filePart` object when file content is ready
 * @param file File object
 * @param priority Download priority from 1 to 32. Higher value = earlier download
 * @param enableCache If true, files smaller than 500KiB will be stored in a cache in the RAM.
 * @returns A `filePart` object
 * 
 */
export function getFileContent(file: TdApi.td_file, priority: number, enableCache= true): Promise<TdApi.td_filePart> {
    if(file.id in cachedFiles){ // If we have it in cache, we can use that
        return Promise.resolve({
            '@type': 'filePart',
            data: cachedFiles[file.id]
        });
    }

    function resolveFilePart(filePart: TdApi.td_filePart): TdApi.td_filePart {
        if(enableCache && file.size <= 500*1024) {
            cachedFiles[file.id]=filePart.data;
        }
        return filePart;
    }

    if(file.local.is_downloading_completed){ // File is already downloaded - only read file
        return new Promise((resolve, reject) => {
            TdLib.sendQuery({
                '@type': 'readFilePart',
                'file_id': file.id,
                'offset': 0,
                'count': 0
            }).then((f)=>resolve(resolveFilePart(f as TdApi.td_filePart))).catch(reject);
        });
    } 
    else if(file.local.is_downloading_active){ // File is already being downloaded - gets quite complex here.
        return new Promise((resolve, reject) => {
            const callback = downloadCallbacks[file.id];
            downloadCallbacks[file.id] = (result) => { // Replace old callback with a new callback that calls the old one and also does its own stuff
                callback(result); // Call the old callback
                TdLib.sendQuery({ // Read the file
                    '@type': 'readFilePart',
                    'file_id': file.id,
                    'offset': 0,
                    'count': 0
                }).then((f)=>resolve(resolveFilePart(f as TdApi.td_filePart))).catch(reject);
            };
        });
    } else {
        return new Promise((resolve, reject) => { // File is not downloaded.
            downloadFile(file.id, priority).then(()=> { // Download it...
                TdLib.sendQuery({ // ...then read it
                    '@type': 'readFilePart',
                    'file_id': file.id,
                    'offset': 0,
                    'count': 0
                }).then((f)=>resolve(resolveFilePart(f as TdApi.td_filePart))).catch(reject);
            }).catch(reject);
        });
    }
}

/**
 * Converts a blob to a URL
 * @param blob Blob to convert
 * @returns Created URL
 */
export function blobToUrl (blob: Blob): string {
    return (window.URL || window.webkitURL).createObjectURL(blob);
}
