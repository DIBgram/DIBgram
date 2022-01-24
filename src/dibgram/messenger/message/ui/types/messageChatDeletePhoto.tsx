import React from 'react';
import __, { __fmt } from '../../../../language-pack/language-pack';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatDeletePhoto({message, chat, users}: MessageProps): JSX.Element {
    if(message.is_channel_post) {
        return (
            <ServiceMessage>
                <span className="part-1">{__('lng_action_removed_photo_channel')}</span>
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                {__fmt('lng_action_removed_photo', {
                    from:  <SenderFullName message={message} chat={chat} users={users}/>
                })}
            </ServiceMessage>
        );
    }
}