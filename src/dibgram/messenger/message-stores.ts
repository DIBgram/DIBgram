import { Store } from 'redux';
import TdApi from '../TdWeb/td_api';

type MessageStoreState= {
    messages: {[id: number]: TdApi.td_message};
    isLoaded: number;
}
type MessageStoreAction_AddMessages= {
    type: 'ADD_MESSAGES';
    messages: TdApi.td_message[];
}
type MessageStoreAction_AddMessage= {
    type: 'ADD_MESSAGE';
    message: TdApi.td_message;
}
type MessageStoreAction = MessageStoreAction_AddMessages | MessageStoreAction_AddMessage;

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
        default:
            return state;
    }
}

export const messageStores: {[key: number]: Store<MessageStoreState, MessageStoreAction>} = {};