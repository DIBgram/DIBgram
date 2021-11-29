import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import { timeToString } from '../../../time-tostring';
import ProfilePhoto, { getIdColorCode } from '../../../ui/components/profile-photo';
import { bubble_tail, dialogs_sending, history_received, history_sent } from '../../../ui/icon/icons';
import { getChatNoCache } from '../../chat-store';
import { getMessageStatus } from '../../message-misc';
import { getUserFullName } from '../../user-misc';
import { ProcessedSingleMessage } from '../processHistory';

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
    beforeBubble?: React.ReactNode | React.ReactNode[],
}
export function MessageBubble({ children, beforeBubble=null, showTail=true, ...rest}: MessageBubbleProps): JSX.Element {
    return (
        <div className="bubble-container">
            {beforeBubble}
            <div className={`bubble ${showTail ? 'has-tail' : ''}`} {...rest}>
                {children}
                {showTail && <span className="tail" dangerouslySetInnerHTML={{__html: bubble_tail}}/>}
            </div>
        </div>
    );
}


type BubbleMessageProps= {
    message: ProcessedSingleMessage,
    chat: TdApi.td_chat,
    users: {[key: number]: TdApi.td_user},
    children: React.ReactNode | React.ReactNode[],
}
export function BubbleMessage({message, chat, users, children}: BubbleMessageProps): JSX.Element {
    let sender= null;
    let senderId= 0;
    let photo= null;
    if(chat.type['@type'] === 'chatTypeSupergroup' && chat.type.is_channel) {
        sender= chat.title;
    } 
    else if(chat.type['@type'] === 'chatTypeSupergroup' || 
            chat.type['@type'] === 'chatTypeBasicGroup') {
        switch(message.sender['@type']) {
            case 'messageSenderUser':
                if(!message.is_outgoing) {
                    const user=users[message.sender.user_id];
                    sender= getUserFullName(user);
                    senderId= getIdColorCode(message.sender.user_id);
                    photo= (
                        <div className="profile-photo-c">
                            <ProfilePhoto 
                                id={user.id} 
                                name={sender} 
                                disableSavedMessages={true} 
                                photo={user.profile_photo?.small}
                            />
                        </div>
                    );
                }
                break;
            case 'messageSenderChat': {
                const chat: TdApi.td_chat= getChatNoCache(message.sender.chat_id);
                sender= chat.title;
            }
        }
    }
    return (
        <div className={'history-message' + 
                        ((message.is_outgoing && !message.is_channel_post) ? ' outgoing' : '') +
                        (message.hide_sender_name? ' small-margin' : '')}>

            <MessageBubble 
                beforeBubble={message.hide_tail ? (photo && <div className="profile-photo-c"/>) : photo} 
                showTail={!message.hide_tail}>

                {sender && (!message.hide_sender_name) && (
                    <div className={`message-sender color_${senderId}`}>{sender}</div>
                )}
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