import React from 'react';
import TdLib from '../TdWeb/tdlib';
import BigHighlightedButton from '../ui/elements/highlighted-button';

export function MessengerWindow () {
    function logOut() {
        TdLib.sendQuery({
            '@type': 'logOut'
        });
    }
    return (
        <div>
            This is messenger window. You&apos;ve authenticated successfully!
            <BigHighlightedButton onClick={logOut}>Log out</BigHighlightedButton>
        </div>
    );
}