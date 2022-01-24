import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { getUserFullName } from '../../../user-misc';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';
import { SenderFullName } from '../../message-summary-noicon';

export default function MessageChatDeleteMember({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageChatDeleteMember') {
        throw new Error('Message is not messageChatDeleteMember');
    }
    const deletedMember= users[message.content.user_id];
    if( message.sender_id['@type']=='messageSenderUser' && deletedMember.id == message.sender_id.user_id ) { // Left the group
        return (
            <ServiceMessage>
                {__fmt('lng_action_user_left', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>
                })}
            </ServiceMessage>
        );
    }
    return (
        <ServiceMessage>
            {__fmt('lng_action_kick_user', {
                from: <SenderFullName message={message} chat={chat} users={users}/>,
                user: getUserFullName(deletedMember)
            })}
        </ServiceMessage>
    );
}