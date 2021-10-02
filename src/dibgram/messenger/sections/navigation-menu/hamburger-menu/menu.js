import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import TdLib from '../../../../TdWeb/tdlib';
import ProfilePhoto from '../../../../ui/components/profile-photo';

export default function HamburgerMenu ({visible, onClose}) {
    const [me, setMe] = React.useState(null);
    React.useEffect(() => {
        TdLib.sendQuery({
            '@type': 'getMe'
        }).then(result => {
            if(result.phone_number) {
                TdLib.sendQuery({
                    '@type': 'getPhoneNumberInfo',
                    phone_number_prefix: result.phone_number
                }).then(info => {
                    result.phone_number= `+${info.country_calling_code} ${info.formatted_phone_number}`;
                    setMe(result);
                });
            } 
            else setMe(result);
        });
    }, []);
    /**@type React.KeyboardEventHandler<HTMLDivElement> */
    function onKeyDown (e){
        if(e.key === 'Escape') {
            onClose();
        }
    }
    return (
        <div id="hamburger-menu" className={visible ? 'visible' : ''} 
            onKeyDown={onKeyDown} tabIndex={0}>
            <div className="content">
                <div className="header">
                    <div className="row-1">
                        <ProfilePhoto 
                            id={me?.id || 0} 
                            name={(me?.first_name || '') + (me?.last_name? (' ' + me.last_name) : '')} 
                            photo={me?.profile_photo?.small}
                            disableSavedMessages={true}/>
                    </div>
                    <div className="row-2">
                        <div className="name">
                            {me?.first_name} {me?.last_name || ''}
                        </div>
                        <div className="phone-number">
                            {me?.phone_number}
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow" onClick={onClose}></div>
        </div>
    );
}
HamburgerMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func
};