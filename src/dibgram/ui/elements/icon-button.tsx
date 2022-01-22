import React from 'react';
import RippleEffect, {handleMyMouseEventsFunction, RippleEffectProps_AutoSettable} from '../../ui/elements/ripple-effect';
import './icon-button.scss';

export type IconButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon: string;
}

/**
 * Renders a round button with an icon in it, and a special ripple effect.
 */
export default function IconButton({icon, ...rest}: IconButtonProps): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <button className="icon-button" {...rest} {...{onMouseDown, onMouseUp, onMouseLeave}}>
            <span dangerouslySetInnerHTML={{__html: icon}} />
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgOver)" small={true}/>
        </button>
    );
}