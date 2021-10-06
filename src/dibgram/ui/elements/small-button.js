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
        onClick: PropTypes.func,
        /** Setting to true causes the button to become red */
        attention: PropTypes.bool
    };
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor(props) {
        super(props);
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
        var {children, ...rest}= props;
        [this.children, this.rest]= [children, rest];
    }
    render() {
        return (
            <button 
                className="small-button" 
                data-attention={this.props.attention? 'true': 'false'}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseLeave={this.mouseLeave}
                {...this.rest}>

                <RippleEffect {...this.state.ripple} color="var(--theme-color-lightButtonBgRipple)"/>

                <div className="invisibleText">
                    {this.children}
                </div>
                <div className="content">
                    {this.children}
                </div>
                
            </button>
        );
    }
}