import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';
import __, { __pl } from '../../../../language-pack/language-pack';
import ThreeDotsMenu from '../../../../ui/menu/three-dots-menu';
import Menu from '../../../../ui/menu/menu';
import options from '../../../../TdWeb/options';
import IconButton from '../../../../ui/elements/icon-button';
import { top_bar_profile, top_bar_search } from '../../../../ui/icon/icons';

export default function TitleHeader({chat}, chatFull) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {options['my_id'] == chat.id && (__('lng_saved_messages'))}
                    {options['replies_bot_chat_id'] == chat.id && (__('lng_replies_messages'))}
                    {options['telegram_service_notifications_chat_id'] == chat.id && (__('lng_replies_messages'))}
                    {options['my_id'] != chat.id && options['replies_bot_chat_id'] != chat.id && options['telegram_service_notifications_chat_id'] != chat.id && (chat.title)}
                </div>
                <div className="info">
                    {getSubText(chat, chatFull)}
                </div>
            </div>
            <div className="title-bar-right">
                <IconButton icon={top_bar_search}/>
                <IconButton icon={top_bar_profile}/>
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
    else if (chat.id == options['my_id'] || chat.id == options['replies_bot_chat_id'])
    {
        return '';
    }
    else if (chat.id == options['telegram_service_notifications_chat_id'])
    {
        // Service notifications
        return __('lng_status_service_notifications');
    }
    else if (chat.type['@type'] == 'chatTypePrivate')
    {
        // TODO: Implement user status: online, last seen within week, etc.

        // if (chat.type.is_bot)
        //     return __('lng_status_bot');
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
