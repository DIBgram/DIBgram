import React from 'react';
import { ServiceMessageIncludingYou } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageChatSetTheme({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageChatSetTheme') {
        throw new Error('Message is not messageChatSetTheme');
    }
    
    if(message.content.theme_name){
        return (
            <ServiceMessage>
                <ServiceMessageIncludingYou 
                    message={message} chat={chat} users={users}
                    lpString="lng_action_theme_changed"
                    lpString_you="lng_action_you_theme_changed"
                    params={{emoji: message.content.theme_name}}/>
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                <ServiceMessageIncludingYou 
                    message={message} chat={chat} users={users}
                    lpString="lng_action_theme_disabled"
                    lpString_you="lng_action_you_theme_disabled"/>
            </ServiceMessage>
        );
    }
}