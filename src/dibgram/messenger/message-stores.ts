import { Store } from 'redux';
import TdApi from '../TdWeb/td_api';

type MessageStoreState= {
    messages: {[id: number]: TdApi.td_message};
    isLoaded: number;
}
type MessageStoreAction_AddMessages= { // Add a list of messages, which is returned from getChatHistory
    type: 'ADD_MESSAGES';
    messages: TdApi.td_message[];
}
type MessageStoreAction_AddMessage= { // Add a single message
    type: 'ADD_MESSAGE';
    message: TdApi.td_message;
}
type MessageStoreAction_RemoveMessages= { // Removes the messages with the given ids
    type: 'REMOVE_MESSAGES';
    messageIds: number[];
}
type MessageStoreAction_ReduceMessage= { // Replaces the message with the given id with the result of the reduce function
    type: 'REDUCE_MESSAGE';
    messageId: number;
    reduce: (message: TdApi.td_message) => TdApi.td_message;
}
type MessageStoreAction = MessageStoreAction_AddMessages | MessageStoreAction_AddMessage | MessageStoreAction_RemoveMessages | MessageStoreAction_ReduceMessage;

export function reducer(state: MessageStoreState= {
    messages: {},
    isLoaded: 0,
} , action: MessageStoreAction): MessageStoreState {
    switch (action.type) {
        case 'ADD_MESSAGES': {
            const result: {[key: number]: TdApi.td_message} = {};
            for (const message of action.messages) {
                result[message.id] = message;
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    ...result
                },
                isLoaded: state.isLoaded+1
            };
        }
        case 'ADD_MESSAGE': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.message.id]: action.message
                }
            };
        }
        case 'REMOVE_MESSAGES': {
            const result: {[key: number]: TdApi.td_message} = {};
            for (const messageId in state.messages) {
                if (!action.messageIds.includes(Number(messageId))) {
                    result[messageId] = state.messages[messageId];
                }
            }
            return {
                ...state,
                messages: result
            };  
        }
        case 'REDUCE_MESSAGE': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.messageId]: action.reduce(state.messages[action.messageId])
                }
            };
        }
        default:
            return state;
    }
}

export const messageStores: {[key: number]: Store<MessageStoreState, MessageStoreAction>} = {};