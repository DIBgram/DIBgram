import { createStore } from 'redux';
import TdLib from './tdlib';
import TdApi from './td_api';

type ConnectionStoreAction_SetConnection= {
    type: 'SET_CONNECTION',
    connection: 'connectionStateWaitingForNetwork' | 'connectionStateConnectingToProxy' | 'connectionStateConnecting' | 'connectionStateUpdating' | 'connectionStateReady'
}
type ConnectionStoreAction= ConnectionStoreAction_SetConnection;

export type ConnectionStoreState = 'connectionStateWaitingForNetwork' | 'connectionStateConnectingToProxy' | 'connectionStateConnecting' | 'connectionStateUpdating' | 'connectionStateReady';

const connectionStore = createStore<ConnectionStoreState, ConnectionStoreAction, any, any>(
    (state = 'connectionStateConnecting', action) => {
        switch (action.type) {
            case 'SET_CONNECTION':
                return  action.connection;
            default:
                return state;
        }
    }
);

TdLib.registerUpdateHandler<TdApi.updateConnectionState>('updateConnectionState', (update) => {
    connectionStore.dispatch({
        type: 'SET_CONNECTION',
        connection: update.state['@type']
    });
});
export default connectionStore;