import React from 'react';
import PropTypes from 'prop-types';
import './link-button.scss';

export default function LinkButton({href, children, onClick, ...rest}) {
    const click= href ? ()=> window.open(href) : onClick;
    return (
        <button className="link-button" onClick={click} {...rest}>{children}</button>
    );
}
LinkButton.propTypes = {
    /** Link content */
    children: PropTypes.node.isRequired,
    /** Function to be called when link is clicked. */
    onClick: PropTypes.func,
    /** If provided, the URL will be opened in a new tab on click. */
    href: PropTypes.string
};
