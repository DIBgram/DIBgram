import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { ServiceMessage } from '../message-containers';
import { MessageProps } from '../message';
import { SenderFullName } from '../../message-summary-noicon';

export default function MessageChatJoinByLink({message, chat, users}: MessageProps): JSX.Element {
    return (
        <ServiceMessage>
            {__fmt('lng_action_user_joined_by_link', {
                from: <SenderFullName message={message} chat={chat} users={users}/>
            })}
        </ServiceMessage>
    );
}