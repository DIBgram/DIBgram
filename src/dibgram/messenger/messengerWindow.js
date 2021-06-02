import React from 'react';
import TdLib from '../TdWeb/tdlib';
import BigHighlightedButton from '../ui/elements/highlighted-button';
import NavigationMenu from './ui/navigation-menu/navigation-menu';

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
            <NavigationMenu/>
            <div id="chat-container">
                This is messenger window. You&apos;ve authenticated successfully!
                <BigHighlightedButton onClick={logOut}>Log out</BigHighlightedButton>
            </div>
        </div>
    );
}