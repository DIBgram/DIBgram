import { createStore } from 'redux';
import TdLib from './tdlib';

const connectionStore = createStore(
    (state = 'connectionStateConnecting', action) => {
        switch (action.type) {
        case 'SET_CONNECTION':
            return  action.connection;
        default:
            return state;
        }
    }
);

TdLib.registerUpdateHandler('updateConnectionState', (update) => {
    connectionStore.dispatch({
        type: 'SET_CONNECTION',
        connection: update.state['@type']
    });
});
export default connectionStore;