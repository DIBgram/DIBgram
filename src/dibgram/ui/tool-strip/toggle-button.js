import React from 'react';
import PropTypes from 'prop-types';
import ToolStripButton from './button';
import './toggle-button.scss';

export default function ToolStripToggleButton({icon, text, onChange, isActive, ...rest}) {
    function toggle() {
        onChange(!isActive);
    }
    return (
        <ToolStripButton icon={icon} text={text} onClick={toggle} {...rest}>
            <input type="checkbox" className="toggle-button" checked={isActive} readOnly/>
        </ToolStripButton>
    );
}
ToolStripToggleButton.propTypes = {
    /** HTML of the icon to display */
    icon: PropTypes.string,
    /** Button text */
    text: PropTypes.string,
    /** Callback when the button is toggled */
    onChange: PropTypes.func,
    /** the on/off state of the button */
    isActive: PropTypes.bool
};
