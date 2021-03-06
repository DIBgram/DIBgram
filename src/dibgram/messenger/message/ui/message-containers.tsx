import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import { timeToString } from '../../../time-tostring';
import ProfilePhoto, { getChatTypeId, getIdColorCode } from '../../../ui/components/profile-photo';
import { bubble_tail, dialogs_sending, history_received, history_sent } from '../../../ui/icon/icons';
import { getChatNoCache } from '../../chat-store';
import { getMessageStatus } from '../../message-misc';
import { getUserFullName } from '../../user-misc';
import { ProcessedSingleMessage } from '../processHistory';
import usersStore, { UsersStoreState } from '../../users-store';

import './message-containers.scss';
import __, { __fmt } from '../../../language-pack/language-pack';
import { messageStore } from '../../message-store';
import TdLib from '../../../TdWeb/tdlib';
import MessageSummaryWithIcon from '../message-summary-withicon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ServiceMessageBubble(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    return (
        <div className="history-service-message" {...props}/>
    );
}

export function ServiceMessage({children}: {children: React.ReactNode|React.ReactNode[]}): JSX.Element {
    return (
        <div className="history-message service">
            <ServiceMessageBubble>
                {children}
            </ServiceMessageBubble>
        </div>
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
    chat: TdApi.chat,
    users: {[key: number]: TdApi.user},
    children: React.ReactNode | React.ReactNode[],
}
export function BubbleMessage({message, chat, users, children}: BubbleMessageProps): JSX.Element {
    let sender= null;
    let senderId= 0;
    let photo= null;
    let usesPhoto= false;
    if(chat.type['@type'] === 'chatTypeSupergroup' && chat.type.is_channel) {
        sender= chat.title;
    } 
    else if(chat.type['@type'] === 'chatTypeSupergroup' || 
            chat.type['@type'] === 'chatTypeBasicGroup') {
        usesPhoto= !message.is_outgoing;
        switch(message.sender_id['@type']) {
            case 'messageSenderUser':
                if(!message.is_outgoing) {
                    const user=users[message.sender_id.user_id];
                    sender= getUserFullName(user);
                    senderId= getIdColorCode(message.sender_id.user_id);
                    photo= (!message.hide_tail) &&
                            <ProfilePhoto 
                                id={user.id} 
                                name={sender} 
                                disableSavedMessages={true} 
                                photo={user.profile_photo?.small}
                            />;
                }
                break;
            case 'messageSenderChat': {
                const chat: TdApi.chat= getChatNoCache(message.sender_id.chat_id) as TdApi.chat;
                sender= chat.title;
                photo= (!message.hide_tail) &&
                        <ProfilePhoto 
                            id={getChatTypeId(chat)} 
                            name={sender}
                            disableSavedMessages={true} 
                            photo={chat.photo?.small}
                        />;
            }
        }
    }
    return (
        <div className={'history-message' + 
                        ((message.is_outgoing && !message.is_channel_post) ? ' outgoing' : '') +
                        (message.hide_sender_name? ' small-margin' : '')}>

            <MessageBubble 
                beforeBubble={usesPhoto && <div className="profile-photo-c">{photo}</div>} 
                showTail={!message.hide_tail}>

                <div className="message-sender">
                    {sender && (!message.hide_sender_name) && (
                        <span className={`color_${senderId}`}>{sender}</span>
                    )}
                    {message.via_bot_user_id? (
                        <span className="color_0">
                            {__fmt('lng_inline_bot_via', {
                                inline_bot: '@'+(usersStore.getState()[message.via_bot_user_id] as TdApi.user).username
                            })}
                        </span>
                    ): null}
                </div>

                {message.reply_to_message_id ? <MessageReplyTo message={message} users={users}/>: null}
                {children}
                <div className="after"/>
            </MessageBubble>
        </div>
    );
}

type MessageFooterProps= {
    message: TdApi.message,
    chat: TdApi.chat,
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
            <div className="text">{timeToString(message.date)}</div>
            {(!message.is_channel_post) && tick}
        </div>
    );
}

type MessageReplyToProps= {
    message: TdApi.message,
    users: UsersStoreState
}

export function MessageReplyTo({message, users}: MessageReplyToProps): JSX.Element|null {
    const [replyMessage, setReplyMessage]= React.useState<TdApi.message|-1|0>(0);

    const rMessage= ((message.reply_in_chat_id == message.chat_id) && messageStore.getState().messages[message.reply_to_message_id]) || replyMessage;

    React.useEffect(() => {
        function requestHandler(result: TdApi.message|TdApi.error) {
            if(result['@type'] === 'error') {
                setReplyMessage(-1);
            } else {
                setReplyMessage(result);
            }
        }

        if((!rMessage) && replyMessage==0) {
            TdLib.sendQuery({
                '@type': 'getMessage',
                chat_id: message.reply_in_chat_id,
                message_id: message.reply_to_message_id
            }).then(requestHandler, requestHandler);
        }
    }, []);

    if( typeof rMessage != 'number') {
        const chat= getChatNoCache(message.reply_in_chat_id) as TdApi.chat;
        const sender= rMessage.sender_id['@type'] === 'messageSenderUser' ?
            getUserFullName(users[rMessage.sender_id.user_id]):
            (getChatNoCache(rMessage.sender_id.chat_id) as TdApi.chat).title;

        return (
            <div className="reply-to">
                <div className="reply-sender">{sender}</div>
                <div className="text-container">
                    <MessageSummaryWithIcon chat={chat} message={rMessage} className='text' users={users}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="reply-to">
                <div className="placeholder">
                    { rMessage==-1 ? __('lng_deleted_message') : __('lng_contacts_loading')}
                </div>
            </div>
        );
    }
}