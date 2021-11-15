import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import chatStore, { compareChatList } from '../../chat-store';
import './chat-list.scss';
import { archive_userpic, history_to_down } from '../../../ui/icon/icons';
import usersStore from '../../users-store';
import ScrollView from '../../../ui/scroll/scrollbar';
import LinkButton from '../../../ui/elements/link-button';
import { chatTitleOrDeletedAccount } from '../../chat-misc';
import RippleEffect, { handleMyMouseEventsFunction } from '../../../ui/elements/ripple-effect';
import { createContextMenu } from '../../../ui/menu/context-menu';
import Menu from '../../../ui/menu/menu';
import Toast, { addToast } from '../../../ui/dialog/toast';
import './history-to-down.scss';
import IconButton from '../../../ui/elements/icon-button';
import { chatListScrollToTopEvent } from './chat-folders';
import __ from '../../../language-pack/language-pack';
import { Chat } from './chat-list-item';

/**
 * Returns a sorted list of all chats in the given chat list
 * 
 * Also for every chat, sets `chat.position` to the matching position (creates copy instead of modifying original object)
 * @param {import('tdweb').TdObject[]} chats
 * @param {import('tdweb').TdObject} list
 */
export function getChatsFromList(chats, list) {
    return chats.map(chat => { // Step 1 - get the chat positions which refer to the current list
        for( const position of chat.positions ) {
            if (compareChatList(list, position.list)) {
                if( position.order=='0' ) return false; // Replace a chat without a suitable position with `false`
                return {
                    ...chat,
                    position: position // Store the position in chat object
                };
            }
        }
        return chat;
    })
        .filter(chat => !!chat.position) // Step 2 - Remove `false` values (chats outside the list)
        .sort((a, b) => { // Step 3 - Sort it by position.order
            let order1= a.position.order, order2= b.position.order;

            if (order1 == order2) {
                return 0;
            }
            if (order1 < order2) {
                return 1;
            }
            return -1;
        });
}

/**
 * Renders the chats within a chat list
 */
const ChatList= connect(state=> ({connectionState: state}))(
    class ChatList extends React.Component { 
        static propTypes = {
            chats: PropTypes.array.isRequired,
            list: PropTypes.object.isRequired,
            connectionState: PropTypes.string.isRequired,
            unread: PropTypes.object.isRequired,
            selectedChat: PropTypes.number
        }
        state= {
            scrollToTopVisible: false,
            chatListFinished: false
        }
        scrollRef= React.createRef();

        onScroll= (e) => {
            const visible= e.target.scrollTop > 480;
            if (visible != this.state.scrollToTopVisible) {
                this.setState({scrollToTopVisible: visible});
            }
        }

        // When updating, TDLib sends updates of type updateChatLastMessage, where only the last one is needed.
        // This greatly hurts performance.
        // However, we can workaround it by not re-rendering until all updates have arrived.
        shouldComponentUpdate(nextProps, nextState) {
            return (nextProps.chats !== this.props.chats 
                || nextProps.list !== this.props.list 
                || nextProps.unread !== this.props.unread
                || nextProps.connectionState !== this.props.connectionState
                || nextProps.selectedChat !== this.props.selectedChat
                || nextState.scrollToTopVisible !== this.state.scrollToTopVisible
                || nextState.chatListFinished !== this.state.chatListFinished)
                && nextProps.connectionState != 'connectionStateUpdating'
                && nextState.chatListFinished; // Do not re-render if updating
        }

        render() {
            // Get chats from the list (this needs to be repeated on every modification)
            const array= 
                getChatsFromList(this.props.chats, this.props.list)
                    .map(chat=>
                        <Chat key={chat.id} chat={chat} selected={this.props.selectedChat == chat.id}/>
                    );
            
            return (
                <React.Fragment>
                    <ScrollView scrollRef={this.scrollRef} id="chat-list" scrollBarWidth="4" onScroll={this.onScroll}>
                        {this.props.list['@type']=='chatListMain' && (
                            <Provider store={chatStore}>
                                <ArchivedChatsItem chats={this.props.chats}/>
                            </Provider>
                        )}
                        <Provider store={usersStore}>
                            {array.length ? array :  <EmptyChatList list={this.props.list} unread={this.props.unread}/>}
                        </Provider>
                    </ScrollView>
                    <IconButton icon={history_to_down} onClick={this.scrollToTop}
                        className={'history-to-down '+(this.state.scrollToTopVisible ? 'visible' : '')}/>
                </React.Fragment>
            );
        }

        scrollToTop= () => {
            this.scrollRef.current?.view.scroll({
                top: 0,
                behavior: 'smooth',
            });
        }

        componentDidMount() {
            chatListScrollToTopEvent[0]= this.scrollToTop;
            // Request TDLib to return chats in main list and archive list
            TdLib.sendQuery({
                '@type': 'loadChats',
                'chat_list': {
                    '@type': 'chatListMain'
                },
                'limit': 50
            }).then(()=> {
                this.setState({
                    chatListFinished: true
                });
            });
            TdLib.sendQuery({
                '@type': 'loadChats',
                'chat_list': {
                    '@type': 'chatListArchive'
                },
                'limit': 50
            });
        }
    }
);
export default ChatList;

