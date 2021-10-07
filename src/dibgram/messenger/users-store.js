import { createStore } from 'redux';
import TdLib from '../TdWeb/tdlib';

const usersStore = createStore((state = {}, action) => {
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
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

TdLib.registerUpdateHandler('updateUser', (update) => {
    usersStore.dispatch({
        type: 'UPD_USER',
        user: update.user
    });
});

TdLib.registerUpdateHandler('updateUserStatus', (update) => {
    usersStore.dispatch({
        type: 'UPD_USER_STATUS',
        userId: update.user_id,
        status: update.status
    });
});

export default usersStore;
