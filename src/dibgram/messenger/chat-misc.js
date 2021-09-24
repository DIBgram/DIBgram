import usersStore from './users-store';

export function isChatWithDeletedAccount(chat) {
    switch (chat.type['@type']) {
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup':
        return false;
    
    case 'chatTypeSecret':
    case 'chatTypePrivate': 
        var user= usersStore.getState()?.[chat.type.user_id];
        return user && user.type['@type'] === 'userTypeDeleted';
    }
    return false;
}