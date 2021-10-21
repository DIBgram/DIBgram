import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import chatStore, { compareChatList } from '../../chat-store';
import './chat-list.scss';
import ProfilePhoto, { getChatTypeId } from '../../../ui/components/profile-photo';
import { dialogs_chat, dialogs_channel, dialogs_bot, dialogs_pinned, dialogs_verified_star, dialogs_verified_check, dialogs_sending, dialogs_sent, dialogs_received, archive_userpic, history_to_down } from '../../../ui/icon/icons';
import usersStore from '../../users-store';
import ScrollView from '../../../ui/scroll/scrollbar';
import MessageSummaryWithoutIcon from '../../message/message-summary-noicon';
import LinkButton from '../../../ui/elements/link-button';
import { isChatWithDeletedAccount, isChatVerified, chatTitleOrDeletedAccount } from '../../chat-misc';
import { smallDateTimeToString } from '../../../time-tostring';
import { getMessageStatus } from '../../message-misc';
import options from '../../../TdWeb/options';
import RippleEffect, { handleMyMouseEvents, handleMyMouseEventsFunction } from '../../../ui/elements/ripple-effect';
import { createContextMenu } from '../../../ui/menu/context-menu';
import Menu from '../../../ui/menu/menu';
import Toast, { addToast } from '../../../ui/dialog/toast';
import { addDialog } from '../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import './history-to-down.scss';
import IconButton from '../../../ui/elements/icon-button';
import { chatListScrollToTopEvent } from './chat-folders';

