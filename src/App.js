import React from 'react';
import {MainApp, setInitialAuthState} from './dibgram/auth/ui';
import TdLib from './dibgram/TdWeb/tdlib';
import './dibgram/ui/main.scss';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
});
function App() {
    return (
        <div data-theme="classic" id="app">
            <MainApp/>
        </div>
    );
}

export default App;
