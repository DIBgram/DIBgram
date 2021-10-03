import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import { compareChatList } from '../../chat-store';
import './chat-list.scss';
import ProfilePhoto, { getChatTypeId } from '../../../ui/components/profile-photo';
import { dialogs_chat, dialogs_channel, dialogs_bot, dialogs_pinned, dialogs_verified_star, dialogs_verified_check, dialogs_sending, dialogs_sent, dialogs_received, archive_userpic } from '../../../ui/icon/icons';
import usersStore from '../../users-store';
import ScrollView from '../../../ui/scroll/scrollbar';
import MessageSummaryWithoutIcon from '../../message/message-summary-noicon';
import LinkButton from '../../../ui/elements/link-button';
import { isChatWithDeletedAccount, isChatVerified } from '../../chat-misc';
import { smallDateTimeToString } from '../../../time-tostring';
import { getMessageStatus } from '../../message-misc';
import options from '../../../TdWeb/options';
import RippleEffect, { handleMyMouseEvents, handleMyMouseEventsFunction } from '../../../ui/elements/ripple-effect';
import { createContextMenu } from '../../../ui/menu/context-menu';
import Menu from '../../../ui/menu/menu';

/**
 * Returns a sorted list of all chats in the given chat list
 * 
 * Also for every chat, sets `chat.position` to the matching position (creates copy instead of modifying original object)
 * @param {import('tdweb').TdObject[]} chats
 * @param {import('tdweb').TdObject} list
 */
