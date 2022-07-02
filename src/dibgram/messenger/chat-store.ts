import { createStore, Store } from 'redux';
import TdLib from '../TdWeb/tdlib';
import TdApi from '../TdWeb/td_api';

/**
 * It is recommended to use the outline view or find tool to navigate this file.
 */

export type ChatStoreState = {
    currentChatList: TdApi.ChatList,
    archiveState: 'open' | 'closing' | 'closed',
    archiveButtonState: 'expanded' | 'collapsed' | 'hidden-expanded' | 'hidden-collapsed',
    chats: TdApi.chat[],
    filters: TdApi.chatFilterInfo[],
    selectedChat: number,
    unread: ChatStoreUnreadData
}

export type ChatStoreUnreadData = {
    main: ChatListUnreadData,
    archive: ChatListUnreadData,
    filters: {
        [filterId: number]: ChatListUnreadData,
    }
}

export type ChatListUnreadData = {
    unread_messages_count?: number,
    unread_unmuted_messages_count?: number,
    total_chats_count?: number,
    unread_chats_count?: number,
    unread_unmuted_chats_count?: number,
    marked_as_unread_chats_count?: number,
    marked_as_unread_unmuted_chats_count?: number,
}

export type ChatStoreAction = {
    type: 'SET_CURRENT_CHAT_LIST',
    chatList: TdApi.ChatList,
} | {
    type: 'SET_ARCHIVE_STATE',
    archiveState: 'open' | 'closing' | 'closed',
} | {
    type: 'UPDATE_UNREAD_MESSAGE_COUNT',
    chat_list: TdApi.ChatList,
    unread_count: number,
    unread_unmuted_count: number,
} | {
    type: 'UPDATE_UNREAD_CHAT_COUNT',
    chat_list: TdApi.ChatList,
    total_count: number,
    unread_count: number,
    unread_unmuted_count: number,
    marked_as_unread_count: number,
    marked_as_unread_unmuted_count: number,
} | {
    type: 'SET_ARCHIVE_BUTTON_STATE',
    archiveButtonState: 'expanded' | 'collapsed' | 'hidden-expanded' | 'hidden-collapsed',
} | {
    type: 'ADD_CHAT',
    chat: TdApi.chat,
} | {
    type: 'UPDATE_CHAT_POSITION',
    chat_id: number,
    position: TdApi.chatPosition,
} | {
    type: 'REPLACE_CHAT_FILTERS',
    payload: TdApi.chatFilterInfo[],
} | (
    Exclude<{ [K in keyof TdApi.chat]: {
        type: 'UPDATE_CHAT_PROPERTY',
        chat_id: number,
        property: K
        value: TdApi.chat[K],
    } }[keyof TdApi.chat], undefined>
) | {
    type: 'SELECT_CHAT',
    chat_id: number,
}

const chatStore= (createStore<ChatStoreState, ChatStoreAction, any, any>(reducer, 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__?.())) as Store<ChatStoreState, ChatStoreAction>;
    
function reducer(state: ChatStoreState= {
    currentChatList: {'@type': 'chatListMain'},
    archiveState: 'closed',
    archiveButtonState: localStorage.getItem('dibgram-archived-chats-button-mode') as 'expanded' | 'collapsed' | 'hidden-expanded' | 'hidden-collapsed',
    chats: [],
    filters: [],
    selectedChat: -1,
    unread: {
        main: {},
        archive: {},
        filters: {}
    }
}, action: ChatStoreAction) {
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
                        const newChat = {
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
        case 'SELECT_CHAT':
            return {
                ...state,
                selectedChat: action.chat_id
            };
        default:
            return state;
    }
}

TdLib.registerUpdateHandler<TdApi.updateUnreadChatCount>('updateUnreadChatCount', (update) => {
    chatStore.dispatch({
        type: 'UPDATE_UNREAD_CHAT_COUNT',
        ...update
    });
});

TdLib.registerUpdateHandler<TdApi.updateUnreadMessageCount>('updateUnreadMessageCount', (update) => {
    chatStore.dispatch({
        type: 'UPDATE_UNREAD_MESSAGE_COUNT',
        ...update
    });
});

