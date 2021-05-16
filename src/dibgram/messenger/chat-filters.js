import { createStore } from 'redux';
import TdLib from '../TdWeb/tdlib';

const chatFiltersStore= createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// eslint-disable-next-line no-unused-vars
function reducer(state= [], action) {
    if(action.type=='REPLACE_CHAT_FILTERS') {
        return action.payload;
    }
}

function onUpdateChatFilters(update) {
    if(update.chat_filters) {
        chatFiltersStore.dispatch({
            type: 'REPLACE_CHAT_FILTERS',
            payload: update.chat_filters
        });
    }
}
TdLib.registerUpdateHandler('updateChatFilters',onUpdateChatFilters);

export default chatFiltersStore;