function getChatsFromList(chats, list) {
    return chats.map(chat => {
        for( const position of chat.positions ) {
            if (compareChatList(list, position.list)) {
                if( position.order=='0' ) return false;
                return {
                    ...chat,
                    position: position
                };
            }
        }
        return chat;
    })
        .filter(chat => !!chat.position)
        .sort((a, b) => {
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

const ChatList= connect(state=> ({connectionState: state}))(
    class ChatList extends React.Component { 
        static propTypes = {
            chats: PropTypes.array.isRequired,
            list: PropTypes.object.isRequired,
            connectionState: PropTypes.string.isRequired
        }

        // When updating, TDLib sends updates of type
        // updateChatLastMessage, where only the last one is needed.
        // This greatly hurts performance.
        // However, we can workaround it by not re-rendering 
        // until all updates have arrived.
        shouldComponentUpdate(nextProps) {
            return (nextProps.chats !== this.props.chats 
                || nextProps.list !== this.props.list 
                || nextProps.connectionState !== this.props.connectionState)
                && nextProps.connectionState != 'connectionStateUpdating';
        }

        render() {
            const array= getChatsFromList(this.props.chats, this.props.list).map(chat=><ChatListItem key={chat.id} chat={chat} />);
            return (
                <ScrollView id="chat-list" scrollBarWidth="4">
                    <Provider store={usersStore}>
                        {this.props.list['@type']=='chatListMain' && <ArchivedChatsItem chats={this.props.chats}/>}
                        {array.length ? array :  <EmptyChatList list={this.props.list} connectionState={this.props.connectionState}/>}
                    </Provider>
                </ScrollView>
            );
        }

        componentDidMount() {
            TdLib.sendQuery({
                '@type': 'getChats',
                'chat_list': {
                    '@type': 'chatListMain'
                },
                'offset_order': '9223372036854775807',
                'offset_chat_id': 0,
                'limit': 50
            });
        }
    }
);
export default ChatList;

export class ChatListItem extends React.Component {
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
        return nextProps.chat.id !== this.props.chat.id
            || nextProps.chat.last_message !== this.props.chat.last_message
            || nextProps.chat.draft_message !== this.props.chat.draft_message
            || nextProps.chat.unread_count !== this.props.chat.unread_count
            || nextProps.chat.unread_mention_count !== this.props.chat.unread_mention_count
            || nextProps.chat.position.is_pinned !== this.props.chat.position.is_pinned
            || nextProps.chat.photo?.small?.id !== this.props.chat.photo?.small?.id
            || nextProps.chat.title !== this.props.chat.title
            || nextProps.chat.last_read_outbox_message_id !== this.props.chat.last_read_outbox_message_id
            || nextState.ripple !== this.state.ripple;
    }
    render(){
        const chat= {...this.props.chat}; // Clone chat object to avoid mutating it. Mutating it causes Saved messages and Deleted account chats to get past shouldComponentUpdate.
        var chatType= '';
        if (chat.type?.['@type'] == 'chatTypeBasicGroup' ||
                (chat.type?.['@type'] == 'chatTypeSupergroup' &&
                chat.type?.is_channel == false)
        ){
            chatType= dialogs_chat;
        } 
        else if (chat.type?.['@type'] == 'chatTypeSupergroup' &&
                chat.type?.is_channel == true){
            chatType= dialogs_channel;
        } 
        else if ((chat.type?.['@type'] == 'chatTypePrivate') &&
                (usersStore.getState()[chat.type?.user_id]?.type?.['@type'] == 'userTypeBot')){
            chatType= dialogs_bot;
        }
        if (chat.id==options['replies_bot_chat_id']) {
            chatType= '';
        }

        if(isChatWithDeletedAccount(chat)) {
            chat.title= 'Deleted Account'; // Chat object is a copy, so there is no problem with mutating it.
        }

        const isVerified= isChatVerified(chat);

        if (chat.id==options['my_id']) {
            chat.title= 'Saved Messages';
        }

        var messageStatus = null;
        switch(getMessageStatus(chat, chat.last_message)) {
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
        else {
            unreadBadge = chat.position?.is_pinned && <span className="pinned_icon" dangerouslySetInnerHTML={{__html: dialogs_pinned}}></span>;
        }

        return(
            <div className="chat" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content">
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
                                {chat.draft_message ? 
                                    <span className="last-message">
                                        <span className="draft">Draft:</span> <span className="part-2">{chat.draft_message.input_message_text.text.text}</span>
                                    </span> 
                                    : 
                                    <MessageSummaryWithoutIcon message={chat.last_message} chat={chat} className="last-message"/>
                                }
                            </div>
                            <div className="right">
                                {unreadBadge}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ChatListItem.propTypes = {
    chat: PropTypes.object.isRequired
};

function ArchivedChatsItem({chats}) {
    const chatsInList = getChatsFromList(chats, {'@type': 'chatListArchive'});
    if(!chatsInList.length) return null; // There are no archived chats

    const ripple= React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);

    const [type, setType]= React.useState(localStorage.getItem('dibgram-archived-chats-button-mode'));
    switch(type) {
    case 'expanded':
    default:
        return (
            <div 
                className="chat archived" 
                onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}
                onContextMenu={e=> createContextMenu(e, (
                    <Menu.MenuContents>
                        <Menu.MenuItem onClick={()=>{
                            setType('collapsed');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'collapsed');
                        }}>
                            Collapse
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setType('hidden-expanded');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-expanded');
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
                                    <span className="part-2">
                                        {chatsInList.map(chat => chat.title || 'Deleted Account').join(', ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    case 'collapsed':
        return (
            <div
                className="archived" 
                onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}
                onContextMenu={e=> createContextMenu(e, (
                    <Menu.MenuContents>
                        <Menu.MenuItem onClick={()=>{
                            setType('expanded');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'expanded');
                        }}>
                            Expand
                        </Menu.MenuItem>
                        <Menu.MenuItem onClick={()=>{
                            setType('hidden-collapsed');
                            localStorage.setItem('dibgram-archived-chats-button-mode', 'hidden-collapsed');
                        }}>
                            Move to main menu
                        </Menu.MenuItem>
                    </Menu.MenuContents>
                ))}>
                <RippleEffect {...ripple[0]} color="var(--theme-color-dialogsRippleBg)"/>
                <div className="content">
                    Archived chats
                </div>
            </div>
        );
    case 'hidden-expanded':
    case 'hidden-collapsed':
        return null;
    }
}
ArchivedChatsItem.propTypes = {
    chats: PropTypes.array.isRequired
};

function EmptyChatList({list, connectionState}) {
    if(connectionState!='connectionStateReady') {
        return (
            <div className="empty">
                <div>Loading...</div>
            </div>
        );
    }
    if(list['@type']=='chatListFilter'){
        return (
            <div className="empty">
                <div>No chats currently belong to this folder.</div>
                <LinkButton>Edit Folder</LinkButton>
            </div>
        );
    } else {
        return (
            <div className="empty">
                <div>Your chats will be here</div>
                <LinkButton>New contact</LinkButton>
            </div>
        );
    }
}
