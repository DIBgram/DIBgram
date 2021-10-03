import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import Menu from './menu';
import { connect } from 'react-redux';

export function ContextMenu({x, y, children}) {
    return (
        <div className="context-menu" style={{'--x': x+'px', '--y': y+'px'}}>
            <Menu>
                {children}
            </Menu>
        </div>
    );
}
ContextMenu.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
};

export const contextMenusStore = createStore(function (state = null, action) {
    if (action.type === 'ADD_CONTEXT_MENU') {
        return action.menu;
    }
    else if (action.type === 'REMOVE_CONTEXT_MENUS') {
        return null;
    }
    return state;
});

export const ContextMenus= connect(state=>({menus:state}))(({menus}) => menus);

/**
 * Create a context menu
 * @param {React.SyntheticEvent} e Pass down `e` from the event handler
 * @param {React.ReactNode} menu Context menu contents
 */
export function createContextMenu(e, menu) {
    e.preventDefault();
    setTimeout(() => { // This is to fix ripple effect glitch
        contextMenusStore.dispatch({
            type: 'ADD_CONTEXT_MENU',
            menu: <ContextMenu x={e.nativeEvent.pageX} y={e.nativeEvent.pageY}>{menu}</ContextMenu>
        });
    }, 50); // Human brain cannot notice 50ms delay
}

export function onAnywhereClicked() {
    contextMenusStore.dispatch({
        type: 'REMOVE_CONTEXT_MENUS'
    });
}
