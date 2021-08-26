import React from 'react';
import PropTypes from 'prop-types';
import { blobToUrl, getFileContent } from '../../TdWeb/file';
import options from '../../TdWeb/options';
import './profile-photo.scss';
import raw from 'raw.macro';

const tgLogo = raw('../../ui/img/TgLogo.svg');

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

export default class ProfilePhoto extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        photo: PropTypes.object
    }

    constructor(props){
        super(props);

        this.state = {
            photo: null,
            photoObj: null,
            isServiceMessages: this.props.id==options['telegram_service_notifications_chat_id']
        };
    }

    componentDidUpdate(){
        if(this.props.photo){
            if(this.state.photoObj!=this.props.photo){
                getFileContent(this.props.photo, 8).then(file=> {
                    this.setState({
                        photo: blobToUrl(file.data),
                        photoObj: this.props.photo
                    });
                });
            }
        } else {
            this.state.photo && this.state.photoObj
                && this.setState({
                    photo: null,
                    photoObj: null
                });
        }
    }

    render(){
        var customIcon; 
        if((!this.state.photo) && this.state.isServiceMessages) {
            customIcon = tgLogo;
        }
        return (
            <div className="profile-photo">
                {(this.props.photo && this.state.photo) ? 
                    <img src={this.state.photo}/> 
                    : 
                    customIcon? <div dangerouslySetInnerHTML={{__html: customIcon}}/> : (
                        <span className={'initials color_'+ ((Math.abs(this.props.id || 0) % 7) + 1)}>
                            {profileNameToInitials(this.props.name)}
                        </span>
                    )
                }
            </div>
        );
    }
}

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
