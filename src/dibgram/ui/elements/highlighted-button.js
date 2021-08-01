import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect from './ripple-effect';

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
    /**@param e {React.SyntheticEvent} */
    mouseDown= (e) => {
        this.setState({
            ripple: {
                state: 'pressed',
                X: e.nativeEvent.offsetX,
                Y: e.nativeEvent.offsetY,
                width: e.target.clientWidth,
                height: e.target.clientHeight
            }
        });
    }
    mouseUp= (e) => {
        this.setState({
            ripple: { 
                state: 'released',
                X: e.nativeEvent.offsetX,
                Y: e.nativeEvent.offsetY,
                width: e.target.clientWidth,
                height: e.target.clientHeight 
            }
        });
        setTimeout(() => {
            if(this.state.ripple.state=='released'){
                this.setState({
                    ripple: { state: 'off' }
                });
            }
        }, 750);
    }
    mouseLeave= () => {
        if(this.state.ripple.state=='pressed') {
            this.mouseUp();
        }
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