import React from 'react';
import { connect } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import { ServiceMessage } from '../../message/ui/message-containers';
import TitleHeader from './headers/title';
import './chat-section.scss';
import TdLib from '../../../TdWeb/tdlib';

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

    let chatFull;
    React.use
    if (chat.type['@type'] == 'chatTypeSupergroup') {
        TdLib.sendQuery({'@type': 'getSupergroupFullInfo', 'supergroup_id': chat.type.supergroup_id}).then((supergroupFull) => {
            chatFull = supergroupFull;
        });
    }
    if (chat.type['@type'] == 'chatTypeBasicGroup') {
        TdLib.sendQuery({'@type': 'getBasicGroupFullInfo', 'basic_group_id': chat.type.basic_group_id}).then((basicGroupFull) => {
            chatFull = basicGroupFull;
        });
    }
    
    return (
        <div id="chat-section">
            <div className="headers">
                <TitleHeader chat={chat} chatFull={chatFull} />
            </div>
        </div>
    );
});
