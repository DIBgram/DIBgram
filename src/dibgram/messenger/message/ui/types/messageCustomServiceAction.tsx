import React from 'react';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageCustomServiceAction({message}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageCustomServiceAction') {
        throw new Error('Message is not messageCustomServiceAction');
    }

    return (
        <ServiceMessage>
            {message.content.text}
        </ServiceMessage>
    );
}