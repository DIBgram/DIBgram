import React from 'react';
import { Provider } from 'react-redux';
import {MainApp, setInitialAuthState} from './dibgram/auth/ui';
import TdLib from './dibgram/TdWeb/tdlib';
import Dialogs, {dialogStore} from './dibgram/ui/dialog/dialogs';
import './dibgram/ui/main.scss';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
});

/**
 * Renders the whole React app
 */
function App() {
    return (
        <div data-theme="classic" id="app">
            <Provider store={dialogStore}>
                <Dialogs/>
            </Provider>
            <MainApp/>
        </div>
    );
}

export default App;
