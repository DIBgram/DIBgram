import React from 'react';
import { connect } from 'react-redux';
import __ from '../../../language-pack/language-pack';
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
        <div id="chat-container">
            {__('lng_willbe_history')}
        </div>
    );

    return (
        <div id="chat-container">
            {chat.title}
        </div>
    );
});
