import React from 'react';
import { connect } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';

/**
 * Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
const ChatListBar = connect(function (state) {
    return {useFolders: (state||[]).length!=0};
})(function ChatListBar() {
    return (
        <div id="chat-list-bar">
            <ConnectionState/>
        </div>
    );
});
export default ChatListBar;
