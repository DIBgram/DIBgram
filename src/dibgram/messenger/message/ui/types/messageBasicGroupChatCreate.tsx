import React from 'react';
import __, { __fmt } from '../../../../language-pack/language-pack';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';
import { SenderFullName } from '../../message-summary-noicon';

export default function MessageBasicGroupChatCreate({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageBasicGroupChatCreate') {
        throw new Error('Message is not messageBasicGroupChatCreate');
    }
    if(message.is_channel_post) {
        return (
            <ServiceMessage>
                <span className="part-1">{__('lng_action_created_channel')}</span>
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                {__fmt('lng_action_created_chat', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    title: message.content.title
                })}
            </ServiceMessage>
        );
    }
}