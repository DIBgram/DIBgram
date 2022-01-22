import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import './context-menu.scss';

type ContextMenuProps = {
    x: number;
    y: number;
    children: React.ReactNode | React.ReactNode[];
}

/**
 * A context menu (right click menu)
 */
export function ContextMenu({x, y, children}: ContextMenuProps): JSX.Element {
    const [direction, setDirection] = React.useState('br');
    const [hide, setHide] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    React.useEffect(() => {
        setTimeout(() => {
            if(!ref?.current) return;
            const rect = ref.current.children[0].getBoundingClientRect();
            const {width, height} = rect;
            const {clientWidth, clientHeight} = document.documentElement;
            let X = 'r', Y = 'b';
            if (x + width > clientWidth) {
                X = 'l';
            }
            if (y + height > clientHeight) {
                Y = 't';
            }
            setDirection(Y + X);
        }, 0);
    }, []);

    function handleMouseDown() {
        setHide(true);
        setTimeout(() => {
            contextMenusStore.dispatch({
                type: 'REMOVE_CONTEXT_MENUS'
            });
        }, 500);
    }

    return (
        <div className={'context-menu' + (hide? ' hidden' : '')} 
            style={{'--x': x+'px', '--y': y+'px'} as {[key: string]: string}}
            onMouseDown={e=> (!(e.target as HTMLElement).classList.contains('menu-item') && handleMouseDown())}
            onMouseUp={e=> (((e.target as HTMLElement).classList.contains('menu-item')) && handleMouseDown())}>

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

type ContextMenusStoreState = React.ReactElement|null;

type ContextMenusStoreAction_AddContextMenu = {
    type: 'ADD_CONTEXT_MENU';
    menu: React.ReactElement;
}
type ContextMenusStoreAction_RemoveContextMenus = {
    type: 'REMOVE_CONTEXT_MENUS';
}

type ContextMenusStoreAction = ContextMenusStoreAction_AddContextMenu | ContextMenusStoreAction_RemoveContextMenus;

export const contextMenusStore = createStore<ContextMenusStoreState, ContextMenusStoreAction, any, any>(function (state = null, action) {
    if (action.type === 'ADD_CONTEXT_MENU') {
        return action.menu;
    }
    else if (action.type === 'REMOVE_CONTEXT_MENUS') {
        return null;
    }
    return state;
});

export const ContextMenus= (connect(state=>({menus:state}))(({menus}) => menus)) as unknown as ()=> JSX.Element;

/**
 * Create a context menu
 * @param e Pass down `e` from the event handler
 * @param menu Context menu contents
 */
export function createContextMenu(e: React.MouseEvent, menu: React.ReactElement): void {
    e.preventDefault();
    setTimeout(() => { // This is to fix ripple effect glitch
        contextMenusStore.dispatch({
            type: 'ADD_CONTEXT_MENU',
            menu: <ContextMenu x={e.nativeEvent.pageX} y={e.nativeEvent.pageY}>{menu}</ContextMenu>
        });
    }, 50); // Human brain cannot notice 50ms delay
}
