import React from 'react';
import PropTypes from 'prop-types';
import { blobToUrl, getFileContent } from '../../TdWeb/file';
import options from '../../TdWeb/options';
import './profile-photo.scss';
import tgLogo from '../../ui/img/TgLogo.png';
import { saved_messages, replies_userpic } from '../icon/icons';

/**
 * Converts a name to initials.
 * @param {string} name Input name
 * @returns {string} One or two uppercase letters
 */
export function profileNameToInitials(name) {
    const words=name.replace(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]/g,'') // Remove non-word characters
        .toUpperCase().split(' ');
    if(words[0].length==0){
        return '';
    } else if(words.length===1) {
        return words[0][0];
    } else {
        return words[0][0] + words[words.length-1][0];
    }
}

/**
 * Renders a chat / profile photo.
 */
export default function ProfilePhoto (props) {
    const [photo, setPhoto] = React.useState(null);
    const [photoObj, setPhotoObj] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const isServiceMessages= props.id==options['telegram_service_notifications_chat_id'];
    const isSavedMessages= props.id==options['my_id'];
    const isReplies= props.id==options['replies_bot_chat_id'];
    
    React.useEffect(() => { // Fetch image data
        var mounted=true;
        if(props.photo){
            if(photoObj!=props.photo){ // No need for any fetch if the same photo is already loaded
                getFileContent(props.photo, 8).then(file=> {
                    if(!mounted) return;
                    setPhoto(blobToUrl(file.data));
                    setPhotoObj(props.photo);
                });
            }
        } else { // No photo
            if(photo && photoObj){
                setPhoto(null);
                setPhotoObj(null);
            }
        }
        return ()=> mounted=false;
    }, [props.photo]);

    var customIcon; 
    if(isSavedMessages && (!props?.disableSavedMessages)){ // Use saved messages icon instead of user pic (if not disabled)
        customIcon= [0, saved_messages];
    }
    if(isReplies){ // Replies chat has no icons and we supply one ourselves
        customIcon= [0, replies_userpic];
    }
    if((!props.photo) && isServiceMessages) { // Service messages may have no photo (e.g. on test DC)
        customIcon = [1, tgLogo];
    }
    return (
        <div className="profile-photo">
            {(!loaded || !(props.photo && photo)) && <Initials id={props.id} name={props.name}/>}
            {
                customIcon? (
                    customIcon[0]?
                        <React.Fragment>
                            {(!loaded) && <Initials id={props.id} name={props.name}/>}
                            <img onLoad={()=> setLoaded(true)} src={customIcon[1]}/>
                        </React.Fragment>
                        :
                        <div className="svg" dangerouslySetInnerHTML={{__html: customIcon[1]}}/>
                ) : (
                    (props.photo && photo) && <img onLoad={()=> setLoaded(true)} src={photo}/> 
                )
            }
        </div>
    );
}
ProfilePhoto.propTypes = {
    /** Chat/user name, used for initials */
    name: PropTypes.string.isRequired,
    /** Chat type id (supergroup id, user id, etc.), used for initials background */
    id: PropTypes.number.isRequired,
    /** Chat / user photo (e.g. `chat.photo?.small`) */
    photo: PropTypes.object,
    /** If false, saved messages icon will be used when user_id = my_id */
    disableSavedMessages: PropTypes.bool
};

/** Renders photo initials fallback */
function Initials({id, name}) {
    return (
        <span className={'initials color_'+ getIdColorCode(id)}>
            {profileNameToInitials(name)}
        </span>
    );
}
Initials.propTypes = {
    /** Chat/user name, used to generate initials */
    name: PropTypes.string.isRequired,
    /** Chat type ID, used to generate background color */
    id: PropTypes.number.isRequired
};

export function getIdColorCode(id) {
    const map = [1, 8, 5, 2, 4, 4, 6];
    return map[Math.abs(id || 0) % 7];
}

/**
 * Returns a chat's type ID. (supergroup Id / basic group ID / user ID)
 * @param {import('tdweb').TdObject} chat Input chat
 * @returns Chat type ID
 */
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
