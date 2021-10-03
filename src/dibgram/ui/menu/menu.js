import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';

export default function Menu(props) {
    return (
        <div className="menu" {...props}/>
    );
}

Menu.MenuContents= function MenuContents(props) {
    return (
        <div className="menu-contents" {...props}/>
    );
};

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