import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction} from '../../ui/elements/ripple-effect';
import './radio-button.scss';

/**
 * Renders a round button with an icon in it, and a special ripple effect.
 */
export default function RadioButton(props) {
    const ripple= React.useState({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <button className="radio-button" {...{onMouseDown, onMouseUp, onMouseLeave}}>
            <input type="radio" {...props}/>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgOver)" small={true}/>
        </button>
    );
}
