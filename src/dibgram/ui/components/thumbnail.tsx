import React from 'react';
import TdApi from '../../TdWeb/td_api';
import { getFileContent, blobToUrl } from '../../TdWeb/file';
import { getBestPhotoSize } from './photo';

type ThumbnailProps = {
    photo: TdApi.td_photo,
    priority?: number,
}

export default function Thumbnail({photo, priority=1}: ThumbnailProps): JSX.Element {
    const [blob, setBlob] = React.useState<Blob | null>(null);
    React.useEffect(() => {
        const size= getBestPhotoSize(photo.sizes, 50); // Use the smallest size
        getFileContent(size.photo, priority).then(filePart => {
            setBlob(filePart.data);
        });
    }, [photo]);

    if (!blob) {
        if(photo.minithumbnail) {
            return (
                <img className='photo-thumbnail' src={`data:image/jpeg;base64,${photo.minithumbnail.data}`} alt='thumbnail'/>
            );
        } else {
            return <></>;
        }
    } else {
        return (
            <img className='photo-thumbnail' src={blobToUrl(blob)} alt='thumbnail'/>
        );
    }
        
}