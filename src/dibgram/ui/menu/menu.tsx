import React from 'react';
import './menu.scss';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../elements/ripple-effect';

/**
 * A dropdown menu (not to be confused with `<select>`).
 */
export default function Menu(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    return (
        <div className="menu" {...props}/>
    );
}

/**
 * Dropdown menu contents (created as a separate component so that it can be wrapped by other components).
 */
Menu.MenuContents= function MenuContents(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    return (
        <div className="menu-contents" {...props}/>
    );
};

/**
 * A menu item.
 */
Menu.MenuItem= function MenuItem({children, ...rest}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave] = handleMyMouseEventsFunction(ripple);
    return (
        <div className="menu-item" {...rest} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                {children}
            </div>
        </div>
    );
};
