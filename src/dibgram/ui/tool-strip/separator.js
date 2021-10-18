import React from 'react';
import './separator.scss';

/**
 * Renders a tool strip button. Has an icon and children, if provided will align to the right.
 */
export default function ToolStripSeparator() {
    return (
        <div className="tool-strip-separator">
            <div className="up" />
            <div className="main" />
            <div className="down" /> {/* Used in Settings */}
        </div>
    );
}