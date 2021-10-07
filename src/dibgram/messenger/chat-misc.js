import supergroupStore from './supergroup-store';
import usersStore from './users-store';

export function isChatWithDeletedAccount(chat, users) {
    switch (chat.type['@type']) {
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup':
        return false;
    
    case 'chatTypeSecret':
    case 'chatTypePrivate': 
        var user= (users || usersStore.getState())?.[chat.type.user_id];
        return user && user.type['@type'] === 'userTypeDeleted';
    }
    return false;
}

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