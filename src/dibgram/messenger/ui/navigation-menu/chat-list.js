import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import { compareChatList } from '../../chat-store';
import './chat-list.scss';
import ProfilePhoto, { getChatTypeId } from '../profile-photo';
import { dialogs_chat, dialogs_channel, dialogs_bot, dialogs_pinned, dialogs_verified_star, dialogs_verified_check, dialogs_sending, dialogs_sent, dialogs_received } from '../../../ui/icon/icons';
import usersStore from '../../users-store';
import ScrollView from '../../../ui/scroll/scrollbar';
import MessageSummaryWithoutIcon from '../../message/message-summary-noicon';
import LinkButton from '../../../ui/elements/link-button';
import { currentConnectionState } from '../../../ui/components/connecting';
import { isChatWithDeletedAccount, isChatVerified } from '../../chat-misc';
import { smallDateTimeToString } from '../../../time-tostring';
import { getMessageStatus } from '../../message-misc';
import options from '../../../TdWeb/options';

const ChatList= connect(state=> ({chats: state.chats, list: state.currentChatList}))(
    class ChatList extends React.Component { 
        static propTypes = {
            chats: PropTypes.array.isRequired,
            list: PropTypes.object.isRequired
        }


        /**
         * Returns a sorted list of all chats in the given chat list
         * 
         * Also for every chat, sets `chat.position` to the matching position (creates copy instead of modifying original object)
         * @param {import('tdweb').TdObject[]} chats
         * @param {import('tdweb').TdObject} list
         */
        getChatsFromList(chats, list) {
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


        render() {
            const array= this.getChatsFromList(this.props.chats, this.props.list).map(chat=><ChatListItem key={chat.id} chat={chat} />);
            return (
                <ScrollView id="chat-list" scrollBarWidth="4">
                    {array.length ? array :  <EmptyChatList list={this.props.list} />}
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

export function ChatListItem({chat}){
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

    return(
        <div className="chat">
            <ProfilePhoto name={chat.title} photo={chat.photo?.small} id={getChatTypeId(chat)}/>
            <div className="content">
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
                        <Provider store={usersStore}>
                            <MessageSummaryWithoutIcon message={chat.last_message} chat={chat} className="last-message"/>
                        </Provider>
                    </div>
                    <div className="right">
                        {chat.position?.is_pinned && <span className="pinned_icon" dangerouslySetInnerHTML={{__html: dialogs_pinned}}></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
ChatListItem.propTypes = {
    chat: PropTypes.object.isRequired
};

function EmptyChatList({list}) {
    if(currentConnectionState!='connectionStateReady') {
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
