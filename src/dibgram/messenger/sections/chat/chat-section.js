import React from 'react';
import { connect, Provider } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import { ServiceMessage } from '../../message/ui/message-containers';
import TitleHeader from './headers/title';
import './chat-section.scss';
import usersStore from '../../users-store';
import supergroupStore from '../../supergroup-store';
import basicGroupStore from '../../basic-group-store';

export const ChatSection= 
connect(({chats, selectedChat}) => ({chats, selectedChat})) (function ChatSection({chats, selectedChat}) {
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
                <ChatSectionContentWrapperPrivate chat={chat}/>
            </Provider>
        );
    case 'chatTypeBasicGroup': 
        return (
            <Provider store={basicGroupStore}>
                <ChatSectionContentWrapperBasicGroup chat={chat}/>
            </Provider>
        );
    case 'chatTypeSupergroup':
        return (
            <Provider store={supergroupStore}>
                <ChatSectionContentWrapperSupergroup chat={chat}/>
            </Provider>
        );
    }
});

const ChatSectionContentWrapperPrivate= connect(users=>({users}))(
    function ChatSectionContentWrapperPrivate({users, chat}) {
        return <ChatSectionContentWrapper user={users[chat.type.user_id]} chat={chat}/>;
    }
);

const ChatSectionContentWrapperBasicGroup= connect(basicGroups=>({basicGroups}))(
    function ChatSectionContentWrapperBasicGroup({basicGroups, chat}) {
        return <ChatSectionContentWrapper basicGroup={basicGroups[chat.type.basic_group_id]} chat={chat}/>;
    }
);

const ChatSectionContentWrapperSupergroup= connect(supergroups=>({supergroups}))(
    function ChatSectionContentWrapperSupergroup({supergroups, chat}) {
        return <ChatSectionContentWrapper supergroup={supergroups[chat.type.supergroup_id]} chat={chat}/>;
    }
);

function ChatSectionContentWrapper(props) {
    return (
        <div id="chat-section">
            <div className="headers">
                <TitleHeader {...props}/>
            </div>
        </div>
    );
}
