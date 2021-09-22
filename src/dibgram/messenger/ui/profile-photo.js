import React from 'react';
import PropTypes from 'prop-types';
import { blobToUrl, getFileContent } from '../../TdWeb/file';
import options from '../../TdWeb/options';
import './profile-photo.scss';
import tgLogo from '../../ui/img/TgLogo.png';

export function profileNameToInitials(name) {
    const words=name.replace(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]/g,'').toUpperCase().split(' ');
    if(words[0].length==0){
        return '';
    } else if(words.length===1) {
        return words[0][0];
    } else {
        return words[0][0] + words[words.length-1][0];
    }
}

export default function ProfilePhoto (props) {
    const [photo, setPhoto] = React.useState(null);
    const [photoObj, setPhotoObj] = React.useState(null);
    const isServiceMessages= props.id==options['telegram_service_notifications_chat_id'];
    
    React.useEffect(() => {
        if(props.photo){
            if(photoObj!=props.photo){
                getFileContent(props.photo, 8).then(file=> {
                    setPhoto(blobToUrl(file.data));
                    setPhotoObj(props.photo);
                });
            }
        } else {
            if(photo && photoObj){
                setPhoto(null);
                setPhotoObj(null);
            }
        }
    }, [props.photo]);

    var customIcon; 
    if((!photo) && isServiceMessages) {
        customIcon = [1, tgLogo];
    }
    return (
        <div className="profile-photo">
            {(props.photo && photo) ? 
                <img src={photo}/> 
                : 
                customIcon? (
                    customIcon[0]?
                        <img src={customIcon[1]}/>
                        :
                        <div dangerouslySetInnerHTML={{__html: customIcon}}/>
                ) : (
                    <span className={'initials color_'+ ((Math.abs(props.id || 0) % 7) + 1)}>
                        {profileNameToInitials(props.name)}
                    </span>
                )
            }
        </div>
    );
}

ProfilePhoto.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    photo: PropTypes.object
};

export function getChatTypeId(chat) {
    switch (chat?.type?.['@type']) {
    case 'chatTypeSupergroup': {
        return chat?.type?.supergroup_id;
    }
    case 'chatTypeBasicGroup': {
        return chat?.type?.basic_group_id;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
        return chat?.type?.user_id;
    }
    }
    return null;
}
