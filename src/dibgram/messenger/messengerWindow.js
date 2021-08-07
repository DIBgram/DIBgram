import React from 'react';
import TdLib from '../TdWeb/tdlib';
import BigHighlightedButton from '../ui/elements/highlighted-button';
import ChatFoldersList from './ui/navigation-menu/chat-folders';
import ChatListBar from './ui/navigation-menu/chat-list-bar';
import chatFiltersStore from './chat-filters';
import { Provider } from 'react-redux';

/**
 * Renders the messenger screen
 */
export function MessengerWindow () {
    function logOut() {
        TdLib.sendQuery({
            '@type': 'logOut'
        });
    }
    return (
        <div id="messenger-screen">
            <Provider store={chatFiltersStore}>
                <ChatFoldersList/>
                <ChatListBar/>
            </Provider>
            <div id="chat-container">
                This is messenger window. You&apos;ve authenticated successfully!
                <BigHighlightedButton onClick={logOut}>Log out</BigHighlightedButton>
            </div>
        </div>
    );
}