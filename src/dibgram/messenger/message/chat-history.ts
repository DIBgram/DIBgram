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
TdLib.registerUpdateHandler<TdApi.td_updateMessageSendSucceeded>('updateMessageSendSucceeded', (update) => {
    messageStores[update.message.chat_id].dispatch({
        type: 'REMOVE_MESSAGES',
        messageIds: [update.old_message_id],
    });
    messageStores[update.message.chat_id].dispatch({
        type: 'ADD_MESSAGE',
        message: update.message,
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateDeleteMessages>('updateDeleteMessages', (update) => {
    messageStores[update.chat_id].dispatch({
        type: 'REMOVE_MESSAGES',
        messageIds: update.message_ids,
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageContent>('updateMessageContent', (update) => {
    messageStores[update.chat_id].dispatch({
        type: 'REDUCE_MESSAGE',
        messageId: update.message_id,
        reduce: (message) => {
            return {
                ...message,
                content: update.new_content,
            };
        }
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageEdited>('updateMessageEdited', (update) => {
    messageStores[update.chat_id].dispatch({
        type: 'REDUCE_MESSAGE',
        messageId: update.message_id,
        reduce: (message) => {
            return {
                ...message,
                edit_date: update.edit_date,
                reply_markup: update.reply_markup,
            };
        }
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageIsPinned>('updateMessageIsPinned', (update) => {
    messageStores[update.chat_id].dispatch({
        type: 'REDUCE_MESSAGE',
        messageId: update.message_id,
        reduce: (message) => {
            return {
                ...message,
                is_pinned: update.is_pinned,
            };
        }
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageInteractionInfo>('updateMessageInteractionInfo', (update) => {
    messageStores[update.chat_id].dispatch({
        type: 'REDUCE_MESSAGE',
        messageId: update.message_id,
        reduce: (message) => {
            return {
                ...message,
                interaction_info: update.interaction_info,
            };
        }
    });
});