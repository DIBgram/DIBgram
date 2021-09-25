import React from 'react';
import PropTypes from 'prop-types';
import './link-button.scss';

export default function LinkButton({children, onClick}) {
    return (
        <button className="link-button" onClick={onClick}>{children}</button>
    );
}
LinkButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};
