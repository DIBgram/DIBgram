import React from 'react';
import { connect, Provider } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';
import ChatList from './chat-list';
import SearchBox from './search/search-box';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import './chat-list-bar.scss';
import connectionStore from '../../../TdWeb/connectionStore';

/**
 * Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
const ChatListBar = connect(function (state) {
    return {
        useFolders: (state.filters || []).length != 0,
        chats: state.chats, 
        list: state.currentChatList
    };
})(function ChatListBar({useFolders, chats, list}) {
    var [searchText, setSearchText] = React.useState('');
    return (
        <div id="chat-list-bar">
            <div className="chat-list-header">
                {(!useFolders) && <HamburgerMenuButton.WithoutFolders/>}
                <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
            <Provider store={connectionStore}>
                <ChatList chats={chats} list={list}/>
                <ConnectionState/>
            </Provider>
        </div>
    );
});
export default ChatListBar;
