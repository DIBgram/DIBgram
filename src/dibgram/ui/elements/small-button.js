import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEvents} from './ripple-effect';

/**
 * Renders a small button with accent color
 */
export default class SmallButton extends React.Component {
    static propTypes= {
        /** The button's content */
        children: PropTypes.node.isRequired,
        /** Fires when the button is clicked */
        onClick: PropTypes.func
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
    render() {
        return (
            <button 
                className="small-button" 
                onClick={this.props.onClick}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}>

                <RippleEffect {...this.state.ripple} color="var(--theme-color-lightButtonBgRipple)"/>

                <div className="invisibleText">
                    {this.props.children}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                
            </button>
        );
    }
}