import React from 'react';
import TdApi from '../../../../TdWeb/td_api';
import withUsers from '../../../users-wrapper';
import compileEntities from '../entities';
import { MessageProps } from '../message';
import { BubbleMessage, MessageFooter } from '../message-containers';

export default function MessageText({message, chat}: MessageProps): JSX.Element {
    const messageContent= (message.content as TdApi.td_messageText);
    
    const BubbleMsg= withUsers(BubbleMessage);
    return (
        <BubbleMsg message={message} chat={chat}>
            <div className={`content ${message.can_be_saved?'':'no-save'}`}>
                {compileEntities(messageContent.text)}
                <MessageFooter message={message} chat={chat}/>
            </div>
        </BubbleMsg>
    );
}
