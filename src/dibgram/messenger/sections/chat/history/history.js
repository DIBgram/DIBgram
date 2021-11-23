import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import { BubbleMessage, MessageFooter } from '../../../message/ui/message-containers';
import { _s__ } from '../../../../language-pack/language-pack';
import withUsers from '../../../users-wrapper';
import ScrollView from '../../../../ui/scroll/scrollbar';

export function ChatHistory({chat}) {
    const BubbleMsg= withUsers(BubbleMessage);

    const message= chat.last_message;
    return (
        <ScrollView className="history scrollbar" scrollBarWidth={6}>
            <div className="history-scroll-content">
                <div className={'history-message' + (message.is_outgoing ? ' outgoing' : '')}>
                    <BubbleMsg message={message} chat={chat}>
                        <div className="content">
                            {message.content['@type'] === 'messageText' ?
                                message.content.text.text :
                                _s__('lngd_message_unsupported')}
                            <MessageFooter message={message} chat={chat}/>
                        </div>
                    </BubbleMsg>
                </div>
            </div>
        </ScrollView>
    );
}
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
