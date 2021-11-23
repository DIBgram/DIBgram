import React from 'react';
import TdApi from '../../../../TdWeb/td_api';
import withUsers from '../../../users-wrapper';
import { MessageProps } from '../message';
import { BubbleMessage, MessageFooter } from '../message-containers';

export default function MessageText({message, chat}: MessageProps): JSX.Element {
    const messageContent= (message.content as TdApi.td_messageText);
    
    const BubbleMsg= withUsers(BubbleMessage);
    return (
        <div className={'history-message' + (message.is_outgoing ? ' outgoing' : '')}>
            <BubbleMsg message={message} chat={chat}>
                <div className="content">
                    {messageContent.text.text}
                    <MessageFooter message={message} chat={chat}/>
                </div>
            </BubbleMsg>
        </div>
    );
}