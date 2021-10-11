import supergroupStore from './supergroup-store';
import usersStore from './users-store';

/**
 * Check if the chat is with a deleted user
 * @param {import('tdweb').TdObject} chat The chat to check
 * @param {{[key: number]: import('tdweb').TdObject}} users A dictionary of all users (e.g. usersStore state)
 * @returns True if the chat is private and the other party's account is deleted
 */
export function isChatWithDeletedAccount(chat, users) {
    switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': // Groups are not applicable
    case 'chatTypeSupergroup':
        return false;
    
    case 'chatTypeSecret':
    case 'chatTypePrivate': 
        var user= (users || usersStore.getState())?.[chat.type.user_id];
        return user && user.type['@type'] === 'userTypeDeleted';
    }
    return false;
}

/**
 * Checks if a user, bot or channel is verified
 * @param {import('tdweb').TdObject} chat The chat to be checked
 * @returns {boolean} True if the chat is verified, false if not
 */
export function isChatVerified(chat){
    switch (chat.type['@type']) {
    case 'chatTypeBasicGroup':
        return false;

    case 'chatTypeSupergroup':
        var supergroup= supergroupStore.getState()?.[chat.type.supergroup_id];
        return supergroup.is_verified;
        
    case 'chatTypeSecret':
    case 'chatTypePrivate': 
        var user= usersStore.getState()?.[chat.type.user_id];
        return user.is_verified;
    }
    return false;
}