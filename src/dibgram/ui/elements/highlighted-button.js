import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a BIG button which is filled with accent color
 */
export default function BigHighlightedButton (props) {
    return (
        <button className="big-highlighted-button" onClick={props.onClick}>
            {props.children}
        </button>
    );
}
BigHighlightedButton.propTypes= {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};