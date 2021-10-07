import React from 'react';
import ChatFoldersList from './sections/navigation-menu/chat-folders';
import ChatListBar from './sections/navigation-menu/chat-list-bar';
import chatStore from './chat-store';
import { Provider } from 'react-redux';
import './messengerWindow.scss';
import HamburgerMenu from './sections/navigation-menu/hamburger-menu/menu';
import {Resizable} from 're-resizable';

/**
 * Renders the messenger screen
 */
export function MessengerWindow () {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div id="messenger-screen">
            <Provider store={chatStore}>
                <HamburgerMenu visible={isMenuOpen} onClose={()=> setIsMenuOpen(false)}/>
                <ChatFoldersList onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
                <Resizable defaultSize={{width: 260}} minWidth={260}
                    className="chat-list-bar-container" handleClasses={{right: 'chat-list-bar-resize-handle'}}
                    enable={{top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false}}>
                    <ChatListBar onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
                </Resizable>
            </Provider>
            <div id="chat-container">
                
            </div>
        </div>
    );
}