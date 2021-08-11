import React from 'react';
import { connect, Provider } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';
import chatStore from '../../chat-store';
import ChatList from './chat-list';
import SearchBox from './search/search-box';

/**
 * Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
const ChatListBar = connect(function (state) {
    return {useFolders: (state||[]).length!=0};
})(function ChatListBar() {
    var [searchText, setSearchText] = React.useState('');
    return (
        <div id="chat-list-bar">
            <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
            <Provider store={chatStore}>
                <ChatList/>
            </Provider>
            <ConnectionState/>
        </div>
    );
});
export default ChatListBar;
