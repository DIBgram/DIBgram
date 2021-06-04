import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a small button with accent color
 */
export default function SmallButton(props) {
    return (
        <button className="small-button">
            {props.children}
        </button>
    );
}
SmallButton.propTypes= {
    children: PropTypes.node.isRequired
};