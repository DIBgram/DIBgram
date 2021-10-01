import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';

export default function HamburgerMenu ({visible, onClose}) {
    return (
        <div id="hamburger-menu" className={visible ? 'visible' : ''}>
            <div className="content"></div>
            <div className="shadow" onClick={onClose}></div>
        </div>
    );
}
HamburgerMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func
};