import React from 'react';
import { connect } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';
import ChatList from './chat-list';
import SearchBox from './search/search-box';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import './chat-list-bar.scss';

/**
 * Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
const ChatListBar = connect(function (state) {
    return {useFolders: (state.filters || []).length != 0};
})(function ChatListBar({useFolders}) {
    var [searchText, setSearchText] = React.useState('');
    return (
        <div id="chat-list-bar">
            <div className="chat-list-header">
                {(!useFolders) && <HamburgerMenuButton.WithoutFolders/>}
                <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
            <ChatList/>
            <ConnectionState/>
        </div>
    );
});
export default ChatListBar;
