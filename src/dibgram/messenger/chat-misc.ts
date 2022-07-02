import __ from '../language-pack/language-pack';
import TdApi from '../TdWeb/td_api';
import supergroupStore from './supergroup-store';
import usersStore, { UsersStoreState } from './users-store';

/**
 * Check if the chat is with a deleted user
 * @param chat The chat to check
 * @param users A dictionary of all users (e.g. usersStore state)
 * @returns True if the chat is private and the other party's account is deleted
 */
export function isChatWithDeletedAccount(chat: TdApi.chat, users: UsersStoreState|undefined= undefined): boolean {
    switch (chat.type['@type']) {
        case 'chatTypeBasicGroup': // Groups are not applicable
        case 'chatTypeSupergroup':
            return false;
        
        case 'chatTypeSecret':
        case 'chatTypePrivate': {
            const user= (users || usersStore.getState())?.[chat.type.user_id];
            return user && user.type['@type'] === 'userTypeDeleted';
        }
    }
    return false;
}

/**
 * Returns the chat's title and handles deleted account
 * @param chat The chat to get the name of
 * @param users A list of all users (e.g. usersStore state). If not provided, usersStore will be used
 * @returns Chat title, or 'Deleted Account'
 */
export function chatTitleOrDeletedAccount(chat: TdApi.chat, users: UsersStoreState|undefined= undefined): string {
    if(isChatWithDeletedAccount(chat, users))
        return __('lng_deleted') as string;
    return chat.title;
}

/**
 * Checks if a user, bot or channel is verified
 * @param {import('tdweb').TdObject} chat The chat to be checked
 * @returns {boolean} True if the chat is verified, false if not
 */
export function isChatVerified(chat: TdApi.chat): boolean {
    switch (chat.type['@type']) {
        case 'chatTypeBasicGroup':
            return false;

        case 'chatTypeSupergroup': {
            return (supergroupStore.getState()?.[chat.type.supergroup_id]).is_verified;
        }
        case 'chatTypeSecret':
        case 'chatTypePrivate': 
            return (usersStore.getState()?.[chat.type.user_id]).is_verified;
    }
    return false;
}