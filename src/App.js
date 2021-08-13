import React from 'react';
import ReactDOM from 'react-dom';
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

TdLib.registerUpdateHandler('updateFatalError', function (update) {
    console.error('Fatal error:', update.error);
    ReactDOM.render((
        <div>
            <h1>Fatal error</h1>
            A fatal error occurred in TdLib.<br/> 
            Try <a href="#" onClick={()=>location.reload()}>refreshing</a>, clearing site data or opening 
            DIBgram in a private window. <br/>
            If none of these helped, report this to the developers by <a href="https://github.com/DIBgram/DIBgram/issues/new/choose">filing an issue.</a>
            <br/><br/>
            <pre>{update.error.toString()}</pre>
            <CurrentThemeCSS/>
        </div>
    ),document.getElementById('root'));
});