import React from 'react';
import { connect } from 'react-redux';
import __, { __pl } from '../../../language-pack/language-pack';
import IconButton from '../../../ui/elements/icon-button';
import './chat-section.scss';
import ThreeDotsMenu from '../../../ui/menu/three-dots-menu';
import Menu from '../../../ui/menu/menu';
import { settings_advenced } from '../../../ui/icon/icons';
import options from '../../../TdWeb/options';
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
        <div id="chat-container">
            {/* Needs to be in the middle vertically, I don't know how */}
            <div className="middle">
                <span className="service-message">
                    {__('lng_willbe_history')}
                </span>
            </div>
        </div>
    );

    return (
        <div id="chat-container">
            <div id="headers">
                <div id="title-bar">
                    {(chat.id === options.my_id) ? __('lng_saved_messages') : chat.title}

                    <div id="info">
                        {(chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) && (__pl('lng_chat_status_subscribers', 5))}
                        {(chat.type['@type'] == 'chatTypeSupergroup' && !chat.type.is_channel || chat.type['@type'] == 'chatTypeBasicGroup') && (__pl('lng_chat_status_members', 5))}
                    </div>
                </div>

                {/* I don't know how to place these buttons in the right place */}
                <div id="icon-buttons">
                    {/* Needed icons: voice_chat if exists, search, And third_column_view */}
                    <IconButton icon={settings_advenced} />
                    <IconButton icon={settings_advenced} />
                    <ThreeDotsMenu>
                        <Menu.MenuContents>
                            {/* Channel menu items */}
                            {(chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) && (<Menu.MenuItem>{__('lng_context_view_channel')}</Menu.MenuItem>)}
                            {(chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) && ((<Menu.MenuItem>{__('lng_profile_leave_channel')}</Menu.MenuItem>))}
                            
                            {/* Group menu items */}
                            {((chat.type['@type'] === 'chatTypeSupergroup' && !chat.type.is_channel) || chat.type['@type'] === 'chatTypeBasicGroup') &&
                                (<Menu.MenuItem>{__('lng_context_view_group')}</Menu.MenuItem>)}
                            {((chat.type['@type'] === 'chatTypeSupergroup' && !chat.type.is_channel) || chat.type['@type'] === 'chatTypeBasicGroup') &&
                                (<Menu.MenuItem>{__('lng_profile_leave_group')}</Menu.MenuItem>)}
                            {((chat.type['@type'] === 'chatTypeSupergroup' && !chat.type.is_channel) || chat.type['@type'] === 'chatTypeBasicGroup') &&
                                (<Menu.MenuItem>{__('lng_profile_clear_history')}</Menu.MenuItem>)}

                            {chat.can_be_reported && (<Menu.MenuItem>{__('lng_report_button')}</Menu.MenuItem>)}
                        </Menu.MenuContents>
                    </ThreeDotsMenu>
                </div>
            </div>
        </div>
    );
});
