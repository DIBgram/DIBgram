import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';
import __, { __pl } from '../../../../language-pack/language-pack';
import ThreeDotsMenu from '../../../../ui/menu/three-dots-menu';
import Menu from '../../../../ui/menu/menu';

export default function TitleHeader({chat}) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {chat.title}
                </div>
                <div className="info">
                    {(chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) && __pl('lng_chat_status_subscribers', 5)}
                    {(chat.type['@type'] == 'chatTypeBasicGroup' || (chat.type['@type'] == 'chatTypeSupergroup' && !chat.type.is_channel)) && __pl('lng_chat_status_members', 5)}
                </div>
            </div>
            <div className="title-bar-right">
                <ThreeDotsMenu>
                    <Menu.MenuContents>
                        <Menu.MenuItem>{chat.can_be_reported && __('lng_report_button')}</Menu.MenuItem>
                    </Menu.MenuContents>
                </ThreeDotsMenu>
            </div>
        </div>
    );
}
TitleHeader.propTypes = {
    chat: PropTypes.object.isRequired
};
