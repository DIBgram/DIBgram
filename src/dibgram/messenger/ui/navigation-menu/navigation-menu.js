import React from 'react';
import { connect, Provider } from 'react-redux';
import chatFiltersStore from '../../chat-filters';
import ChatFolderList from './chat-folders';


const NavMenu = connect(function (state) {
    return {useFolders: (state||[]).length!=0};
})(function NavMenu(props) {
    if(props.useFolders) {
        return (
            <div id="navigation-menu" className="uses-folders">
                <ChatFolderList/>
                <div id="chat-list-container">
                    
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

export default function NavigationMenu() {
    return (
        <Provider store={chatFiltersStore}>
            <NavMenu/>
        </Provider>
    );
}