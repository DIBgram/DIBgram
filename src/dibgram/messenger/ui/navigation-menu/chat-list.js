import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TdLib from '../../../TdWeb/tdlib';
import { compareChatList } from '../../chat-store';
import './chat-list.scss';

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
                <ul id="chat-list">
                    {this.getChatsFromList(this.props.chats, this.props.list).map(chat=>
                        <li className="chat" key={chat.id}>
                            {chat.title}
                        </li>
                    )}
                </ul>
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
