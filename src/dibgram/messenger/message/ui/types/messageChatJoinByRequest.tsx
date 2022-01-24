import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatJoinByRequest({message, chat, users}: MessageProps): JSX.Element {
    return (
        <ServiceMessage>
            {__fmt('lng_action_user_joined_by_request', {
                from: <SenderFullName message={message} chat={chat} users={users}/>
            })}
        </ServiceMessage>
    );
}