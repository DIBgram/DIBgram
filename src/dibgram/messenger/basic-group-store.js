import {createStore} from 'redux';
import TdLib from '../TdWeb/tdlib';

function reducer(state, action) {
    switch (action.type) {
    case 'UPD_BASIC_GROUP':
        return {
            ...state,
            [action.basic_group.id]: action.basic_group
        };
    default:
        return state;
    }
}

const basicGroupStore= createStore(reducer);
export default basicGroupStore;

TdLib.registerUpdateHandler('updateBasicGroup', (update) => {
    basicGroupStore.dispatch({
        type: 'UPD_BASIC_GROUP',
        basic_group: update.basic_group
    });
});