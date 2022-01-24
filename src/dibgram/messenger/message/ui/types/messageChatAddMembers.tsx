import React from 'react';
import { __collection, __fmt } from '../../../../language-pack/language-pack';
import { getUserFullName } from '../../../user-misc';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatAddMembers({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageChatAddMembers') {
        throw new Error('Message is not messageChatAddMembers');
    }

    // If the user joined the group by themselves, it appears as 'X added X' and that is not accurate.
    if(message.sender_id['@type']=='messageSenderUser' && message.content.member_user_ids[0] == message.sender_id?.user_id) {
        return (
            <ServiceMessage>
                <span className="part-1">{__fmt('lng_action_user_joined', {from: <SenderFullName message={message} chat={chat} users={users}/>})}</span>
            </ServiceMessage>
        );
    }

    const newMembers= __collection(false, message.content.member_user_ids.map(id=> getUserFullName(users[id])), false);
    
    return (
        <ServiceMessage>
            {__fmt(newMembers.length> 1 ? 'lng_action_add_users_many' : 'lng_action_add_user', {
                from: <SenderFullName message={message} chat={chat} users={users}/>,
                users: newMembers,
                user: newMembers
            })}
        </ServiceMessage>
    );
}