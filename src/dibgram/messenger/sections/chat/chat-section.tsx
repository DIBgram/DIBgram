import React from 'react';
import { connect, Provider } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import { ServiceMessageBubble } from '../../message/ui/message-containers';
import TitleHeader from './headers/title';
import './chat-section.scss';
import usersStore, { UsersStoreState } from '../../users-store';
import supergroupStore, { SupergroupStoreState } from '../../supergroup-store';
import basicGroupStore, { BasicGroupStoreState } from '../../basic-group-store';
import { ChatFooter } from './footer/footer';
import { ChatHistory } from './history/history';
import { messageStore } from '../../message-store';
import TdLib from '../../../TdWeb/tdlib';
import { ChatStoreState } from '../../chat-store';
import TdApi from '../../../TdWeb/td_api';

type ChatSectionSelfProps= {
    singleColumnLayout?: boolean
}

type ChatSectionStoreProps= {
    chats: TdApi.chat[],
    selectedChat: number
}

export const ChatSection= (connect<ChatSectionStoreProps, unknown, ChatSectionSelfProps, ChatStoreState>(({chats, selectedChat}) => ({chats, selectedChat})) (
    function ChatSection({chats, selectedChat, singleColumnLayout}: ChatSectionStoreProps & ChatSectionSelfProps) {
        let chat;
        for(const c of chats) {
            if(c.id === selectedChat) {
                chat = c;
                break;
            }
        }

        if(!chat) return (
            <div id="chat-section" className="no-chat">
                <ServiceMessageBubble>
                    {__('lng_willbe_history')}
                </ServiceMessageBubble>
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
        return null;
    }
)) as unknown as React.FunctionComponent<ChatSectionSelfProps>;

type ChatSectionContentWrapperSelfProps= {chat: TdApi.chat} & ChatSectionSelfProps;

const ChatSectionContentWrapperPrivate= connect<{users: UsersStoreState}, unknown, ChatSectionContentWrapperSelfProps, UsersStoreState>(users=>({users}))(
    function ChatSectionContentWrapperPrivate({users, chat, ...rest}: {users: UsersStoreState} & ChatSectionContentWrapperSelfProps) {
        return <ChatSectionContentWrapper user={users[(chat.type as TdApi.chatTypePrivate).user_id]} chat={chat} {...rest}/>;
    }
);

const ChatSectionContentWrapperBasicGroup= connect<{basicGroups: BasicGroupStoreState}, unknown, ChatSectionContentWrapperSelfProps, BasicGroupStoreState>(basicGroups=>({basicGroups}))(
    function ChatSectionContentWrapperBasicGroup({basicGroups, chat, ...rest}: {basicGroups: BasicGroupStoreState} & ChatSectionContentWrapperSelfProps) {
        return <ChatSectionContentWrapper basicGroup={basicGroups[(chat.type as TdApi.chatTypeBasicGroup).basic_group_id]} chat={chat} {...rest}/>;
    }
);

const ChatSectionContentWrapperSupergroup= connect<{supergroups: SupergroupStoreState}, unknown, ChatSectionContentWrapperSelfProps, SupergroupStoreState>(supergroups=>({supergroups}))(
    function ChatSectionContentWrapperSupergroup({supergroups, chat, ...rest}: {supergroups: SupergroupStoreState} & ChatSectionContentWrapperSelfProps) {
        return <ChatSectionContentWrapper supergroup={supergroups[(chat.type as TdApi.chatTypeSupergroup).supergroup_id]} chat={chat} {...rest}/>;
    }
);

export type ChatSectionContentProps= ChatSectionContentWrapperSelfProps & {
    user?: TdApi.user,
    basicGroup?: TdApi.basicGroup,
    supergroup?: TdApi.supergroup
}

function ChatSectionContentWrapper(props: ChatSectionContentProps) {
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
