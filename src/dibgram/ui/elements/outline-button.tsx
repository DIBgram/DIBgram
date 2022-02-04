import React from 'react';
import './outline-button.scss';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from './ripple-effect';

type OutlineButtonProps= {
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
    children: React.ReactNode | React.ReactNode[],
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any,
}

export function OutlineButton({onClick, children, ...rest}: OutlineButtonProps): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents= handleMyMouseEventsFunction(ripple);
    return (
        <button className="outline-button" onClick={onClick} {...rippleEvents} {...rest}>
            <RippleEffect {...ripple[0]} color=""/>{/* TODO: Find the color */}
            <div className="content">{children}</div>
        </button>
    );
}