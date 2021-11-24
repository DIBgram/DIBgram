import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import { timeToString } from '../../../time-tostring';
import { getChatTypeId, getIdColorCode } from '../../../ui/components/profile-photo';
import { bubble_tail, dialogs_sending, history_received, history_sent } from '../../../ui/icon/icons';
import { getChatNoCache } from '../../chat-store';
import { getMessageStatus } from '../../message-misc';
import { getUserFullName } from '../../user-misc';

import './message-containers.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div className={'history-message' + ((message.is_outgoing && !message.is_channel_post) ? ' outgoing' : '')}>
            <MessageBubble>
                {sender && <div className={`message-sender color_${senderId}`}>{sender}</div>}
                {children}
                <div className="after"/>
            </MessageBubble>
        </div>
    );
}

type MessageFooterProps= {
    message: TdApi.td_message,
    chat: TdApi.td_chat,
}
export function MessageFooter({message, chat}: MessageFooterProps): JSX.Element {
    let tick= null;
    switch(getMessageStatus(chat, message)) {
        case 'sending':
            tick= <span className="tick sending" dangerouslySetInnerHTML={{__html: dialogs_sending}}/>;
            break;
        case 'sent':
            tick= <span className="tick sent" dangerouslySetInnerHTML={{__html: history_sent}}/>;
            break;
        case 'seen':
            tick= <span className="tick seen" dangerouslySetInnerHTML={{__html: history_received}}/>;
    }
    return (
        <div className="footer">
            <div className="time">{timeToString(message.date)}</div>
            {(!message.is_channel_post) && tick}
        </div>
    );
}