import React from 'react';
import './section.scss';

/**
 * Renders a tool strip section. Use different sections when using separators.
 */
export default function Section(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    return <div className="tool-strip-section" {...props}/>;
}
// Too simple for a separate file, no?