import {createStore} from 'redux';
import TdLib from '../TdWeb/tdlib';

function reducer(state, action) {
    switch (action.type) {
    case 'UPD_SUPERGROUP':
        return {
            ...state,
            [action.supergroup.id]: action.supergroup
        };
    default:
        return state;
    }
}

const supergroupStore= createStore(reducer);
export default supergroupStore;

TdLib.registerUpdateHandler('updateSupergroup', (update) => {
    supergroupStore.dispatch({
        type: 'UPD_SUPERGROUP',
        supergroup: update.supergroup
    });
});