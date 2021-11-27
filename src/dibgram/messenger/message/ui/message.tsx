import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import MessageText from './types/messageText';
import { MessageUnsupported } from './types/messageUnsupported';

export type MessageProps = {
    message: TdApi.td_message;
    chat: TdApi.td_chat;
};
export const Message= React.memo(function Message({message, chat}: MessageProps): JSX.Element {
    switch(message.content['@type']) {
        case 'messageText':
            return <MessageText chat={chat} message={message} />;
        case 'messageUnsupported':
        default:
            return <MessageUnsupported chat={chat} message={message} />;
    }
});