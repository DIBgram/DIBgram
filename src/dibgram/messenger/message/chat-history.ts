import TdLib from '../../TdWeb/tdlib';
import TdApi from '../../TdWeb/td_api';
import { messageStore } from '../message-store';
import chatStore from '../chat-store';

export function loadChatHistory(chatId: number, fromMessageId = 0, limit= 100): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        TdLib.sendQuery({
            '@type': 'getChatHistory',
            chat_id: chatId,
            from_message_id: fromMessageId,
            limit: limit
        }).then((result) => {
            result= result as TdApi.td_messages;
            if(chatId !== chatStore.getState().selectedChat) {
                resolve(-1);
                return;
            }

            if(result.messages) {
                messageStore.dispatch({
                    type: 'ADD_MESSAGES',
                    messages: result.messages
                });
            }
            resolve(result.total_count);
        }, reject);
    });
}

TdLib.registerUpdateHandler<TdApi.td_updateNewMessage>('updateNewMessage', (update) => {
    if(update.message.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
        type: 'ADD_MESSAGE',
        message: update.message,
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageSendSucceeded>('updateMessageSendSucceeded', (update) => {
    if(update.message.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
        type: 'REMOVE_MESSAGES',
        messageIds: [update.old_message_id],
    });
    messageStore.dispatch({
        type: 'ADD_MESSAGE',
        message: update.message,
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateDeleteMessages>('updateDeleteMessages', (update) => {
    if(update.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
        type: 'REMOVE_MESSAGES',
        messageIds: update.message_ids,
    });
});
TdLib.registerUpdateHandler<TdApi.td_updateMessageContent>('updateMessageContent', (update) => {
    if(update.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
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
    if(update.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
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
    if(update.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
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
    if(update.chat_id !== chatStore.getState().selectedChat) return;
    messageStore.dispatch({
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