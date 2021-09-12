import { createStore } from 'redux';
import TdLib from '../TdWeb/tdlib';

const chatStore= createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
function reducer(state= {
    currentChatList: {'@type': 'chatListMain'},
    chats: [],
    filters: []
}, action) {
    switch (action.type) {
    case 'SET_CURRENT_CHAT_LIST':
        return {
            ...state,
            currentChatList: action.chatList
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

TdLib.registerUpdateHandler('updateNewChat', update => {
    chatStore.dispatch({
        type: 'ADD_CHAT',
        chat: update.chat
    });
});

TdLib.registerUpdateHandler('updateChatPosition', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_POSITION',
        chat_id: update.chat_id,
        position: update.position
    });
});

TdLib.registerUpdateHandler('updateChatLastMessage', update => {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_LAST_MESSAGE',
        chat_id: update.chat_id,
        last_message: update.last_message
    });
    for (let position of update.positions) {
        chatStore.dispatch({
            type: 'UPDATE_CHAT_POSITION',
            chat_id: update.chat_id,
            position: position
        });
    }
});
TdLib.registerUpdateHandler('updateChatDraftMessage', update => {
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
TdLib.registerUpdateHandler('updateChatPhoto', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_PHOTO',
        chat_id: update.chat_id,
        photo: update.photo
    });
});
TdLib.registerUpdateHandler('updateChatTitle', update=> {
    chatStore.dispatch({
        type: 'UPDATE_CHAT_TITLE',
        chat_id: update.chat_id,
        title: update.title
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