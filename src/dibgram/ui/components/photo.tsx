import React from 'react';
import TdApi from '../../TdWeb/td_api';
import { getFileContent, blobToUrl } from '../../TdWeb/file';
import './photo.scss';
import DownloadCircle from './download-circle';
import TdLib from '../../TdWeb/tdlib';

function getBestPhotoSize(sizes: TdApi.td_photoSize[]) {
    // Get smallest photo size with width >= 400
    const sorted= sizes.sort((a, b) => a.width - b.width);
    return sorted.find(s => s.width >= 400) || sorted[0];
}

type PhotoProps = {
    photo: TdApi.td_photo,
    priority?: number,
    getBestSize?: typeof getBestPhotoSize,
}

export default function Photo({photo, priority=1, getBestSize= getBestPhotoSize}: PhotoProps): JSX.Element {
    const [blob, setBlob] = React.useState<Blob | null>(null);
    const [file, setFile] = React.useState<TdApi.td_file | null>(null);

    const onUpdateFile = React.useCallback(function onUpdateFile(upd: TdApi.td_updateFile) {
        if(upd.file.id === file?.id) {
            setFile(upd.file);
        }
    }, [file]);

    React.useEffect(() => {
        if (photo.sizes.length > 0) {
            const size = getBestSize(photo.sizes);
            const fl = size.photo;
            setFile(fl);
            // getFileContent(size.photo, priority).then(part => setBlob(part.data));
            TdLib.sendQuery({
                '@type': 'getFile',
                file_id: fl.id
            }).then(setFile);
            TdLib.registerUpdateHandler<TdApi.td_updateFile>('updateFile', onUpdateFile);
            return ()=> {
                TdLib.unRegisterUpdateHandler<TdApi.td_updateFile>('updateFile', onUpdateFile);
            };
        }
    }, [photo]);

    if (!blob) {
        if(photo.minithumbnail) {
            return (
                <div className='history-photo'>
                    <img src={`data:image/jpeg;base64,${photo.minithumbnail.data}`} alt='thumbnail' className='thumbnail'/>
                    {file && <DownloadCircle file={file}/>}
                </div>
            );
        } else {
            return (
                <div className='history-photo'>
                </div>
            );
        }
    } else {
        return (
            <div className='history-photo'>
                <img src={blobToUrl(blob)} alt='thumbnail'/>
            </div>
        );
    }
        
}