import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction, RippleEffectProps_AutoSettable} from '../elements/ripple-effect';
import './button.scss';

type ToolStripButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: React.ReactNode | React.ReactNode[];
    icon?: string;
    text: React.ReactNode|React.ReactNode[];
    hideIcon?: boolean;
}

/**
 * Renders a tool strip button. Has an icon and children, if provided will align to the right.
 */
export default function ToolStripButton({icon, text, children, hideIcon, ...rest}: ToolStripButtonProps): JSX.Element {
    const ripple = React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents= handleMyMouseEventsFunction(ripple);
    return (
        <div className="tool-strip-button" {...rest} {...rippleEvents}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                {(!hideIcon) && <div className="icon" dangerouslySetInnerHTML={{__html: icon || ''}}></div>} 
                <div className="title">{text}</div>
                {children && (
                    <div className="right">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
ToolStripButton.propTypes = {
    /** Icon HTML */
    icon: PropTypes.string,
    /** Button text */
    text: PropTypes.string,
    /** Optionally, an element to show aligned to right */
    children: PropTypes.node,
    /** If true, does not show the icon. This removes the space allocated to the icon. */
    hideIcon: PropTypes.bool
};