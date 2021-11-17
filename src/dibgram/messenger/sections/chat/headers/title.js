import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';
import __, { __pl } from '../../../../language-pack/language-pack';
import ThreeDotsMenu from '../../../../ui/menu/three-dots-menu';
import Menu from '../../../../ui/menu/menu';
import options from '../../../../TdWeb/options';

export default function TitleHeader({chat}, chatFull) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {options['my_id'] == chat.id && (__('lng_saved_messages'))}
                    {options['my_id'] != chat.id && (chat.title)}
                </div>
                <div className="info">
                    {getSubText(chat, chatFull)}
                </div>
            </div>
            <div className="title-bar-right">
                <ThreeDotsMenu>
                    <Menu.MenuContents>
                        {chat.can_be_reported && (<Menu.MenuItem>{__('lng_report_button')}</Menu.MenuItem>)}
                    </Menu.MenuContents>
                </ThreeDotsMenu>
            </div>
        </div>
    );
}

function getSubText(chat, chatFull) {
    if (chat.type['@type'] == 'chatTypeSupergroup')
    {
        if (chat.type.is_channel)
            return (__pl('lng_chat_status_subscribers', chatFull.member_count));
        else
            return __pl('lng_chat_status_members', chatFull.member_count);
    }
    else if (chat.type['@type'] == 'chatTypeBasicGroup')
    {
        return __pl('lng_chat_status_members', chatFull.members.length);
    }
    else if (chat.id == options['my_id'])
    {
        return '';
    }
    else if (chat.type['@type'] == 'chatTypePrivate')
    {
        // TODO: Implement user status: online, last seen within week, etc.
        return 'User';
    }
    else
    {
        // Secret chat, This shouldn't unless use_secret_chats=true in TdlibParameters.
        // This doesn't has translation in Telegram, Because TDesktop doesn't has secret chats
        return ('Secret chat!');
    }
}

TitleHeader.propTypes = {
    chat: PropTypes.object.isRequired,
    chatFull: PropTypes.object.isRequired
};
