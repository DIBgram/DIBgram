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
import './history-to-down.scss';
import IconButton from '../../../../ui/elements/icon-button';
import { history_to_down } from '../../../../ui/icon/icons';

export const ChatHistory= connect(({messages, isLoaded}) => ({messages, isLoaded})) (function ChatHistory({chat, messages, isLoaded}) {
    const ref= React.useRef();
    
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
    
    const [sponsoredMessages, setSponsoredMessages]= React.useState(null);
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

    const scrollRef= React.useRef();
    function jumpToDown() {
        scrollRef.current?.view.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }
    const [jumpToDownVisible, setJumpToDownVisible]= React.useState(false);
    /** @param {React.SyntheticEvent<HTMLDivElement>} e */
    function onScroll(e) {
        const visible= (-e.target.scrollTop) > 480;
        if (visible != jumpToDownVisible) {
            setJumpToDownVisible(visible);
        }
    }

    return (
        <div className="history" ref={ref}>
            <ScrollView scrollRef={scrollRef} className="scrollbar full-size" scrollBarWidth={6} onScroll={onScroll}>
                <div className="history-scroll-content">
                    {array.map(message => <Message key={message.id} message={message} chat={chat}/>)}
                    {sponsoredMessages?.messages.map(message => <SponsoredMessage key={message.id} message={message} chat_id={chat.id} viewport={ref}/>)}
                </div>
            </ScrollView>
            <IconButton icon={history_to_down} onClick={jumpToDown}
                className={'history-to-down '+(jumpToDownVisible ? 'visible' : '')}/>
        </div>
    );
});
ChatHistory.propTypes = {
    chat: PropTypes.object.isRequired
};
