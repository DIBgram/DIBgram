import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatChangeTitle({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageChatChangeTitle') {
        throw new Error('Message is not messageChatChangeTitle');
    }
    if(message.is_channel_post) {
        return (
            <ServiceMessage>
                <span className="part-1">{__fmt('lng_action_changed_title_channel', {title: message.content.title})}</span>
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                <span className="part-1">{__fmt('lng_action_changed_title', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    title: message.content.title
                })}</span>
            </ServiceMessage>
        );
    }
}