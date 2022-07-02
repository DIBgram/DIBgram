import { createStore, Store } from 'redux';
import TdLib from '../TdWeb/tdlib';
import TdApi from '../TdWeb/td_api';

export type UsersStoreState = {
    [id: number]: TdApi.user;
}

export type UsersStoreAction = {
    type: 'UPD_USER',
    user: TdApi.user;
} | {
    type: 'UPD_USER_STATUS',
    userId: number;
    status: TdApi.UserStatus;
}

const usersStore: Store<UsersStoreState, UsersStoreAction> = createStore<UsersStoreState, UsersStoreAction, any, any>((state = {}, action) => {
    switch (action.type) {
        case 'UPD_USER':
            return {
                ...state,
                [action.user.id]: action.user
            };
        case 'UPD_USER_STATUS':
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    status: action.status
                }
            };
        default:
            return state;
    }
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__?.());

TdLib.registerUpdateHandler<TdApi.updateUser>('updateUser', (update) => {
    usersStore.dispatch({
        type: 'UPD_USER',
        user: update.user
    });
});

TdLib.registerUpdateHandler<TdApi.updateUserStatus>('updateUserStatus', (update) => {
    usersStore.dispatch({
        type: 'UPD_USER_STATUS',
        userId: update.user_id,
        status: update.status
    });
});

export default usersStore;
