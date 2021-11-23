import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import ScrollView from '../../../../ui/scroll/scrollbar';
import { Message } from '../../../message/ui/message';

export function ChatHistory({chat}) {
    return (
        <ScrollView className="history scrollbar" scrollBarWidth={6}>
            <div className="history-scroll-content">
                <Message chat={chat} message={chat.last_message}/>
            </div>
        </ScrollView>
    );
}
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
