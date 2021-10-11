import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../../ui/elements/icon-button';
import RippleEffect, {handleMyMouseEvents} from '../../../../ui/elements/ripple-effect';
import { dialogs_menu } from '../../../../ui/icon/icons';
import './menu-button.scss';

var HamburgerMenuButton= {}; // Store component classes here

/**
 * Renders the button which opens the hamburger menu (when there are folders)
 */
HamburgerMenuButton.WithFolders= class WithFolders extends React.PureComponent {
    static propTypes= {
        onClick: PropTypes.func,
    };
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor() {
        super();
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this); // Ripple effect events
    }
    render() {
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
};

/**
 * Renders the button which opens the hamburger menu (when there are no folders)
 */
HamburgerMenuButton.WithoutFolders= function WithoutFolders (props) {
    return (
        <IconButton 
            icon={dialogs_menu}
            id="hamburger-menu-button"
            className="icon-button no-folders"
            {...props}/>
    );
};

export default HamburgerMenuButton;