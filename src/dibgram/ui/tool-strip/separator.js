import React from 'react';
import './separator.scss';

/**
 * Renders a tool strip button. Has an icon and children, if provided will align to the right.
 */
export default function ToolStripSeparator(props) {
    return (
        <div className="tool-strip-separator" {...props}/>
    );
}