import React from 'react';
import TdApi from '../../TdWeb/td_api';
import { getFileContent, blobToUrl } from '../../TdWeb/file';
import './photo.scss';
import DownloadCircle from './download-circle';
import TdLib from '../../TdWeb/tdlib';

export function getBestPhotoSize(sizes: TdApi.td_photoSize[], minWidth = 400): TdApi.td_photoSize {
    // Get smallest photo size with width >= 400
    const sorted= sizes.sort((a, b) => a.width - b.width);
    return sorted.find(s => s.width >= minWidth) || sorted[0];
}

type PhotoProps = {
    photo: TdApi.td_photo,
    priority?: number,
    getBestSize?: typeof getBestPhotoSize,
    onClick?: () => void,
}

export default function Photo({photo, priority=1, getBestSize= getBestPhotoSize, onClick}: PhotoProps): JSX.Element {
    const [blob, setBlob] = React.useState<Blob | null>(null);
    const [photoSize, setPhotoSize] = React.useState<TdApi.td_photoSize | null>(null);

    const onUpdateFile = React.useCallback(function onUpdateFile(upd: TdApi.td_updateFile) {
        if(upd.file.id === photoSize?.photo?.id) {
            setPhotoSize(s=> (s? {...s, photo: upd.file}: null));
        }
    }, [photoSize?.photo]);

    React.useEffect(() => {
        if (photo.sizes.length > 0) {
            const size = getBestSize(photo.sizes);
            const fl = size.photo;
            setPhotoSize(size);
            // getFileContent(size.photo, priority).then(part => setBlob(part.data));
            TdLib.sendQuery({
                '@type': 'getFile',
                file_id: fl.id
            }).then(f=> setPhotoSize(s=> (s? {...s, photo: f}: null)));
            TdLib.registerUpdateHandler<TdApi.td_updateFile>('updateFile', onUpdateFile);
            return ()=> {
                TdLib.unRegisterUpdateHandler<TdApi.td_updateFile>('updateFile', onUpdateFile);
            };
        }
    }, [photo]);

    React.useEffect(() => {
        if(photoSize?.photo.local.is_downloading_completed) {
            TdLib.sendQuery({
                '@type': 'readFilePart',
                file_id: photoSize.photo.id
            }).then(part => setBlob(part.data));
        } else {
            setBlob(null);
        }
    }, [photoSize?.photo]);

    if(photoSize) {
        let width = photoSize.width, height = photoSize.height;
        if(width > 430) {
            height = height * (430 / width);
            width = 430;
        }
        if(height > 430) {
            width = width * (430 / height);
            height = 430;
        }

        if (!blob) {
            if(photo.minithumbnail) {
                return (
                    <div className='history-photo' onClick={onClick}>
                        <img 
                            src={`data:image/jpeg;base64,${photo.minithumbnail.data}`} 
                            alt='thumbnail' 
                            className='thumbnail behind'
                            height={height}
                            width={width}
                        />
                        <img 
                            src={`data:image/jpeg;base64,${photo.minithumbnail.data}`} 
                            alt='thumbnail' 
                            className='thumbnail'
                            height={height}
                            width={width}
                        />
                        {/**
                         * When a blur is applied, the area around the border becomes dark. 
                         * We can fix it by adding an non-blurred copy of the image behind it.
                         */}
                        <DownloadCircle file={photoSize.photo} priority={priority}/>
                    </div>
                );
            } else {
                return (
                    <div className='history-photo' onClick={onClick}>
                        <DownloadCircle file={photoSize.photo} priority={priority}/>
                    </div>
                );
            }
        } else {
            return (
                <div className='history-photo'>
                    <img 
                        src={blobToUrl(blob)} 
                        alt='thumbnail'
                        onClick={onClick}
                    />
                </div>
            );
        }
    } else {
        return <></>;
    }
}