const ArchivedChatsItem= connect(state=> ({
    archiveButtonState: state.archiveButtonState,
    unread: state.unread.archive
})) (function ArchivedChatsItem({chats, unread, archiveButtonState}) {
    const chatsInList = getChatsFromList(chats, {'@type': 'chatListArchive'}); // Check if there are any archved chats
    if(!chatsInList.length) return null; // If there are no archived chats, render nothing

    // Ripple
    const ripple= React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);

    function onArchiveOpen() {
        chatStore.dispatch({
            type: 'SET_ARCHIVE_STATE',
            archiveState: 'open'
        });
    }

    // Change button type to collapsed/expanded/moved to main menu
    function setButtonState(state) {
        chatStore.dispatch({
            type: 'SET_ARCHIVE_BUTTON_STATE',
            archiveButtonState: state
        });
    }

    const moveToMainMenuToast= <Toast>{__('lng_context_archive_to_menu_info')}</Toast>;

    switch(archiveButtonState) {
    case 'expanded': // Looks like a regular chat
    default:
        return (
            <div 
                className="chat archived" onClick={onArchiveOpen}
                onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}
                onContextMenu={e=> createContextMenu(e, (
                    <Menu.MenuContents>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('collapsed');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'collapsed');
                        }}>
                            {__('lng_context_archive_collapse')}
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('hidden-expanded');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-expanded');
                            addToast(moveToMainMenuToast);
                        }}>
                            {__('lng_context_archive_to_menu')}
                        </Menu.MenuItem>
                    </Menu.MenuContents>
                ))}>
                <RippleEffect {...ripple[0]} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content">
                    <div className="profile-photo">
                        <div className="svg" dangerouslySetInnerHTML={{__html: archive_userpic}}/>
                    </div>
                    <div className="details">
                        <div className="top">
                            <div className="left">
                                <div className="title">{__('lng_archived_name')}</div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <div className="last-message">
                                    <span className="part-1">
                                        {chatsInList
                                            .filter(chat=> chat.unread_count > 0)
                                            .map(chat => chatTitleOrDeletedAccount(chat) + ', ')
                                            .join('')}
                                    </span>
                                    <span className="part-2">
                                        {chatsInList
                                            .filter(chat=> chat.unread_count == 0)
                                            .map(chatTitleOrDeletedAccount)
                                            .join(', ')}
                                    </span>
                                </div>
                            </div>
                            {unread.unread_messages_count? (
                                <div className="right">
                                    <span className="unread-badge muted">{unread.unread_messages_count}</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );

    case 'collapsed': // Only title / tiny icon
        return (
            <div
                className="chat archived collapsed" onClick={onArchiveOpen}
                onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}
                onContextMenu={e=> createContextMenu(e, (
                    <Menu.MenuContents>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('expanded');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'expanded');
                        }}>
                            {__('lng_context_archive_expand')}
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('hidden-collapsed');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-collapsed');
                            addToast(moveToMainMenuToast);
                        }}>
                            {__('lng_context_archive_to_menu')}
                        </Menu.MenuItem>
                    </Menu.MenuContents>
                ))}>
                <RippleEffect {...ripple[0]} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content">
                    {__('lng_archived_name')}
                    {unread.unread_messages_count? (
                        <div className="details">
                            <span className="unread-badge muted">{unread.unread_messages_count}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    case 'hidden-expanded': // Not here, it's in main menu
    case 'hidden-collapsed':
        return null;
    }
});
ArchivedChatsItem.propTypes = {
    /** A list of all chats (not just current list) */
    chats: PropTypes.array.isRequired
};

/** Renders the empty chat list fallback */
function EmptyChatList({list, unread}) {
    const loadingFallBack= (
        <div className="empty">
            <div>{__('lng_profile_loading')}</div>
        </div>
    );
    if(list['@type']=='chatListFilter'){ // Empty filter / Filter not loaded
        if(unread.filters?.[list.chat_filter_id]?.total_chats_count !== 0) return loadingFallBack;
        return (
            <div className="empty">
                <div>{__('lng_no_chats_filter')}</div>
                <LinkButton>{__('lng_filters_edit')}</LinkButton>
            </div>
        );
    } else { // There are no chats at all / Chats not loaded
        if(unread.main?.total_chats_count !== 0) return loadingFallBack;
        return (
            <div className="empty">
                <div>{__('lng_no_chats')}</div>
                <LinkButton>{__('lng_add_contact_button')}</LinkButton>
            </div>
        );
    }
}
