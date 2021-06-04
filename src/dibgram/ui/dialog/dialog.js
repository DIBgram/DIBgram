import React from 'react';
import PropTypes from 'prop-types';
/**
 * Renders a modal dialog
 */
export default function Dialog(props) {
    return (
        <div className="modal-dialog">
            <div style={{
                'width': props.width || 'auto'
            }}>
                {props.children}
            </div>
        </div>
    );
}
Dialog.propTypes= {
    children: PropTypes.node.isRequired,
    width: PropTypes.string
};
