import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import RippleEffect, { handleMyMouseEvents } from '../../../ui/elements/ripple-effect';
import { dialogs_bot, dialogs_channel, dialogs_chat, dialogs_pinned, dialogs_received, dialogs_sending, dialogs_sent, dialogs_verified_check, dialogs_verified_star } from '../../../ui/icon/icons';
import { isChatVerified, isChatWithDeletedAccount } from '../../chat-misc';
import options from '../../../TdWeb/options';
import { getMessageStatus } from '../../message-misc';
import __, { __pl } from '../../../language-pack/language-pack';
import { createContextMenu } from '../../../ui/menu/context-menu';
import ProfilePhoto, { getChatTypeId } from '../../../ui/components/profile-photo';
import { smallDateTimeToString } from '../../../time-tostring';
import MessageSummaryWithoutIcon from '../../message/message-summary-noicon';
import Menu from '../../../ui/menu/menu';
import Toast, { addToast } from '../../../ui/dialog/toast';
import { addDialog } from '../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';

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
            chat.title= __('lng_deleted'); // Chat object is a copy, so there is no problem with mutating it.
        }

        const isVerified= isChatVerified(chat);

        if (chat.id==options['my_id']) {
            chat.title= __('lng_saved_messages');
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
                                        <span className="draft">{__('lng_from_draft')}:</span> <span className="part-2">{chat.draft_message.input_message_text.text.text}</span>
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
export const Chat = connect(state=> ({users: state}))(ChatListItem);

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
                    'chatListMain': __('lng_archived_add'), 
                    'chatListArchive': __('lng_archived_remove')
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
                                addToast(<Toast>{__('lng_archived_removed')}</Toast>);
                            } 
                            else if(chatList['@type'] == 'chatListArchive') {
                                addToast(<Toast>{__('lng_archived_added')}</Toast>);
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
                                {__pl('lng_error_pinned_max', max)}
                            </ConfirmDialog>
                        ));
                    }
                });
            }}>
                {chat.position.is_pinned? __('lng_context_unpin_from_top') : __('lng_context_pin_to_top')}
            </Menu.MenuItem>
        </Menu.MenuContents>
    );
}
ChatContextMenu.propTypes = {
    chat: PropTypes.object.isRequired
};