import React from 'react';
import ToolStripButton from './button';
import './toggle-button.scss';

type ToolStripToggleButtonProps = {
    /** HTML of the icon to display */
    icon?: string;
    /** Button text */
    text: React.ReactNode|React.ReactNode[];
    /** Callback when the button is toggled */
    onChange: (value: boolean) => void;
    /** the on/off state of the button */
    isActive: boolean;
    /** If true, does not show the icon. This removes the space allocated to the icon. */
    hideIcon?: boolean;

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default function ToolStripToggleButton({icon, text, onChange, isActive, ...rest}: ToolStripToggleButtonProps): JSX.Element {
    function toggle() {
        onChange(!isActive);
    }
    return (
        <ToolStripButton icon={icon} text={text} onClick={toggle} {...rest}>
            <input type="checkbox" className="toggle-button" checked={isActive} readOnly/>
        </ToolStripButton>
    );
}
