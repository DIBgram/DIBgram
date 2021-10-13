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
import NavAnimation, { closeNavAnimation } from '../../../ui/elements/nav-animation';

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
    
    function closeArchive() {
        closeNavAnimation(() => chatStore.getState().archiveState,
            state => {
                chatStore.dispatch({
                    type: 'SET_ARCHIVE_STATE',
                    archiveState: state
                });
            }
        );
    }

    return (
        <NavAnimation 
            mode="slide-over" 
            id="chat-list-bar"
            state={archiveState}
            innerClass="archived-chats"
            innerScreen={
                <Provider store={connectionStore}>
                    <div className="chat-list-header">
                        <IconButton icon={info_back} onClick={closeArchive}/>
                        {unread.main.unread_unmuted_messages_count? (
                            <div className="unread-badge">
                                <span>{unread.main.unread_unmuted_messages_count}</span>
                            </div>
                        ): null}
                        <div className="title">Archived chats</div>
                    </div>
                    <ChatList chats={chats} list={{'@type': 'chatListArchive'}} unread={unread}/>
                </Provider>
            }>
            <div className="chat-list-header">
                {(!useFolders) && <HamburgerMenuButton.WithoutFolders onClick={onHamburgerMenuOpened}/>}
                <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
            <Provider store={connectionStore}>
                <ChatList chats={chats} list={list} unread={unread}/>
                <ConnectionState/>
            </Provider>
        </NavAnimation>
    );
});
export default ChatListBar;
