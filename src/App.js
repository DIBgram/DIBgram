import React from 'react';
import './App.css';
import {MainApp, setInitialAuthState} from './dibgram/auth/ui';
import TdLib from './dibgram/TdWeb/tdlib';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res['@type']);
});
function App() {
    return (
        <MainApp/>
    );
}

export default App;
