import React from 'react';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../../../../ui/elements/ripple-effect';
import './compose-button.scss';

type ComposeButtonProps = {
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
};

export default function ComposeButton({ onClick, children, ...rest }: ComposeButtonProps): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents= handleMyMouseEventsFunction(ripple);
    return (
        <button className="compose-button" onClick={onClick} {...rippleEvents} {...rest}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-historyComposeButtonBgRipple)"/>
            <div className="content">{children}</div>
        </button>
    );
}