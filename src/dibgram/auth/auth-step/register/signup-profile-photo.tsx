import React from 'react';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../../../ui/elements/ripple-effect';
import { new_chat_photo } from '../../../ui/icon/icons';
import './signup-profile-photo.scss';
import { blobToUrl } from '../../../TdWeb/file';

type SignUpProfilePicProps= {
    image: Blob|null,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function SignUpProfilePic({image, onChange}: SignUpProfilePicProps): React.ReactElement {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
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
