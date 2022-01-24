import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { durationToString } from '../../../../time-tostring';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';
import { SenderFullName } from '../../message-summary-noicon';

export default function MessageVideoChatEnded({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] !== 'messageVideoChatEnded') {
        throw new Error('Message is not messageVideoChatEnded');
    }
    if(message.is_channel_post) {
        return (
            <ServiceMessage>
                {__fmt('lng_action_group_call_finished', {
                    duration: durationToString(message.content.duration)
                })}
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                {__fmt('lng_action_group_call_finished_group', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    duration: durationToString(message.content.duration)
                })}
            </ServiceMessage>
        );
    }
}