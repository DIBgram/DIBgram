import { createStore } from 'redux';
import TdLib from '../TdWeb/tdlib';

const chatStore= createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
function reducer(state= {
    currentChatList: {'@type': 'chatListMain'},
    archiveState: 'closed',
    archiveButtonState: localStorage.getItem('dibgram-archived-chats-button-mode'),
    chats: [],
    filters: [],
    unread: {
        main: {},
        archive: {},
        filters: {}
    }
}, action) {
    switch (action.type) {
    case 'SET_CURRENT_CHAT_LIST':
        return {
            ...state,
            currentChatList: action.chatList
        };
    case 'SET_ARCHIVE_STATE':
        return {
            ...state,
            archiveState: action.archiveState
        };
    case 'UPDATE_UNREAD_MESSAGE_COUNT':
        if(action.chat_list['@type'] === 'chatListMain') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    main: {
                        ...state.unread.main,
                        unread_messages_count: action.unread_count,
                        unread_unmuted_messages_count: action.unread_unmuted_count
                    }
                }
            };
        } else if(action.chat_list['@type'] === 'chatListArchive') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    archive: {
                        ...state.unread.archive,
                        unread_messages_count: action.unread_count,
                        unread_unmuted_messages_count: action.unread_unmuted_count
                    }
                }
            };
        } else if(action.chat_list['@type'] === 'chatListFilter') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    filters: {
                        ...state.unread.filters,
                        [action.chat_list.chat_filter_id]: {
                            ...state.unread.filters[action.chat_list.chat_filter_id],
                            unread_messages_count: action.unread_count,
                            unread_unmuted_messages_count: action.unread_unmuted_count
                        }
                    }
                }
            };
        }
        return state;
    case 'UPDATE_UNREAD_CHAT_COUNT':
        if(action.chat_list['@type'] === 'chatListMain') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    main: {
                        ...state.unread.main,
                        total_chats_count: action.total_count,
                        unread_chats_count: action.unread_count,
                        unread_unmuted_chats_count: action.unread_unmuted_count,
                        marked_as_unread_chats_count: action.marked_as_unread_count,
                        marked_as_unread_unmuted_chats_count: action.marked_as_unread_unmuted_count
                    }
                }
            };
        } else if(action.chat_list['@type'] === 'chatListArchive') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    archive: {
                        ...state.unread.archive,
                        total_chats_count: action.total_count,
                        unread_chats_count: action.unread_count,
                        unread_unmuted_chats_count: action.unread_unmuted_count,
                        marked_as_unread_chats_count: action.marked_as_unread_count,
                        marked_as_unread_unmuted_chats_count: action.marked_as_unread_unmuted_count
                    }
                }
            };
        } else if(action.chat_list['@type'] === 'chatListFilter') {
            return {
                ...state,
                unread: {
                    ...state.unread,
                    filters: {
                        ...state.unread.filters,
                        [action.chat_list.chat_filter_id]: {
                            ...state.unread.filters[action.chat_list.chat_filter_id],
                            total_chats_count: action.total_count,
                            unread_chats_count: action.unread_count,
                            unread_unmuted_chats_count: action.unread_unmuted_count,
                            marked_as_unread_chats_count: action.marked_as_unread_count,
                            marked_as_unread_unmuted_chats_count: action.marked_as_unread_unmuted_count
                        }
                    }
                }
            };
        }
        return state;

    case 'SET_ARCHIVE_BUTTON_STATE':
        return {
            ...state,
            archiveButtonState: action.archiveButtonState
        };
    case 'ADD_CHAT':
        return {
            ...state,
            chats: [
                ...state.chats,
                action.chat
            ]
        };
    case 'UPDATE_CHAT_POSITION': // Replace the position property of a chat
        return {
            ...state,
            chats: state.chats.map((chat) => {
                if (chat.id === action.chat_id) {
                    let changed=false;
                    let newChat = {
                        ...chat,
                        positions: chat.positions.map((position) => {
                            if (compareChatList(position.list, action.position.list)) {
                                changed=true;
                                return action.position;
                            }
                            return position;
                        })
                    };
                    if(!changed) {
                        return {
                            ...chat,
                            positions: [
                                ...chat.positions,
                                action.position
                            ]
                        };
                    }
                    return newChat;
                }
                return chat;
            })
        };
    case 'REMOVE_CHAT':
        return {
            ...state,
            chats: state.chats.filter(chat => chat.id !== action.chat.id)
        };
    case 'REPLACE_CHAT_FILTERS':
        return {
            ...state,
            filters: action.payload
        };
    case 'UPDATE_CHAT_PROPERTY':
        return {
            ...state,
            chats: state.chats.map((chat) => {
                if (chat.id === action.chat_id) {
                    return {
                        ...chat,
                        [action.property]: action.value
                    };
                }
                return chat;
            })
        };
    case 'UPDATE_CHAT_PHOTO':
        return {
            ...state,
            chats: state.chats.map((chat) => {
                if (chat.id === action.chat_id) {
                    return {
                        ...chat,
                        photo: action.photo
                    };
                }
                return chat;
            })
        };
    case 'UPDATE_CHAT_TITLE':
        return {
            ...state,
            chats: state.chats.map((chat) => {
                if (chat.id === action.chat_id) {
                    return {
                        ...chat,
                        title: action.title
                    };
                }
                return chat;
            })
        };
    case 'UPDATE_CHAT_LAST_MESSAGE':
        return {
            ...state,
            chats: state.chats.map((chat) => {
                if (chat.id === action.chat_id) {
                    return {
                        ...chat,
                        last_message: action.last_message
                    };
                }
                return chat;
            })
        };
    default:
        return state;
    }
}

