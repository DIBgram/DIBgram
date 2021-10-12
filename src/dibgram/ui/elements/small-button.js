import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction} from './ripple-effect';

/**
 * Renders a small button with accent color
 */
export default function SmallButton ({children, attention, ...rest}) {
    const ripple= React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <button 
            className="small-button" 
            data-attention={attention? 'true': 'false'}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseLeave={mouseLeave}
            {...rest}>

            <RippleEffect {...ripple[0]} color="var(--theme-color-lightButtonBgRipple)"/>

            {/* Because we use absolute positioning on the actual content, we need a copy of it without absolute position to get the correct parent size. */}
            <div className="invisibleText">
                {children}
            </div>

            <div className="content">
                {children}
            </div>
            
        </button>
    );
}
SmallButton.propTypes= {
    /** The button's content */
    children: PropTypes.node.isRequired,
    /** Fires when the button is clicked */
    onClick: PropTypes.func,
    /** Setting to true causes the button to become red */
    attention: PropTypes.bool
};