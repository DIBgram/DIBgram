import React from 'react';
import TdLib from '../TdWeb/tdlib';
import BigHighlightedButton from '../ui/elements/highlighted-button';
import ChatFoldersList from './sections/navigation-menu/chat-folders';
import ChatListBar from './sections/navigation-menu/chat-list-bar';
import chatStore from './chat-store';
import { Provider } from 'react-redux';
import './messengerWindow.scss';

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
            <Provider store={chatStore}>
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