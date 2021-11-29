import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';
import __, { __pl } from '../../../../language-pack/language-pack';
import ThreeDotsMenu from '../../../../ui/menu/three-dots-menu';
import Menu from '../../../../ui/menu/menu';
import options from '../../../../TdWeb/options';
import IconButton from '../../../../ui/elements/icon-button';
import { top_bar_group_call, top_bar_profile, top_bar_search } from '../../../../ui/icon/icons';
import { chatTitleOrDeletedAccount } from '../../../chat-misc';
import { lastSeenToString } from '../../../../time-tostring';

export default function TitleHeader(props) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {options['my_id'] == props.chat.id && (__('lng_saved_messages'))}
                    {options['replies_bot_chat_id'] == props.chat.id && (__('lng_replies_messages'))}
                    {options['my_id'] != props.chat.id && options['replies_bot_chat_id'] != props.chat.id && (chatTitleOrDeletedAccount(props.chat))}
                </div>
                <SubText {...props}/>
            </div>
            <div className="title-bar-right">
                {/*TODO Missing item: Call button for private chats, depends on userFullInfo */}
                {props.chat.video_chat.group_call_id != 0 && (
                    <IconButton icon={top_bar_group_call} className="icon-button voice-chat"/>
                )}
                <IconButton icon={top_bar_search}/>
                <IconButton icon={top_bar_profile}/>
                <ThreeDotsMenu>
                    <Menu.MenuContents>
                        {props.chat.can_be_reported && <Menu.MenuItem>{__('lng_report_button')}</Menu.MenuItem>}
                    </Menu.MenuContents>
                </ThreeDotsMenu>
            </div>
        </div>
    );
}
TitleHeader.propTypes = {
    chat: PropTypes.object.isRequired
};

function SubText({chat, user, basicGroup, supergroup}) {
    if(supergroup) {
        return (
            <div className="info">
                {__pl(chat.type.is_channel ? 'lng_chat_status_subscribers' : 'lng_chat_status_members', supergroup.member_count)}
            </div>
        );
    } 
    else if(basicGroup) {
        return (
            <div className="info">
                {__pl('lng_chat_status_members', basicGroup.member_count)}
            </div>
        );
    } 
    else if(user)
    {
        if (chat.id == options['my_id'] || chat.id == options['replies_bot_chat_id']) {
            return null;
        }
        if (chat.id == options['telegram_service_notifications_chat_id']) {
            // Service notifications
            return (
                <div className="info">
                    {__('lng_status_service_notifications')}
                </div>
            );
        }
        if (user.is_support) {
            return (
                <div className="info">
                    {__('lng_status_support')}
                </div>
            );
        }
        if (user.type['@type'] == 'userTypeBot') {
            return (
                <div className="info">
                    {__('lng_status_bot')}
                </div>
            );
        }

        // In this case, He is a normal user, So app should show status
        return (
            <div className={`info ${user.status['@type'] == 'userStatusOnline' ? 'active' : ''}`}>
                {lastSeenToString(user.status)}
            </div>
        );
    }

    return null;
}
SubText.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object,
    basicGroup: PropTypes.object,
    supergroup: PropTypes.object
};
