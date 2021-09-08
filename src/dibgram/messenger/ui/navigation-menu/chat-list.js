import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import { compareChatList } from '../../chat-store';
import './chat-list.scss';
import ProfilePhoto, { getChatTypeId } from '../profile-photo';
import { dialogs_chat, dialogs_channel, dialogs_bot } from '../../../ui/icon/icons';
import usersStore from '../../users-store';
import ScrollView from '../../../ui/scroll/scrollbar';
import getMessageSummary from '../../message/message-summary';

const ChatList= connect(state=> ({chats: state.chats, list: state.currentChatList}))(
    class ChatList extends React.Component { 
        static propTypes = {
            chats: PropTypes.array.isRequired,
            list: PropTypes.object.isRequired
        }


        /**
         * Returns a sorted list of all chats in the given chat list
         * @param {import('tdweb').TdObject[]} chats
         * @param {import('tdweb').TdObject} list
         */
        getChatsFromList(chats, list) {
            return chats.filter(chat => {
                for( const position of chat.positions ) {
                    if( position.order=='0' ) return false;
                    if (compareChatList(list, position.list)) {
                        return true;
                    }
                }
                return false;
            }).sort((a, b) => {
                let order1, order2;
                for( const position of a.positions ) {
                    if (compareChatList(list, position.list)) {
                        order1= position.order;
                    }
                }
                for( const position of b.positions ) {
                    if (compareChatList(list, position.list)) {
                        order2= position.order;
                    }
                }

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
            return (
                <ScrollView id="chat-list" scrollBarWidth="4">
                    {this.getChatsFromList(this.props.chats, this.props.list).map(chat=><ChatListItem key={chat.id} chat={chat} />)}
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
    if ( chat.type?.['@type'] == 'chatTypeBasicGroup' ||
        (chat.type?.['@type'] == 'chatTypeSupergroup' &&
         chat.type?.is_channel == false)){
        chatType= dialogs_chat;
    } else if (chat.type?.['@type'] == 'chatTypeSupergroup' &&
               chat.type?.is_channel == true){
        chatType= dialogs_channel;
    } else if ((chat.type?.['@type'] == 'chatTypePrivate') &&
               (usersStore.getState()[chat.type?.user_id]?.type?.['@type'] == 'userTypeBot')){
        chatType= dialogs_bot;
    }
    if(chat.last_message){
        var lastMessage= getMessageSummary(chat.last_message, chat);
    }
    return(
        <div className="chat">
            <ProfilePhoto name={chat.title} photo={chat.photo?.small} id={getChatTypeId(chat)}/>
            <div className="content">
                <div className="top">
                    <div className="left">
                        <div className="type-icon" dangerouslySetInnerHTML={{__html: chatType}}></div>
                        <div className="title">{chat.title}</div>
                    </div>
                    <div className="right"></div>
                </div>
                <div className="bottom">
                    <div className="left">
                        {lastMessage? 
                            <div className="last-message">
                                <span className="part-1">{lastMessage[0] || null}</span> <span className="part-2">{lastMessage[1] || null}</span>
                            </div> 
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
ChatListItem.propTypes = {
    chat: PropTypes.object.isRequired
};
