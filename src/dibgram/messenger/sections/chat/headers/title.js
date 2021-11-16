import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';
import { __pl } from '../../../../language-pack/language-pack';
export default function TitleHeader({chat}) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {chat.title}
                </div>
                <div className="info">
                    {/* TODO: Add real subscribers/members count, Not 5 all the time */}
                    {(chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) && (__pl('lng_chat_status_subscribers', 5))}
                    {(chat.type['@type'] == 'chatTypeSupergroup' && !chat.type.is_channel || chat.type['@type'] == 'chatTypeBasicGroup') && (__pl('lng_chat_status_members', 5))}
                </div>
            </div>
        </div>
    );
}
TitleHeader.propTypes = {
    chat: PropTypes.object.isRequired
};
