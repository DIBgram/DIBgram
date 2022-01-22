import React from 'react';
import './nav-animation.scss';

type NavAnimationProps = {
    children?: React.ReactNode | React.ReactNode[],
    /** The child screen content, only needed when open */
    innerScreen?: React.ReactNode | React.ReactNode[],
    /** The class name to apply to the outer element */
    className?: string,
    /** The class name to apply to the inner element */
    innerClass?: string,
    /** The current state of the animation. Can be `open`, `closing` or `closed` */
    state: 'open' | 'closing' | 'closed',
    /**
     * The type of animation to use:
     * - `slide-over`: The parent screen swipes a little to left, while the child screen slides in from the right. 
     *   A shadow is also shown over the parent screen in the animation.
     * - `swipe-fade`: More subtle animation, the parent screen fades out while moving left, while at the same time the child screen fades in from the right.
     */
    mode: 'slide-over' | 'swipe-fade',

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any,
}

/**
 * Renders two navigation sections (outer and inner) with an animation between them
 * 
 * You need to set a background color to the outer section. (it has the CSS class 'nav-animation-outer')
 */
export default function NavAnimation({ children, innerScreen, className, innerClass, state, mode, ...props }: NavAnimationProps): JSX.Element {
    return (
        <div className={'nav-animation ' + mode + ' ' + state + ' ' + className} {...props}>
            <div className="outer">
                {children}
            </div>
            {state!='closed' && 
                <div className={'inner ' + innerClass}>
                    {innerScreen}
                </div>
            }
        </div>
    );
}

export function closeNavAnimation(getState: (()=>'open'|'closing'|'closed'), setState: (state: 'closed'|'closing') => void): void {
    // First set state to closing, which triggers the closing animation. After that, we can delete the element.
    setState('closing');
    setTimeout(() => {
        if(getState() == 'closing') { // This condition is to prevent glitches when archive is opened again before 2s
            setState('closed');
        }
    }, 2000);
}
