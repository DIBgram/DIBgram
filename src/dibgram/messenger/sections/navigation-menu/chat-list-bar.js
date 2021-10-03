import React from 'react';
import { connect, Provider } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';
import ChatList from './chat-list';
import SearchBox from './search/search-box';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import connectionStore from '../../../TdWeb/connectionStore';
import IconButton from '../../../ui/elements/icon-button';
import './chat-list-bar.scss';
import { info_back } from '../../../ui/icon/icons';
import chatStore from '../../chat-store';

/**
 * Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
const ChatListBar = connect(function (state) {
    return {
        useFolders: (state.filters || []).length != 0,
        chats: state.chats, 
        list: state.currentChatList,
        archiveState: state.archiveState,
    };
})(function ChatListBar({useFolders, chats, list, archiveState, onHamburgerMenuOpened}) {
    var [searchText, setSearchText] = React.useState('');
    
    function closeArchive() {
        chatStore.dispatch({
            type: 'SET_ARCHIVE_STATE',
            archiveState: 'closing'
        });
        setTimeout(() => {
            chatStore.dispatch({
                type: 'SET_ARCHIVE_STATE',
                archiveState: 'closed'
            });
        }, 2000);
    }

    return (
        <div id="chat-list-bar" className={archiveState == 'open' ? 'archive-open' : ''}>
            <div className="chat-list-header">
                {(!useFolders) && <HamburgerMenuButton.WithoutFolders onClick={onHamburgerMenuOpened}/>}
                <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
            <Provider store={connectionStore}>
                <ChatList chats={chats} list={list}/>
                {archiveState != 'closed' && (
                    <div className="archived-chats">
                        <div className="chat-list-header">
                            <IconButton icon={info_back} onClick={closeArchive}/>
                            <div className="title">Archived chats</div>
                        </div>
                        <ChatList chats={chats} list={{'@type': 'chatListArchive'}}/>
                    </div>
                )}
                <ConnectionState/>
            </Provider>
        </div>
    );
});
export default ChatListBar;
