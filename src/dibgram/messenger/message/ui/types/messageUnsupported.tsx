import React from 'react';
import { _s__ } from '../../../../language-pack/language-pack';
import { MessageProps } from '../message';
import MessageText from './messageText';

export function MessageUnsupported({message, chat, users}: MessageProps): JSX.Element {
    return (
        <MessageText chat={chat} users={users} message={{
            ...message,
            content: {
                '@type': 'messageText',
                text: {
                    '@type': 'formattedText',
                    text: _s__('lngd_message_unsupported'),
                    entities: [],
                },
            }
        }}/>
    );
}