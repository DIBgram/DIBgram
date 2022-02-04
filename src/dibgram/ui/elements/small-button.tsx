import React from 'react';
import RippleEffect, {handleMyMouseEventsFunction, RippleEffectProps_AutoSettable} from './ripple-effect';

type SmallButtonProps= {
    /** The button's content */
    children: React.ReactNode;
    /** Fires when the button is clicked */
    onClick?: () => void;
    /** Setting to true causes the button to become red */
    attention?: boolean;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

/**
 * Renders a small button with accent color
 */
export default function SmallButton ({children, attention, ...rest}: SmallButtonProps): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents= handleMyMouseEventsFunction(ripple);
    return (
        <button 
            className="small-button" 
            data-attention={attention? 'true': 'false'}
            {...rippleEvents}
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
