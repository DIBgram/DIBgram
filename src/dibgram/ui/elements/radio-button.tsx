import React from 'react';
import RippleEffect, {handleMyMouseEventsFunction, RippleEffectProps_AutoSettable} from '../../ui/elements/ripple-effect';
import './radio-button.scss';

/**
 * Renders a round button with an icon in it, and a special ripple effect.
 */
export default function RadioButton(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <button className="radio-button" {...{onMouseDown, onMouseUp, onMouseLeave}}>
            <input type="radio" {...props}/>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgOver)" small={true}/>
        </button>
    );
}
