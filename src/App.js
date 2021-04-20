import React from 'react';
import {MainApp, setInitialAuthState} from './dibgram/auth/ui';
import TdLib from './dibgram/TdWeb/tdlib';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
});
function App() {
    return (
        <MainApp/>
    );
}

export default App;
