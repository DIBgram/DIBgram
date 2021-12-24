import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
import ComposeButton from './compose-button';
import __ from '../../../../language-pack/language-pack';
import options from '../../../../TdWeb/options';

export function ChatFooter({user, supergroup}) {

    return (
        <div className="footer">
            {(user?.username || supergroup?.username) && ( // As DIBgram has many missing features, we can show an 'OPEN WITH' button so the user can open the chat with another client
                <ComposeButton onClick={()=> {
                    window.open(options['t_me_url'] + (user?.username || supergroup?.username), '_blank');
                }}>
                    {__('lng_media_open_with')}
                </ComposeButton>
            )}
            {/* TODO: Render different footers based on chat. (e.g. compose area, 'mute', 'unmute', 'unblock', etc.) Compose footer must be on a separate file. */}
        </div>
    );
}
ChatFooter.propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object,
    basicGroup: PropTypes.object,
    supergroup: PropTypes.object
};