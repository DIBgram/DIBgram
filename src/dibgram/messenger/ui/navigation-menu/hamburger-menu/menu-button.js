import React from 'react';
import RippleEffect, {handleMyMouseEvents} from '../../../../ui/elements/ripple-effect';
/**
 * Renders the button which opens the hamburger menu
 */
export default class HamburgerMenuButton extends React.Component {
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
            <button id="hamburger-menu-button"
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}>
                <div id="bars"><span></span><span></span><span></span></div>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-sideBarBgRipple)"/>
            </button>
        );
    }
}