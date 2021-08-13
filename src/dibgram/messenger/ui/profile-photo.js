import React from 'react';
import PropTypes from 'prop-types';
import { blobToUrl, getFileContent } from '../../TdWeb/file';
import './profile-photo.scss';

export function profileNameToInitials(name) {
    const words=name.replace(/[^\w\s]/g,'').toUpperCase().split(' ');
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
    state= {
        photo: null,
        photoObj: null
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
        return (
            <div className="profile-photo">
                {(this.props.photo && this.state.photo) ? 
                    <img src={this.state.photo}/> 
                    : 
                    <span className={'initials color_'+ ((Math.abs(this.props.id || 0) % 7) + 1)}>
                        {profileNameToInitials(this.props.name)}
                    </span>
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
