import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import { futureDayToString, timeToString } from '../../../../time-tostring';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';


export default function MessageVideoChatScheduled({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] !== 'messageVideoChatScheduled') {
        throw new Error('Message is not messageVideoChatScheduled');
    }

    if(message.is_channel_post) {
        return (
            <ServiceMessage>
                {__fmt('lng_action_group_call_scheduled_channel', {
                    date: __fmt('lng_mediaview_date_time', {
                        date: futureDayToString(message.content.start_date),
                        time: timeToString(message.content.start_date)
                    })
                })}
            </ServiceMessage>
        );
    } else {
        return (
            <ServiceMessage>
                {__fmt('lng_action_group_call_scheduled_group', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    date: __fmt('lng_mediaview_date_time', {
                        date: futureDayToString(message.content.start_date),
                        time: timeToString(message.content.start_date)
                    })
                })}
            </ServiceMessage>
        );
    }
}