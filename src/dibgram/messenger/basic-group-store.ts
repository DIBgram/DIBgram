import {createStore, Store} from 'redux';
import TdLib from '../TdWeb/tdlib';
import TdApi from '../TdWeb/td_api';

export type BasicGroupStoreState = {
    [id: number]: TdApi.td_basicGroup
}

export type BasicGroupStoreAction = {
    type: 'UPD_BASIC_GROUP',
    basic_group: TdApi.td_basicGroup
}

function reducer(state: BasicGroupStoreState = {}, action: BasicGroupStoreAction): BasicGroupStoreState {
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

const basicGroupStore= createStore<BasicGroupStoreState, BasicGroupStoreAction, any, any>(reducer) as Store<BasicGroupStoreState, BasicGroupStoreAction>;
export default basicGroupStore;

TdLib.registerUpdateHandler<TdApi.td_updateBasicGroup>('updateBasicGroup', (update) => {
    basicGroupStore.dispatch({
        type: 'UPD_BASIC_GROUP',
        basic_group: update.basic_group
    });
});