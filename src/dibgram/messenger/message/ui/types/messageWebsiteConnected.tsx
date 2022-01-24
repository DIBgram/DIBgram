import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageWebsiteConnected({message}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageWebsiteConnected') {
        throw new Error('Message is not messageWebsiteConnected');
    }

    return (
        <ServiceMessage>
            {__fmt('lng_action_bot_allowed_from_domain', {
                domain: message.content.domain_name
            })}
        </ServiceMessage>
    )
}