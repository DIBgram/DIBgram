import React from 'react';
import { Provider } from 'react-redux';
import {MainApp, setInitialAuthState} from './dibgram/auth/auth-screen';
import setInitialOnlineStatus from './dibgram/TdWeb/online-handler';
import TdLib from './dibgram/TdWeb/tdlib';
import ConfirmDialog from './dibgram/ui/dialog/confirm-dialog';
import {addDialog} from './dibgram/ui/dialog/dialogs';
import { toastStore, Toasts } from './dibgram/ui/dialog/toast';
import './dibgram/ui/main.scss';
import { ContextMenus, contextMenusStore } from './dibgram/ui/menu/context-menu';
import { ThemeProvider, themeStore } from './dibgram/ui/themes/theme';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
    setInitialOnlineStatus();
});

if(process.env.NODE_ENV== 'development') {
    window['sendQuery']= TdLib.sendQuery;
}

/**
 * Renders the whole React app
 */
function App() {
    React.useEffect(() => { // A fatal error occurred in TdLib
        TdLib.registerUpdateHandler('updateFatalError', window.simulateFatalError=  function (update) {
            console.error('Fatal error:', update.error);
            
            addDialog( 'tdlib_fatal_error',
                <ConfirmDialog 
                    width="400px" 
                    hideCancelButton={true} 
                    id="tdlib_fatal_error" 
                    thirdButton="Refresh"
                    onThirdButtonClick={window.location.reload.bind(window.location)}
                    thirdButtonClosesDialog={false}
                    title="Fatal Error">
                    
                    A fatal error occurred in TdLib.<br/> 
                    Try refreshing, clearing site data or opening 
                    DIBgram in a private window. <br/>
                    If none of these helped, report this to the developers 
                    by <a href="https://github.com/DIBgram/DIBgram/issues/new/choose" rel="noreferrer" target="_blank"
                        style={{color: 'var(--theme-color-windowActiveTextFg)'}}>filing an issue.</a>
                    <br/><br/>
                    <pre>{update.error.toString()}</pre>
                </ConfirmDialog>
            );
        });
    }, []);

    return (
        <Provider store={themeStore}>
            <ThemeProvider id="app">
                <Provider store={toastStore}>
                    <Toasts/>
                </Provider>
                <MainApp/>
                <Provider store={contextMenusStore}>
                    <ContextMenus/>
                </Provider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
