import React from 'react';
import PropTypes from 'prop-types'; 
import RippleEffect, { handleMyMouseEventsFunction } from '../../ui/elements/ripple-effect';
import { new_chat_photo } from '../../ui/icon/icons';
import './signup-profile-photo.scss';
import { blobToUrl } from '../../TdWeb/file';

export default function SignUpProfilePic({image, onChange}) {
    const ripple= React.useState({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <div className={'icon-button sign-up-profile-pic' + (image? ' has-image' : '')} 
            {...{onMouseDown, onMouseUp, onMouseLeave}}>

            {image && <img src={blobToUrl(image)} alt="profile"/>}
            <RippleEffect {...ripple[0]} color="var(--theme-color-activeButtonBgRipple)" small={true}/>
            <span dangerouslySetInnerHTML={{__html: new_chat_photo}} />
            <label>
                <input type="file" accept="image/*" onChange={onChange} />
            </label>
        </div>
    );
}
SignUpProfilePic.propTypes = {
    image: PropTypes.instanceOf(Blob),
    onChange: PropTypes.func.isRequired
};