/**********************************************************************************************
 * Because of the length of this file, it is recommended to use a tool to view document outline
 **********************************************************************************************/

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
                || nextState.scrollToTopVisible !== this.state.scrollToTopVisible
                || nextState.chatListFinished !== this.state.chatListFinished)
                && nextProps.connectionState != 'connectionStateUpdating'
                && nextState.chatListFinished; // Do not re-render if updating
        }

        render() {
            // Get chats from the list (this needs to be repeated on every modification)
            const array= getChatsFromList(this.props.chats, this.props.list).map(chat=><Chat key={chat.id} chat={chat} />).slice(0, 10);
            
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

/**
 * Renders a single chat
 */
class ChatListItem extends React.Component {
    constructor(props) {
        super(props);
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }
    state= {
        ripple: {
            state: 'off'
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        function getUser(props){ // Gets the user which is the other party of the chat. Used to see if the needed user has changed
            if(props.chat.type['@type']=='chatTypePrivate') {
                return props.users[props.chat.type.user_id];
            }
            return null;
        }
        return nextProps.chat.id !== this.props.chat.id
            || nextProps.chat.last_message !== this.props.chat.last_message
            || nextProps.chat.draft_message !== this.props.chat.draft_message
            || nextProps.chat.unread_count !== this.props.chat.unread_count
            || nextProps.chat.unread_mention_count !== this.props.chat.unread_mention_count
            || nextProps.chat.is_marked_as_unread !== this.props.chat.is_marked_as_unread
            || nextProps.chat.position.is_pinned !== this.props.chat.position.is_pinned
            || nextProps.chat.photo?.small?.id !== this.props.chat.photo?.small?.id
            || nextProps.chat.title !== this.props.chat.title
            || nextProps.chat.last_read_outbox_message_id !== this.props.chat.last_read_outbox_message_id
            || nextState.ripple !== this.state.ripple
            || getUser(nextProps) !== getUser(this.props);
    }
    render(){
        const chat= {...this.props.chat}; // Clone chat object to avoid mutating it. Mutating it causes Saved messages and Deleted account chats to get past shouldComponentUpdate.
        var chatType= '';
        if (chat.type?.['@type'] == 'chatTypeBasicGroup' ||      // Groups are basic groups and non-channel supergroups
                (chat.type?.['@type'] == 'chatTypeSupergroup' &&
                chat.type?.is_channel == false)
        ){
            chatType= dialogs_chat;
        } 
        else if (chat.type?.['@type'] == 'chatTypeSupergroup' && // Channels are supergroups with is_channel set to true
                chat.type?.is_channel == true){
            chatType= dialogs_channel;
        } 
        else if ((chat.type?.['@type'] == 'chatTypePrivate') &&  // Bots are private chats with bot user type
                (this.props.users[chat.type?.user_id]?.type?.['@type'] == 'userTypeBot')){
            chatType= dialogs_bot;
        }
        if (chat.id==options['replies_bot_chat_id']) { // Replies bot does not have a type icon
            chatType= '';
        }

        if(isChatWithDeletedAccount(chat, this.props.users)) {
            chat.title= 'Deleted Account'; // Chat object is a copy, so there is no problem with mutating it.
        }

        const isVerified= isChatVerified(chat);

        if (chat.id==options['my_id']) {
            chat.title= 'Saved Messages';
        }

        var messageStatus = null;
        switch(getMessageStatus(chat, chat.last_message)) { // Is the message sending, sent or seen?
        case 'sending': 
            messageStatus = <span className="message-status-icon sending" dangerouslySetInnerHTML={{__html: dialogs_sending}}/>;
            break;
        case 'sent': 
            messageStatus = <span className="message-status-icon sent" dangerouslySetInnerHTML={{__html: dialogs_sent}}/>;
            break;
        case 'seen': 
            messageStatus = <span className="message-status-icon seen" dangerouslySetInnerHTML={{__html: dialogs_received}}/>;
            break;
        }

        var unreadBadge = null;
        const unreadBadgeClass= chat.notification_settings.mute_for ? 'unread-badge muted' : 'unread-badge';
        // Show the mention badge alone if there is exactly one mention and no other unread messages
        if (chat.unread_mention_count == 1 && chat.unread_count == chat.unread_mention_count) {
            unreadBadge = <span className="unread-badge mention">@</span>;
        } 
        // Show the mention badge with unread badge together if there are more than one unread messages and there are mentions
        else if (chat.unread_mention_count > 0 && chat.unread_count > 1 ) {
            unreadBadge = <React.Fragment>
                <span className="unread-badge mention">@</span>
                <span className={unreadBadgeClass}>{chat.unread_count}</span>
            </React.Fragment>;
        }
        // Show the unread badge alone if there are no mentions and there are unread messages
        else if (chat.unread_count > 0 && chat.unread_mention_count == 0) {
            unreadBadge = <span className={unreadBadgeClass}>{chat.unread_count}</span>;
        }
        // Show an empty badge if chat is manually marked as unread
        else if (chat.is_marked_as_unread) {
            unreadBadge = <span className={unreadBadgeClass}></span>;
        }

        var isOnline= false; // User online status
        if((chat.type['@type']== 'chatTypePrivate') && // Only private chats (except saved messages and service notifications)
            (chat.id!=options['my_id']) && (chat.id!=options['telegram_service_notifications_chat_id']) ){ 
            const user= this.props.users[chat.type.user_id];
            if(user) {
                isOnline= user.type['@type'] == 'userTypeRegular' && user.status['@type'] == 'userStatusOnline'; // Shouldn't be a bot
            }
        }

        return(
            <div className="chat" onContextMenu={e=> createContextMenu(e, <ChatContextMenu chat={chat}/>)}
                onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content" data-online={isOnline ? 'true' : 'false'}>
                    <ProfilePhoto name={chat.title} photo={chat.photo?.small} id={getChatTypeId(chat)}/>
                    <div className="details">
                        <div className="top">
                            <div className="left">
                                <div className="type-icon" dangerouslySetInnerHTML={{__html: chatType}}></div>
                                <div className="title">{chat.title}</div>
                                {isVerified && <span className="verified-icon">
                                    <span className="verified-icon-star" dangerouslySetInnerHTML={{__html: dialogs_verified_star}}></span>
                                    <span className="verified-icon-check" dangerouslySetInnerHTML={{__html: dialogs_verified_check}}></span>
                                </span>}
                            </div>
                            <div className="right">
                                {messageStatus}
                                {chat.last_message?.date && <span className="date">{smallDateTimeToString(chat.last_message.date)}</span>}
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                {(chat.draft_message && !unreadBadge) ?  // I don't know why, but Telegram Desktop does not show the draft message if the chat is unread.
                                    <span className="last-message">
                                        <span className="draft">Draft:</span> <span className="part-2">{chat.draft_message.input_message_text.text.text}</span>
                                    </span> 
                                    :
                                    <MessageSummaryWithoutIcon message={chat.last_message} users={this.props.users} chat={chat} className="last-message"/>
                                }
                            </div>
                            <div className="right">
                                {unreadBadge || ( // Unread badge overrides pinned icon
                                    chat.position?.is_pinned && <span className="pinned_icon" dangerouslySetInnerHTML={{__html: dialogs_pinned}}></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ChatListItem.propTypes = {
    /** The chat (TdObject) */
    chat: PropTypes.object.isRequired,
    /** A dictionary of all users */
    users: PropTypes.object.isRequired
};
const Chat = connect(state=> ({users: state}))(ChatListItem);

/** Renders the context menu of a chat */
function ChatContextMenu({chat}) {
    const [movableChatLists, setMovableChatLists] = React.useState([]);

    // Archive/unarchive chats
    React.useEffect(() => {
        TdLib.sendQuery({ // Only TDLib can know what lists we can add the chat to
            '@type': 'getChatListsToAddChat',
            chat_id: chat.id
        }).then(result => {
            setMovableChatLists(result.chat_lists.map(chatList=> {
                const text= { // Only archive / unarchive
                    'chatListMain': 'Unarchive chat', 
                    'chatListArchive': 'Archive chat'
                }[chatList['@type']];
                if(!text) return;
                return (
                    <Menu.MenuItem key={chatList.chat_filter_id || chatList['@type']} onClick={() => {
                        TdLib.sendQuery({
                            '@type': 'addChatToList',
                            chat_id: chat.id,
                            chat_list: chatList
                        }).then(() => {
                            if(chatList['@type'] == 'chatListMain') {
                                addToast(<Toast>Chat restored from your archive.</Toast>);
                            } 
                            else if(chatList['@type'] == 'chatListArchive') {
                                addToast(<Toast>
                                    Chat archived. <br/>
                                    Muted chats stay archived when new messages arrive.
                                </Toast>);
                            }
                        });
                    }}>
                        {text}
                    </Menu.MenuItem>
                );
            }));
        });
    }, []);

    return (
        <Menu.MenuContents>
            {movableChatLists /* Archive/unarchive */}
            <Menu.MenuItem onClick={()=> { // Pin/unpin
                TdLib.sendQuery({
                    '@type': 'toggleChatIsPinned',
                    chat_list: chat.position.list,
                    chat_id: chat.id,
                    is_pinned: !chat.position.is_pinned
                }).catch(error=> {
                    // Maximum pinned messages
                    if(error.code == 400) {
                        const max= chat.position.list['@type'] == 'chatListMain'? options['pinned_chat_count_max'] : options['pinned_archived_chat_count_max'];
                        addDialog('maximum-pinned-chats-reached', (
                            <ConfirmDialog id="maximum-pinned-chats-reached" largeFont={true} hideCancelButton={true}>
                                Sorry, you can only pin {max} chats to the top.
                            </ConfirmDialog>
                        ));
                    }
                });
            }}>
                {chat.position.is_pinned? 'Unpin from top' : 'Pin to top'}
            </Menu.MenuItem>
        </Menu.MenuContents>
    );
}
ChatContextMenu.propTypes = {
    chat: PropTypes.object.isRequired
};

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

    const moveToMainMenuToast= <Toast>
        Archive moved to the main menu! <br/>
        You can return it from the context menu of the archive button.
    </Toast>;

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
                            Collapse
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('hidden-expanded');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-expanded');
                            addToast(moveToMainMenuToast);
                        }}>
                            Move to main menu
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
                                <div className="title">Archived chats</div>
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
                            Expand
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setButtonState('hidden-collapsed');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-collapsed');
                            addToast(moveToMainMenuToast);
                        }}>
                            Move to main menu
                        </Menu.MenuItem>
                    </Menu.MenuContents>
                ))}>
                <RippleEffect {...ripple[0]} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content">
                    Archived chats
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
            <div>Loading...</div>
        </div>
    );
    if(list['@type']=='chatListFilter'){ // Empty filter / Filter not loaded
        if(unread.filters?.[list.chat_filter_id]?.total_chats_count !== 0) return loadingFallBack;
        return (
            <div className="empty">
                <div>No chats currently belong to this folder.</div>
                <LinkButton>Edit Folder</LinkButton>
            </div>
        );
    } else { // There are no chats at all / Chats not loaded
        if(unread.main?.total_chats_count !== 0) return loadingFallBack;
        return (
            <div className="empty">
                <div>Your chats will be here</div>
                <LinkButton>New contact</LinkButton>
            </div>
        );
    }
}
