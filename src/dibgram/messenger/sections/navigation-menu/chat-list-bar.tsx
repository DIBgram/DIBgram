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
import chatStore, { ChatStoreState, ChatStoreUnreadData } from '../../chat-store';
import NavAnimation, { closeNavAnimation } from '../../../ui/elements/nav-animation';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';

type ChatListBarProps = {
    onHamburgerMenuOpened: () => void;
};

type ChatListBarStateProps = {
    useFolders: boolean;
    chats: TdApi.td_chat[];
    list: TdApi.td_ChatList;
    archiveState: 'open' | 'closing' | 'closed';
    unread: ChatStoreUnreadData,
    selectedChat: number;
}

/**
 * Renders the navigation menu, containing chat list, search field and search results [and the main menu button]
 */
const ChatListBar = (connect<ChatListBarStateProps, unknown, ChatListBarProps, ChatStoreState>(function (state) {
    return {
        useFolders: (state.filters || []).length != 0,
        chats: state.chats, 
        list: state.currentChatList,
        archiveState: state.archiveState,
        unread: state.unread,
        selectedChat: state.selectedChat,
    };
})(function ChatListBar({useFolders, chats, list, archiveState, unread, selectedChat, onHamburgerMenuOpened}) {
    const [searchText, setSearchText] = React.useState('');
    
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
        <React.Fragment>
            <NavAnimation 
                mode="slide-over" 
                id="chat-list-bar"
                state={archiveState}
                innerClass="archived-chats"
                innerScreen={<ArchiveScreen chats={chats} closeArchive={closeArchive} selectedChat={selectedChat} unread={unread}/>}>
                <div className="chat-list-header">
                    {(!useFolders) && <HamburgerMenuButton.WithoutFolders onClick={onHamburgerMenuOpened}/>}
                    <SearchBox value={searchText} onChange={e => setSearchText(e.target.value)}/>
                </div>
                <Provider store={connectionStore}>
                    <ChatList chats={chats} list={list} unread={unread} selectedChat={selectedChat}/>
                </Provider>
            </NavAnimation>
            <Provider store={connectionStore}>
                <ConnectionState/>
            </Provider>
        </React.Fragment>
    );
})) as unknown as React.ComponentType<ChatListBarProps>;
export default ChatListBar;

type ArchiveScreenProps = {
    unread: ChatStoreUnreadData,
    selectedChat: number,
    chats: TdApi.td_chat[],
    closeArchive: () => void;
}

function ArchiveScreen({unread, selectedChat, chats, closeArchive}: ArchiveScreenProps): JSX.Element {
    return (
        <Provider store={connectionStore}>
            <div className="chat-list-header">
                <IconButton icon={info_back} onClick={closeArchive}/>
                {unread.main.unread_unmuted_messages_count? (
                    <div className="unread-badge">
                        <span>{unread.main.unread_unmuted_messages_count}</span>
                    </div>
                ): null}
                <div className="title">{__('lng_archived_name')}</div>
            </div>
            <ChatList chats={chats} list={{'@type': 'chatListArchive'}} unread={unread} selectedChat={selectedChat}/>
        </Provider>
    );
}
