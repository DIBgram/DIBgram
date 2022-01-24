import React from 'react';
import __, { __collection, __fmt } from '../../../../language-pack/language-pack';
import { getUserFullName } from '../../../user-misc';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageInviteVideoChatParticipants({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageInviteVideoChatParticipants') {
        throw new Error('Message is not messageInviteVideoChatParticipants');
    }
    const invitedMembers= __collection(true, message.content.user_ids.map(id=> // convert user IDs to names
        getUserFullName(users[id])), false); // A, B, and C
    return (
        <ServiceMessage>
            {__fmt((invitedMembers.length==1 ? 'lng_action_invite_user' : 'lng_action_invite_users_many'), {
                from: <SenderFullName message={message} chat={chat} users={users}/>,
                user: invitedMembers,
                users: invitedMembers,
                chat: __('lng_action_invite_user_chat')
            })}
        </ServiceMessage>
    );
}