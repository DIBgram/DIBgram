import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import { BubbleMessage } from '../../../message/ui/message-containers';
import { _s__ } from '../../../../language-pack/language-pack';
import withUsers from '../../../users-wrapper';

export function ChatHistory({chat}) {
    const BubbleMsg= withUsers(BubbleMessage);

    const message= chat.last_message;
    return (
        <div className="history">
            <div className={'history-message' + (message.is_outgoing ? ' outgoing' : '')}>
                <BubbleMsg message={message} chat={chat}>
                    <div className="content">
                        {message.content['@type'] === 'messageText' ?
                            message.content.text.text :
                            _s__('lngd_message_unsupported')}
                    </div>
                </BubbleMsg>
            </div>
        </div>
    );
}
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
