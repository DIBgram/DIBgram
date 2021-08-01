import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEvents} from './ripple-effect';

/**
 * Renders a BIG button which is filled with accent color
 */
export default class BigHighlightedButton extends React.Component{
    static propTypes= {
        /** Fires when the button is clicked */
        onClick: PropTypes.func,
        /** The button's content */
        children: PropTypes.node.isRequired
    };
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor() {
        super();
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }

    render () {
        return (
            <button 
                className="big-highlighted-button" 
                onClick={this.props.onClick}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}>

                <RippleEffect {...this.state.ripple} color="var(--theme-color-activeButtonBgRipple)"/>
                <div className="content">
                    {this.props.children}
                </div>
            </button>
        );
    }
}