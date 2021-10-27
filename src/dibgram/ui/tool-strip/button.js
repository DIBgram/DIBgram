import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction} from '../elements/ripple-effect';
import './button.scss';

/**
 * Renders a tool strip button. Has an icon and children, if provided will align to the right.
 */
export default function ToolStripButton({icon, text, children, hideIcon, ...rest}) {
    const ripple = React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <div className="tool-strip-button" {...rest}
            onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                {(!hideIcon) && <div className="icon" dangerouslySetInnerHTML={{__html: icon}}></div>} 
                <div className="title">{text}</div>
                {children && (
                    <div className="right">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
ToolStripButton.propTypes = {
    /** Icon HTML */
    icon: PropTypes.string,
    /** Button text */
    text: PropTypes.string,
    /** Optionally, an element to show aligned to right */
    children: PropTypes.node,
    /** If true, does not show the icon. This removes the space allocated to the icon. */
    hideIcon: PropTypes.bool
};