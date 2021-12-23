import React from 'react';
import PropTypes from 'prop-types';
import './history.scss';
import ScrollView from '../../../../ui/scroll/scrollbar';
import { Message } from '../../../message/ui/message';
import { connect } from 'react-redux';
import { loadChatHistory } from '../../../message/chat-history';
import processMessageHistory from '../../../message/processHistory';
import TdLib from '../../../../TdWeb/tdlib';
import SponsoredMessage from '../../../message/ui/types/sponsored';

export const ChatHistory= connect(({messages, isLoaded}) => ({messages, isLoaded})) (function ChatHistory({chat, messages, isLoaded}) {
    const ref= React.useRef();
    
    let array= processMessageHistory(messages);
    if(!(array?.length)) {
        array= [chat.last_message];
    }

    const [sponsoredMessages, setSponsoredMessages]= React.useState(null);

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
        if (chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) {
            TdLib.sendQuery({
                '@type': 'getChatSponsoredMessages',
                chat_id: chat.id
            }).then(setSponsoredMessages);
        } else {
            setSponsoredMessages(null);
        }

        return () => {
            setLoaded(false);
        };
    }, [chat.id]);
    return (
        <div className="history" ref={ref}>
            <ScrollView className="scrollbar full-size" scrollBarWidth={6}>
                <div className="history-scroll-content">
                    {array.map(message => <Message key={message.id} message={message} chat={chat}/>)}
                    {sponsoredMessages?.messages.map(message => <SponsoredMessage key={message.id} message={message} chat_id={chat.id} viewport={ref}/>)}
                </div>
            </ScrollView>
        </div>
    );
});
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
