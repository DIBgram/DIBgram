import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import './context-menu.scss';

/**
 * A context menu (right click menu)
 */
export function ContextMenu({x, y, children}) {
    const [direction, setDirection] = React.useState('br');
    const ref = React.useRef();
    React.useEffect(() => {
        setTimeout(() => {
            const rect = ref.current.children[0].getBoundingClientRect();
            const {width, height} = rect;
            const {clientWidth, clientHeight} = document.documentElement;
            var X = 'r', Y = 'b';
            if (x + width > clientWidth) {
                X = 'l';
            }
            if (y + height > clientHeight) {
                Y = 't';
            }
            setDirection(Y + X);
        }, 0);
    }, []);

    return (
        <div className="context-menu" style={{'--x': x+'px', '--y': y+'px'}}>
            <div className={'menu ' + direction} ref={ref}>
                {children}
            </div>
        </div>
    );
}
ContextMenu.propTypes = {
    /** Position relative to viewport */
    x: PropTypes.number.isRequired,
    /** Position relative to viewport */
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
