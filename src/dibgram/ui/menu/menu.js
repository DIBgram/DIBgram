import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';

/**
 * A dropdown menu (not to be confused with <select>).
 */
export default function Menu(props) {
    return (
        <div className="menu" {...props}/>
    );
}

/**
 * Dropdown menu contents (created as a separate component so that it can be wrapped by other components).
 */
Menu.MenuContents= function MenuContents(props) {
    return (
        <div className="menu-contents" {...props}/>
    );
};

/**
 * A menu item.
 */
Menu.MenuItem= function MenuItem({children, ...rest}) {
    return (
        <div className="menu-item" {...rest}>
            {children}
        </div>
    );
};
Menu.MenuItem.propTypes = {
    children: PropTypes.node
};