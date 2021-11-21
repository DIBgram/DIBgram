import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import { getChatTypeId, getIdColorCode } from '../../../ui/components/profile-photo';
import { bubble_tail } from '../../../ui/icon/icons';
import { getChatNoCache } from '../../chat-store';
import { getUserFullName } from '../../user-misc';

import './message-containers.scss';

export function ServiceMessage(props: { [key: string]: any }): JSX.Element {
    return (
        <div className="history-service-message" {...props}/>
    );
}

type MessageBubbleProps= {
    children: React.ReactNode | React.ReactNode[],
    showTail?: boolean,
}
export function MessageBubble({ children, showTail=true, ...rest}: MessageBubbleProps): JSX.Element {
    return (
        <div className={`bubble ${showTail ? 'has-tail' : ''}`} {...rest}>
            {children}
            {showTail && <span className="tail" dangerouslySetInnerHTML={{__html: bubble_tail}}/>}
        </div>
    );
}


type BubbleMessageProps= {
    message: TdApi.td_message,
    chat: TdApi.td_chat,
    users: {[key: number]: TdApi.td_user},
    children: React.ReactNode | React.ReactNode[],
}
export function BubbleMessage({message, chat, users, children}: BubbleMessageProps): JSX.Element {
    let sender= null;
    let senderId= 0;
    if(chat.type['@type'] === 'chatTypeSupergroup' && chat.type.is_channel) {
        sender= chat.title;
    } 
    else if(chat.type['@type'] === 'chatTypeSupergroup' || chat.type['@type'] === 'chatTypeBasicGroup') {
        switch(message.sender['@type']) {
        case 'messageSenderUser':
            if(!message.is_outgoing) {
                sender= getUserFullName(users[message.sender.user_id]);
                senderId= getIdColorCode(message.sender.user_id);
            }
            break;
        case 'messageSenderChat': {
            const chat: TdApi.td_chat= getChatNoCache(message.sender.chat_id).title;
            sender= chat.title;
            senderId= getIdColorCode(getChatTypeId(chat));
        }
        }
    }
    return (
        <MessageBubble>
            <div className={`message-sender color_${senderId}`}>{sender}</div>
            {children}
        </MessageBubble>
    );
}