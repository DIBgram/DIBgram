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

export type Menu_MenuitemProps = {
    icon?: string,
}

/**
 * A menu item.
 */
Menu.MenuItem= function MenuItem({children, icon, ...rest}: Menu_MenuitemProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents = handleMyMouseEventsFunction(ripple);
    return (
        <div className="menu-item" {...rest} {...rippleEvents}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            {icon ? 
                <div className="content has-icon">
                    <div className="icon" dangerouslySetInnerHTML={{__html: icon}}/>
                    <span>{children}</span>
                </div>
                :
                <div className="content">
                    {children}
                </div>
            }   
        </div>
    );
};
