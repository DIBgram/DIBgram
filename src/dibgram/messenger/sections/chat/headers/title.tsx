import React from 'react';
import './title.scss';
import __, { __pl } from '../../../../language-pack/language-pack';
import ThreeDotsMenu from '../../../../ui/menu/three-dots-menu';
import Menu from '../../../../ui/menu/menu';
import options from '../../../../TdWeb/options';
import IconButton from '../../../../ui/elements/icon-button';
import { info_back, top_bar_group_call, top_bar_profile, top_bar_search } from '../../../../ui/icon/icons';
import { chatTitleOrDeletedAccount } from '../../../chat-misc';
import { lastSeenToString } from '../../../../time-tostring';
import ProfilePhoto, { getChatTypeId } from '../../../../ui/components/profile-photo';
import chatStore from '../../../chat-store';
import { ChatSectionContentProps } from '../chat-section';
import TdApi from '../../../../TdWeb/td_api';
import { menu_report } from '../../../../ui/icon/menu/menu';

export default function TitleHeader(props: ChatSectionContentProps): JSX.Element {
    return (
        <div className="title-bar">
            {props.singleColumnLayout && (
                <IconButton icon={info_back} className="icon-button back" onClick={()=>{
                    chatStore.dispatch({
                        type: 'SELECT_CHAT',
                        chat_id: -1
                    });
                }}/>
            )}
            <div className="title-bar-left">
                {props.singleColumnLayout && (
                    <ProfilePhoto 
                        id={getChatTypeId(props.chat)} 
                        name={props.chat.title} 
                        photo={props.chat.photo?.small}
                    />
                )}
                <div className="text">
                    <div className="title">
                        {options['my_id'] == props.chat.id && (__('lng_saved_messages'))}
                        {options['replies_bot_chat_id'] == props.chat.id && (__('lng_replies_messages'))}
                        {options['my_id'] != props.chat.id && options['replies_bot_chat_id'] != props.chat.id && (chatTitleOrDeletedAccount(props.chat))}
                    </div>
                    <SubText {...props}/>
                </div>
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
                        {props.chat.can_be_reported && <Menu.MenuItem icon={menu_report}>{__('lng_report_button')}</Menu.MenuItem>}
                    </Menu.MenuContents>
                </ThreeDotsMenu>
            </div>
        </div>
    );
}

function SubText({chat, user, basicGroup, supergroup}: ChatSectionContentProps): JSX.Element|null {
    if(supergroup) {
        return (
            <div className="info">
                {__pl((chat.type as TdApi.chatTypeSupergroup).is_channel ? 'lng_chat_status_subscribers' : 'lng_chat_status_members', supergroup.member_count)}
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