TdLib.registerUpdateHandler('updateUnreadChatCount', (update) => {
    chatStore.dispatch({
        type: 'UPDATE_UNREAD_CHAT_COUNT',
        ...update
    });
});

TdLib.registerUpdateHandler('updateUnreadMessageCount', (update) => {
    chatStore.dispatch({
        type: 'UPDATE_UNREAD_MESSAGE_COUNT',
        ...update
    });
});

TdLib.registerUpdateHandler('updateNewChat', update => {
    chatStore.dispatch({
        type: 'ADD_CHAT',
        chat: update.chat
    });
});

TdLib.registerUpdateHandler('updateChatActionBar', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'action_bar',
        chat_id: update.chat_id,
        value: update.action_bar
    });
});

TdLib.registerUpdateHandler('updateChatDefaultDisableNotification', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'default_disable_notification',
        chat_id: update.chat_id,
        value: update.default_disable_notification
    });
});

TdLib.registerUpdateHandler('updateChatDraftMessage', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'draft_message',
        chat_id: update.chat_id,
        value: update.draft_message
    });
    for (let position of update.positions) {
        chatStore.dispatch({
            type: 'UPDATE_CHAT_POSITION',
            chat_id: update.chat_id,
            position: position
        });
    }
});

TdLib.registerUpdateHandler('updateChatFilters', update=> {
    if(update.chat_filters) {
        chatStore.dispatch({
            type: 'REPLACE_CHAT_FILTERS',
            payload: update.chat_filters
        });
    }
});

TdLib.registerUpdateHandler('updateChatHasScheduledMessages', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'has_scheduled_messages',
        chat_id: update.chat_id,
        value: update.has_scheduled_messages
    });
});

TdLib.registerUpdateHandler('updateChatIsBlocked', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'is_blocked',
        chat_id: update.chat_id,
        value: update.is_blocked
    });
});

TdLib.registerUpdateHandler('updateChatIsMarkedAsUnread', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'is_marked_as_unread',
        chat_id: update.chat_id,
        value: update.is_marked_as_unread
    });
});

TdLib.registerUpdateHandler('updateChatLastMessage', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'last_message',
        chat_id: update.chat_id,
        value: update.last_message
    });
    for (let position of update.positions) {
        chatStore.dispatch({
            type: 'UPDATE_CHAT_POSITION',
            chat_id: update.chat_id,
            position: position
        });
    }
});

TdLib.registerUpdateHandler('updateChatNotificationSettings', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'notification_settings',
        chat_id: update.chat_id,
        value: update.notification_settings
    });
});

TdLib.registerUpdateHandler('updateChatOnlineMemberCount', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'online_member_count',
        chat_id: update.chat_id,
        value: update.online_member_count
    });
});

TdLib.registerUpdateHandler('updateChatPermissions', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'permissions',
        chat_id: update.chat_id,
        value: update.permissions
    });
});

TdLib.registerUpdateHandler('updateChatPhoto', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'photo',
        chat_id: update.chat_id,
        value: update.photo
    });
});

TdLib.registerUpdateHandler('updateChatPosition', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_POSITION',
        chat_id: update.chat_id,
        position: update.position
    });
});

TdLib.registerUpdateHandler('updateChatReadInbox', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'unread_count',
        chat_id: update.chat_id,
        value: update.unread_count
    });
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'last_read_inbox_message_id',
        chat_id: update.chat_id,
        value: update.last_read_inbox_message_id
    });
});

TdLib.registerUpdateHandler('updateChatReadOutbox', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'last_read_outbox_message_id',
        chat_id: update.chat_id,
        value: update.last_read_outbox_message_id
    });
});

TdLib.registerUpdateHandler('updateChatReplyMarkup', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'reply_markup_message_id',
        chat_id: update.chat_id,
        value: update.reply_markup_message_id
    });
});

TdLib.registerUpdateHandler('updateChatTitle', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'title',
        chat_id: update.chat_id,
        value: update.title
    });
});

TdLib.registerUpdateHandler('updateChatUnreadMentionCount', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'unread_mention_count',
        chat_id: update.chat_id,
        value: update.unread_mention_count
    });
});

TdLib.registerUpdateHandler('updateMessageMentionRead', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'unread_mention_count',
        chat_id: update.chat_id,
        value: update.unread_mention_count
    });
});

export default chatStore;

export function compareChatList(list1, list2) {
    if (list1['@type'] != list2['@type']) {
        return false;
    }
    if (list1['@type'] == 'chatListFilter') {
        return list1.chat_filter_id == list2.chat_filter_id;
    }
    return true;
}

/**
 * Gets a chat from a chat ID. Has caching.
 */
export function getChat(id) {
    let res;
    for(let chat of chatStore.getState()?.chats) {
        if(chat.id==id) res = Promise.resolve(chat);
    }
    if(!res){
        res = TdLib.sendQuery({
            '@type': 'getChat',
            'chat_id': id
        });
    }
    return res;
}
