import React from 'react';
import { Provider } from 'react-redux';
import {MainApp, setInitialAuthState} from './dibgram/auth/ui';
import TdLib from './dibgram/TdWeb/tdlib';
import Dialogs, {dialogStore} from './dibgram/ui/dialog/dialogs';
import './dibgram/ui/main.scss';
import CurrentThemeCSS, {isThemeDark} from './dibgram/ui/themes/theme';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
});

/**
 * Renders the whole React app
 */
function App() {
    return (
        <div data-theme-is-dark={isThemeDark} id="app">
            <Provider store={dialogStore}>
                <Dialogs/>
            </Provider>
            <MainApp/>
            <CurrentThemeCSS/>
        </div>
    );
}

export default App;
