import React from 'react';
import { connect } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import { ServiceMessage } from '../../message/ui/message-containers';
import TitleHeader from './headers/title';
import './chat-section.scss';

export const ChatSection= 
connect(({chats, selectedChat}) => ({chats, selectedChat})) (function ChatSection({chats, selectedChat}) {
    let chat;
    for(let c of chats) {
        if(c.id === selectedChat) {
            chat = c;
            break;
        }
    }
    if(!chat) return (
        <div id="chat-section" className="no-chat">
            <ServiceMessage>
                {__('lng_willbe_history')}
            </ServiceMessage>
        </div>
    );

    return (
        <div id="chat-section">
            <div className="headers">
                <TitleHeader chat={chat} />
            </div>
        </div>
    );
});
