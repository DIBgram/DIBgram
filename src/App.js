import React from 'react';
import { Provider } from 'react-redux';
import {MainApp, setInitialAuthState} from './dibgram/auth/auth-screen';
import TdLib from './dibgram/TdWeb/tdlib';
import ConfirmDialog from './dibgram/ui/dialog/confirm-dialog';
import Dialogs, {dialogStore, addDialog} from './dibgram/ui/dialog/dialogs';
import './dibgram/ui/main.scss';
import { ContextMenus, contextMenusStore, onAnywhereClicked } from './dibgram/ui/menu/context-menu';
import { ThemeProvider } from './dibgram/ui/themes/theme';

TdLib.initializeTdLib().then(function (res) {
    setInitialAuthState(res);
});

/**
 * Renders the whole React app
 */
function App() {
    React.useEffect(() => {
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
        <ThemeProvider id="app" onClick={onAnywhereClicked}>
            <Provider store={dialogStore}>
                <Dialogs/>
            </Provider>
            <MainApp/>
            <Provider store={contextMenusStore}>
                <ContextMenus/>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
