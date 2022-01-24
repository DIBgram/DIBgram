import React from 'react';
import __, { __fmt } from '../../../../language-pack/language-pack';
import { ServiceMessageIncludingYou } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatSetTtl({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageChatSetTtl') {
        throw new Error('Message is not messageChatSetTtl');
    }
    
    const ttlTimeUnit= {
        86400: __('lng_ttl_about_duration1'), 
        604800: __('lng_ttl_about_duration2'),
        2678400: __('lng_ttl_about_duration3'),
    }[message.content.ttl];

    if(message.is_channel_post) {
        if(message.content.ttl) { // If TTL is disabled, it will be set to 0
            return (
                <ServiceMessage>
                    {__fmt('lng_action_ttl_changed_channel', {
                        duration: ttlTimeUnit
                    })}
                </ServiceMessage>
            );
        } else {
            return (
                <ServiceMessage>
                    {__('lng_action_ttl_removed_channel')}
                </ServiceMessage>
            );
        }
    } else {
        if(message.content.ttl) { // If TTL is disabled, it will be set to 0
            return (
                <ServiceMessage>
                    <ServiceMessageIncludingYou 
                        message={message} chat={chat} users={users}
                        lpString="lng_action_ttl_changed"
                        lpString_you="lng_action_ttl_changed_you"
                        params={{duration: ttlTimeUnit}}/>
                </ServiceMessage>
            );
        } else {
            return (
                <ServiceMessage>
                    <ServiceMessageIncludingYou 
                        message={message} chat={chat} users={users}
                        lpString="lng_action_ttl_removed"
                        lpString_you="lng_action_ttl_removed_you"/>
                </ServiceMessage>
            );
        }
    }
}