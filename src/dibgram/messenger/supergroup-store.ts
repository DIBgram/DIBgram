import {createStore} from 'redux';
import TdLib from '../TdWeb/tdlib';
import TdApi from '../TdWeb/td_api';

export type SupergroupStoreState= {
    [id: number]: TdApi.td_supergroup;
}

export type SupergroupStoreAction= {
    type: 'UPD_SUPERGROUP',
    supergroup: TdApi.td_supergroup;
}

function reducer(state: SupergroupStoreState= {}, action: SupergroupStoreAction): SupergroupStoreState {
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

const supergroupStore= createStore<SupergroupStoreState, SupergroupStoreAction, any, any>(reducer);
export default supergroupStore;

TdLib.registerUpdateHandler<TdApi.td_updateSupergroup>('updateSupergroup', (update) => {
    supergroupStore.dispatch({
        type: 'UPD_SUPERGROUP',
        supergroup: update.supergroup
    });
});