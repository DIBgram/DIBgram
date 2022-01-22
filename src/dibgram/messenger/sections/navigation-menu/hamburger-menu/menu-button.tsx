import React from 'react';
import PropTypes from 'prop-types';
import IconButton, { IconButtonProps } from '../../../../ui/elements/icon-button';
import RippleEffect, {handleMyMouseEvents, RippleEffectProps_AutoSettable} from '../../../../ui/elements/ripple-effect';
import { dialogs_menu } from '../../../../ui/icon/icons';
import './menu-button.scss';

type WithFoldersProps = {
    /** Fires when the button is clicked */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type WithFoldersState = {
    ripple: RippleEffectProps_AutoSettable;
}

/**
 * Renders the button which opens the hamburger menu (when there are folders)
 */
class WithFolders extends React.PureComponent<WithFoldersProps, WithFoldersState> {
    static propTypes= {
        onClick: PropTypes.func,
    };
    state= {
        ripple: {
            state: 'off'
        }
    } as const;
    mouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
    mouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
    mouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
    constructor(props: WithFoldersProps | Readonly<WithFoldersProps>) {
        super(props);
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }
    render(): JSX.Element {
        return (
            <button id="hamburger-menu-button" className="uses-folders"
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}
                onClick={this.props.onClick}>
                <div id="bars"><span></span><span></span><span></span></div>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-sideBarBgRipple)"/>
            </button>
        );
    }
}

type WithoutFoldersProps= Pick<IconButtonProps, 'onClick'> & Partial<IconButtonProps>;

/**
 * Renders the button which opens the hamburger menu (when there are no folders)
 */
function WithoutFolders (props: WithoutFoldersProps): JSX.Element {
    return (
        <IconButton 
            icon={dialogs_menu}
            id="hamburger-menu-button"
            className="icon-button no-folders"
            {...props}/>
    );
}

const HamburgerMenuButton = {
    WithFolders,
    WithoutFolders
};

export default HamburgerMenuButton;