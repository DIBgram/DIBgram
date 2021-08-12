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
        photo: PropTypes.object
    }
    state= {
        photo: null
    }

    componentDidMount(){
        if(this.props.photo){
            getFileContent(this.props.photo, 8).then(file=> {
                this.setState({
                    photo: blobToUrl(file.data)
                });
            });
        }
    }
    render(){
        return (
            <div className="profile-photo">
                {this.state.photo ? 
                    <img src={this.state.photo}/> 
                    : 
                    <span className="initials">
                        {profileNameToInitials(this.props.name)}
                    </span>}
            </div>
        );
    }
}