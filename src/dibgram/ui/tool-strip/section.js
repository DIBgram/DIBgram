import React from 'react';
import './section.scss';

/**
 * Renders a tool strip section. Use different sections when using separators.
 */
export default function Section(props) {
    return <div className="tool-strip-section" {...props}/>;
}
// Too simple for a separate file, no?