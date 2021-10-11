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
 * Renders the navigation menu, containing chat list, search field and search results [and the main menu button]
 */
const ChatListBar = connect(function (state) {
    return {
        useFolders: (state.filters || []).length != 0,
        chats: state.chats, 
        list: state.currentChatList,
        archiveState: state.archiveState,
        unread: state.unread
    };
})(function ChatListBar({useFolders, chats, list, archiveState, unread, onHamburgerMenuOpened}) {
    var [searchText, setSearchText] = React.useState('');
    
    function closeArchive() { //TODO: Move the slide animation to a dedicated component, because it is used in many places
        // First set state to closing, which triggers the closing animation. After that, we can delete the element.
        chatStore.dispatch({
            type: 'SET_ARCHIVE_STATE',
            archiveState: 'closing'
        });
        setTimeout(() => {
            if(chatStore.getState().archiveState == 'closing') { // This condition is to prevent glitches when archive is opened again before 2s
                chatStore.dispatch({
                    type: 'SET_ARCHIVE_STATE',
                    archiveState: 'closed'
                });
            }
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
                            {unread.main.unread_unmuted_messages_count? (
                                <div className="unread-badge">
                                    <span>{unread.main.unread_unmuted_messages_count}</span>
                                </div>
                            ): null}
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
