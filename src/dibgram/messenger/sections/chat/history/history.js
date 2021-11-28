import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import ScrollView from '../../../../ui/scroll/scrollbar';
import { Message } from '../../../message/ui/message';
import { connect } from 'react-redux';
import { loadChatHistory } from '../../../message/chat-history';
import processMessageHistory from '../../../message/processHistory';

export const ChatHistory= connect(({messages, isLoaded}) => ({messages, isLoaded})) (function ChatHistory({chat, messages, isLoaded}) {
    let array= processMessageHistory(messages);
    if(!(array?.length)) {
        array= [chat.last_message];
    }

    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        if (!isLoaded) {
            setTimeout(() => {
                loadChatHistory(chat.id);
            }, 100);
        }
        if ((!loaded) && isLoaded && array.length < 10) {
            loadChatHistory(chat.id, array[0].id)
                .then(count => {
                    if (count == 0) {
                        setLoaded(true); // If there are no more messages, then we are done loading
                    }
                });
        }
    }, [chat.id, isLoaded]);
    React.useEffect(() => {
        return () => {
            setLoaded(false);
        };
    }, [chat.id]);
    return (
        <ScrollView className="history scrollbar" scrollBarWidth={6}>
            <div className="history-scroll-content">
                {array.map(message => <Message key={message.id} message={message} chat={chat}/>)}
            </div>
        </ScrollView>
    );
});
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
