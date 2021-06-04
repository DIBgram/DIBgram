import React from 'react';
import { connect, Provider } from 'react-redux';
import ConnectionState from '../../../ui/components/connecting';
import chatFiltersStore from '../../chat-filters';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import ChatFolderList from './chat-folders';


const NavMenu = connect(function (state) {
    return {useFolders: (state||[]).length!=0};
})(function NavMenu(props) {
    if(props.useFolders) {
        return (
            <div id="navigation-menu" className="uses-folders">
                <div id="chat-folders-list">
                    <HamburgerMenuButton/>
                    <ChatFolderList/>
                </div>
                <div id="chat-list-container">
                    <ConnectionState/>
                </div>
            </div>
        );
    } else {
        return (
            <div id="navigation-menu">

            </div>
        );
    }
});

/**
 * Return Renders the navigation menu, containing chat list, search field and search results, chat folders and the hamburger menu
 */
export default function NavigationMenu() {
    return (
        <Provider store={chatFiltersStore}>
            <NavMenu/>
        </Provider>
    );
}