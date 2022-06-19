import React from 'react';
import TdApi from '../../../../TdWeb/td_api';
import Photo from '../../../../ui/components/photo';
import withUsers from '../../../users-wrapper';
import compileEntities from '../entities';
import { MessageProps } from '../message';
import { BubbleMessage, MessageFooter } from '../message-containers';
import './messageText.scss';

export default function MessageText({message, chat}: MessageProps): JSX.Element {
    const messageContent= (message.content as TdApi.td_messageText);
    
    const BubbleMsg= withUsers(BubbleMessage);
    return (
        <BubbleMsg message={message} chat={chat}>
            <div className={`content text ${message.can_be_saved?'':'no-save'}`}>
                {compileEntities(messageContent.text)}
                {messageContent.web_page && <LinkPreview preview={messageContent.web_page} />}
                <MessageFooter message={message} chat={chat}/>
            </div>
        </BubbleMsg>
    );
}

type LinkPreviewProps = {
    preview: TdApi.td_webPage;
}
function LinkPreview({preview}: LinkPreviewProps): JSX.Element {
    return (
        <div className="link-preview">
            <div className="texts">
                <div className="site-name">{preview.site_name}</div>
                <div className="title">{preview.title}</div>
                {compileEntities(preview.description)}
            </div>
            {(preview.type=='photo' && preview.photo) && <Photo photo={preview.photo} priority={1}/>}
        </div>
    );
}