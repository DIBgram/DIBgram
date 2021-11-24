import { createStore } from 'redux';
import TdLib from '../../TdWeb/tdlib';
import TdApi from '../../TdWeb/td_api';
import { messageStores, reducer } from '../message-stores';

export function initChatHistory(chatId: number): void {
    messageStores[chatId] = createStore(reducer);
}
export function loadChatHistory(chatId: number, fromMessageId = 0, limit= 100): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        TdLib.sendQuery({
            '@type': 'getChatHistory',
            chat_id: chatId,
            from_message_id: fromMessageId,
            limit: limit
        }).then((result) => {
            result= result as TdApi.td_messages;
            if(result.messages) {
                messageStores[chatId].dispatch({
                    type: 'ADD_MESSAGES',
                    messages: result.messages
                });
            }
            resolve(result.total_count);
        }, reject);
    });
}

TdLib.registerUpdateHandler<TdApi.td_updateNewMessage>('updateNewMessage', (update) => {
    messageStores[update.message.chat_id].dispatch({
        type: 'ADD_MESSAGE',
        message: update.message,
    });
});