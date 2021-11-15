import React from 'react';
import { connect } from 'react-redux';
import __ from '../../../language-pack/language-pack';
import IconButton from '../../../ui/elements/icon-button';
import './chat-section.scss';
import ThreeDotsMenu from '../../../ui/menu/three-dots-menu';
import Menu from '../../../ui/menu/menu';
import { settings_advenced } from '../../../ui/icon/icons';

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
            {/* Needs to be in the middle, I don't know how */}
            <span className="service-message">
                {__('lng_willbe_history')}
            </span>
        </div>
    );

    return (
        <div id="chat-container">
            <div id="headers">
                <div id="title-bar">
                    {/*TODO: Show 'Saved Messages' if it was self*/}
                    {chat.title}

                    {/*TODO: Use right theme color*/}
                    <div id="info">
                        {/* Needs translation & depends on chat type*/}
                        {5} members
                    </div>
                </div>

                {/*I don't know how to place these buttons in the right place*/}
                <div id="icon-buttons">
                    {/* Needs icons: voice_chat, search, And third_column_view */}
                    <IconButton icon={settings_advenced} />
                    <IconButton icon={settings_advenced} />
                    <ThreeDotsMenu>
                        <Menu.MenuContents>
                            {/* Needs to be translated & depends on chat type */}
                            <Menu.MenuItem>View chat info</Menu.MenuItem>
                            <Menu.MenuItem>Leave chat</Menu.MenuItem>
                            <Menu.MenuItem>Report</Menu.MenuItem>
                        </Menu.MenuContents>
                    </ThreeDotsMenu>
                </div>
            </div>
        </div>
    );
});
