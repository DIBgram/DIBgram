import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction} from '../elements/ripple-effect';
import './button.scss';

export default function ToolStripButton({icon, text, children, ...rest}) {
    const ripple = React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <div className="tool-strip-button" {...rest}
            onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                <div className="icon" dangerouslySetInnerHTML={{__html: icon}}></div> 
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
    children: PropTypes.node
};