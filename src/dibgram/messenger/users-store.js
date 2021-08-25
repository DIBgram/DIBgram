import { createStore } from 'redux';
import TdLib from '../TdWeb/tdlib';

const usersStore = createStore((state = {}, action) => {
    switch (action.type) {
    case 'UPD_USER':
        return {
            ...state,
            [action.user.id]: action.user
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

export default usersStore;
