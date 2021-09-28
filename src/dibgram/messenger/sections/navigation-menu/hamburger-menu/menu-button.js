import React from 'react';
import IconButton from '../../../../ui/elements/icon-button';
import RippleEffect, {handleMyMouseEvents} from '../../../../ui/elements/ripple-effect';
import { dialogs_menu } from '../../../../ui/icon/icons';
import './menu-button.scss';

var HamburgerMenuButton= {};

/**
 * Renders the button which opens the hamburger menu
 */
HamburgerMenuButton.WithFolders= class WithFolders extends React.Component {
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor() {
        super();
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }
    render() {
        return (
            <button id="hamburger-menu-button" className="uses-folders"
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}>
                <div id="bars"><span></span><span></span><span></span></div>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-sideBarBgRipple)"/>
            </button>
        );
    }
};

/**
 * Renders the button which opens the hamburger menu
 */
HamburgerMenuButton.WithoutFolders= function WithoutFolders () {
    return (
        <IconButton 
            icon={dialogs_menu}
            id="hamburger-menu-button"
            className="icon-button no-folders"/>
    );
};

export default HamburgerMenuButton;