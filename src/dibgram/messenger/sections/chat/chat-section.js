import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import { ServiceMessage } from '../../message/ui/message-containers';
import TitleHeader from './headers/title';
import './chat-section.scss';
import usersStore from '../../users-store';
import supergroupStore from '../../supergroup-store';
import basicGroupStore from '../../basic-group-store';
import { ChatFooter } from './footer/footer';
import { ChatHistory } from './history/history';
import { messageStore } from '../../message-store';
import TdLib from '../../../TdWeb/tdlib';

export const ChatSection= 
connect(({chats, selectedChat}) => ({chats, selectedChat})) (function ChatSection({chats, selectedChat, singleColumnLayout}) {
    let chat;
    for(let c of chats) {
        if(c.id === selectedChat) {
            chat = c;
            break;
        }
    }

    if(!chat) return (
        <div id="chat-section" className="no-chat">
            <ServiceMessage>
                {__('lng_willbe_history')}
            </ServiceMessage>
        </div>
    );
    switch(chat.type['@type']){
        case 'chatTypePrivate':
            return (
                <Provider store={usersStore}>
                    <ChatSectionContentWrapperPrivate 
                        chat={chat} 
                        singleColumnLayout={singleColumnLayout}/>
                </Provider>
            );
        case 'chatTypeBasicGroup': 
            return (
                <Provider store={basicGroupStore}>
                    <ChatSectionContentWrapperBasicGroup 
                        chat={chat} 
                        singleColumnLayout={singleColumnLayout}/>
                </Provider>
            );
        case 'chatTypeSupergroup':
            return (
                <Provider store={supergroupStore}>
                    <ChatSectionContentWrapperSupergroup 
                        chat={chat} 
                        singleColumnLayout={singleColumnLayout}/>
                </Provider>
            );
    }
});

const ChatSectionContentWrapperPrivate= connect(users=>({users}))(
    function ChatSectionContentWrapperPrivate({users, chat, ...rest}) {
        return <ChatSectionContentWrapper user={users[chat.type.user_id]} chat={chat} {...rest}/>;
    }
);

const ChatSectionContentWrapperBasicGroup= connect(basicGroups=>({basicGroups}))(
    function ChatSectionContentWrapperBasicGroup({basicGroups, chat, ...rest}) {
        return <ChatSectionContentWrapper basicGroup={basicGroups[chat.type.basic_group_id]} chat={chat} {...rest}/>;
    }
);

const ChatSectionContentWrapperSupergroup= connect(supergroups=>({supergroups}))(
    function ChatSectionContentWrapperSupergroup({supergroups, chat, ...rest}) {
        return <ChatSectionContentWrapper supergroup={supergroups[chat.type.supergroup_id]} chat={chat} {...rest}/>;
    }
);

function ChatSectionContentWrapper(props) {
    React.useEffect(()=>{
        TdLib.sendQuery({
            '@type': 'openChat',
            chat_id: props.chat.id
        });
        return ()=>{
            TdLib.sendQuery({
                '@type': 'closeChat',
                chat_id: props.chat.id
            });
        };
    }, [props.chat.id]);
    return (
        <div id="chat-section">
            <div className="headers">
                <TitleHeader {...props}/>
            </div>
            <Provider store={messageStore}>
                <ChatHistory {...props}/>
            </Provider>
            <ChatFooter {...props}/>
        </div>
    );
}
ChatSectionContentWrapper.propTypes = {
    chat: PropTypes.object.isRequired
};
