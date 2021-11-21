import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import { MessageBubble } from '../../../message/ui/message-containers';
import { _s__ } from '../../../../language-pack/language-pack';

export function ChatHistory({chat}) {
    const message= chat.last_message;
    return (
        <div className="history">
            <div className={'history-message' + (message.is_outgoing ? ' outgoing' : '')}>
                <MessageBubble>
                    {message.content['@type'] === 'messageText' ?
                        message.content.text.text :
                        _s__('lngd_message_unsupported')}
                </MessageBubble>
            </div>
        </div>
    );
}
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
