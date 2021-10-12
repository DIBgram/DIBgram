import React from 'react';
import PropTypes from 'prop-types';
import './nav-animation.scss';

/**
 * Renders two navigation sections (outer and inner) with an animation between them
 * 
 * You need to set a background color to the outer section. (it has the CSS class 'nav-animation-outer')
 */
export default function NavAnimation({ children, innerScreen, className, innerClass, state, mode, ...props }) {
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
NavAnimation.propTypes = {
    children: PropTypes.node.isRequired,
    /**
     * The type of animation to use:
     * - `slide-over`: The parent screen swipes a little to left, while the child screen slides in from the right. 
     *   A shadow is also shown over the parent screen in the animation.
     * - `swipe-fade`: More subtle animation, the parent screen fades out while moving left, while at the same time the child screen fades in from the right.
     */
    mode: PropTypes.oneOf(['slide-over', 'swipe-fade']),
    /** The child screen content, only needed when open */
    innerScreen: PropTypes.node,
    /** The current state of the animation. Can be `open`, `closing` or `closed` */
    state: PropTypes.oneOf(['open', 'closing', 'closed']),
    /** The class name to apply to the outer element */
    className: PropTypes.string,
    /** The class name to apply to the inner element */
    innerClass: PropTypes.string
};

export function closeNavAnimation(getState, setState) {
    // First set state to closing, which triggers the closing animation. After that, we can delete the element.
    setState('closing');
    setTimeout(() => {
        if(getState() == 'closing') { // This condition is to prevent glitches when archive is opened again before 2s
            setState('closed');
        }
    }, 2000);
}