TdLib.registerUpdateHandler<TdApi.updateNewChat>('updateNewChat', update => {
    chatStore.dispatch({
        type: 'ADD_CHAT',
        chat: update.chat
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatActionBar>('updateChatActionBar', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'action_bar',
        chat_id: update.chat_id,
        value: update.action_bar
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatDefaultDisableNotification>('updateChatDefaultDisableNotification', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'default_disable_notification',
        chat_id: update.chat_id,
        value: update.default_disable_notification
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatDraftMessage>('updateChatDraftMessage', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'draft_message',
        chat_id: update.chat_id,
        value: update.draft_message
    });
    for (const position of update.positions) {
        chatStore.dispatch({
            type: 'UPDATE_CHAT_POSITION',
            chat_id: update.chat_id,
            position: position
        });
    }
});

TdLib.registerUpdateHandler<TdApi.updateChatFilters>('updateChatFilters', update=> {
    if(update.chat_filters) {
        chatStore.dispatch({
            type: 'REPLACE_CHAT_FILTERS',
            payload: update.chat_filters
        });
    }
});

TdLib.registerUpdateHandler<TdApi.updateChatHasScheduledMessages>('updateChatHasScheduledMessages', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'has_scheduled_messages',
        chat_id: update.chat_id,
        value: update.has_scheduled_messages
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatIsBlocked>('updateChatIsBlocked', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'is_blocked',
        chat_id: update.chat_id,
        value: update.is_blocked
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatIsMarkedAsUnread>('updateChatIsMarkedAsUnread', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'is_marked_as_unread',
        chat_id: update.chat_id,
        value: update.is_marked_as_unread
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatLastMessage>('updateChatLastMessage', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'last_message',
        chat_id: update.chat_id,
        value: update.last_message
    });
    for (const position of update.positions) {
        chatStore.dispatch({
            type: 'UPDATE_CHAT_POSITION',
            chat_id: update.chat_id,
            position: position
        });
    }
});

TdLib.registerUpdateHandler<TdApi.updateChatMessageTtl>('updateChatMessageTtl', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'message_ttl',
        chat_id: update.chat_id,
        value: update.message_ttl
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatNotificationSettings>('updateChatNotificationSettings', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'notification_settings',
        chat_id: update.chat_id,
        value: update.notification_settings
    });
});

// Temporarily disabled because `online_member_count` is not a field in `chat`
// TdLib.registerUpdateHandler<TdApi.updateChatOnlineMemberCount>('updateChatOnlineMemberCount', update=> {
//     chatStore.dispatch({
//         type: 'UPDATE_CHAT_PROPERTY',
//         property: 'online_member_count',
//         chat_id: update.chat_id,
//         value: update.online_member_count
//     });
// });

TdLib.registerUpdateHandler<TdApi.updateChatPermissions>('updateChatPermissions', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'permissions',
        chat_id: update.chat_id,
        value: update.permissions
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatPhoto>('updateChatPhoto', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'photo',
        chat_id: update.chat_id,
        value: update.photo
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatPosition>('updateChatPosition', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_POSITION',
        chat_id: update.chat_id,
        position: update.position
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatReadInbox>('updateChatReadInbox', update => {
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

TdLib.registerUpdateHandler<TdApi.updateChatReadOutbox>('updateChatReadOutbox', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'last_read_outbox_message_id',
        chat_id: update.chat_id,
        value: update.last_read_outbox_message_id
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatReplyMarkup>('updateChatReplyMarkup', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'reply_markup_message_id',
        chat_id: update.chat_id,
        value: update.reply_markup_message_id
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatTheme>('updateChatTheme', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'theme_name',
        chat_id: update.chat_id,
        value: update.theme_name
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatTitle>('updateChatTitle', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'title',
        chat_id: update.chat_id,
        value: update.title
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatUnreadMentionCount>('updateChatUnreadMentionCount', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'unread_mention_count',
        chat_id: update.chat_id,
        value: update.unread_mention_count
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatPendingJoinRequests>('updateChatPendingJoinRequests', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'pending_join_requests',
        chat_id: update.chat_id,
        value: update.pending_join_requests
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatVideoChat>('updateChatVideoChat', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'video_chat',
        chat_id: update.chat_id,
        value: update.video_chat
    });
});

TdLib.registerUpdateHandler<TdApi.updateMessageMentionRead>('updateMessageMentionRead', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'unread_mention_count',
        chat_id: update.chat_id,
        value: update.unread_mention_count
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatMessageSender>('updateChatMessageSender', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'message_sender_id',
        chat_id: update.chat_id,
        value: update.message_sender_id
    });
});

TdLib.registerUpdateHandler<TdApi.updateChatHasProtectedContent>('updateChatHasProtectedContent', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PROPERTY',
        property: 'has_protected_content',
        chat_id: update.chat_id,
        value: update.has_protected_content
    });
});

export default chatStore;

/**
 * Check if two chat lists are equal
 * @param list1 
 * @param list2 
 * @returns True if the provided objects refer to the same list. Otherwise false
 */
export function compareChatList(list1: TdApi.ChatList, list2: TdApi.ChatList): boolean {
    if (list1['@type'] != list2['@type']) { // First compare type
        return false;
    }
    if (list1['@type'] == 'chatListFilter' ) { // Then Compare folder ID
        return list1.chat_filter_id == (list2 as TdApi.chatListFilter).chat_filter_id;
    }
    return true;
}

/**
 * Gets a chat from a chat ID. Supports caching.
 */
export function getChat(id: number): Promise<TdApi.chat> {
    let res;
    for(const chat of chatStore.getState()?.chats) {
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

/**
 * Gets a chat from a chat ID. Does not support caching to prevent promises complexity.
 * @param id
 */
export function getChatNoCache(id: number): TdApi.chat|undefined {
    for(const chat of chatStore.getState()?.chats) {
        if(chat.id==id) return chat;
    }
}
