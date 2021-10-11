import React from 'react';
import PropTypes from 'prop-types';

/**
 * Adds a ripple effect to a button.
 * 
 * Insert at the beginning of the button.
 * 
 * **Note:** The button needs `position: relative;` and `overflow: hidden;`
 */
export default class RippleEffect extends React.Component {
    static propTypes= {
        /** 
         * - Change to `pressed` on `mouseDown`
         * - Change to `released` on `mouseUp`
         * - Change to `off` 1000ms after `mouseUp`
         */
        state: PropTypes.oneOf(['off', 'pressed', 'released']).isRequired,
        X: PropTypes.number,
        Y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        /** The color to show in the ripple (same as `:active` if you used CSS) */
        color: PropTypes.string.isRequired,
        /** Pass true if the button is small to make animation faster */
        small: PropTypes.bool
    }

    /** Gets the smallest radius that a circle, centered at click location, needs to fill the button */
    getMaxRadius() {
        if(!this.props.small){
        //  It's a bit hard to understand. Let me explain:
        //  
        //  1. It calculates the coordinates relative to the 4 edges of the button ────╮
        //  2. The diagonal distance to the edges are calculated using the             │
        //      pythagoras rule, from the results of step 1            │               │
        //  3. The biggest distance is selected and then returned.     │               │
        //          │                                                  │               │
        //  ╭───────┴──────╮  ╭────────────────────────────────────────╯               │        
        //  │           ╭──┼──┴───╮                                                    │                  
            return Math.max(//    │╭───────────────────────────────────────────────────┴──────────────╮
                /* ┏ */ Math.hypot(this.props.X                     , this.props.Y),//                │ 
                /* ┓ */ Math.hypot(this.props.width - this.props.X  , this.props.Y),//                │
                /* ┗ */ Math.hypot(this.props.X                     , this.props.height - this.props.Y), 
                /* ┛ */ Math.hypot(this.props.width - this.props.X  , this.props.height - this.props.Y), 
            );
        } else {
            const {X, Y, width, height} = this.props;
            const [rX, rY] = [X - width / 2, Y - height / 2]; // Click position relative to center of circle.
            const distanceToCenter= Math.hypot(Math.abs(rX), Math.abs(rY)); // Get distance from click position to the center of circle.
            return distanceToCenter + (width / 2); // Add circle radius to result
        }
    }
    render() {
        if(this.props.state=='off') return null;
        return (
            <div
                className={'ripple '+this.props.state+ (this.props.small? ' small':'')}
                style={{
                    '--top': (this.props.Y || 0)+'px',
                    '--left': (this.props.X || 0)+'px',
                    '--radius': this.getMaxRadius()+'px',
                    backgroundColor: this.props.color
                }}/>
        );
    }
}

// Assign your `mouseDown`, `mouseUp` and `mouseLeave` to the returned functions.
export function handleMyMouseEvents(This) {
    return [
        // mouseDown
        (function(e) {
            // Reset the ripple effect if it's not off
            if(this.state.ripple.state!='off'){
                this.setState({
                    ripple: { state: 'off' }
                });
                setTimeout(() => {
                    this.setState({
                        ripple: {
                            state: 'pressed',
                            X: e.nativeEvent.offsetX,
                            Y: e.nativeEvent.offsetY,
                            width: e.target.clientWidth,
                            height: e.target.clientHeight
                        }
                    });
                }, 10);
                return;
            }
            this.setState({
                ripple: {
                    state: 'pressed',
                    X: e.nativeEvent.offsetX,
                    Y: e.nativeEvent.offsetY,
                    width: e.target.clientWidth,
                    height: e.target.clientHeight
                }
            });
        }).bind(This),
        // mouseUp
        (function(e) {
            this.setState({
                ripple: { 
                    state: 'released',
                    X: e.nativeEvent.offsetX,
                    Y: e.nativeEvent.offsetY,
                    width: e.target.clientWidth,
                    height: e.target.clientHeight 
                }
            });
        }).bind(This),
        // mouseLeave
        (function(e) {
            if(this.state.ripple.state=='pressed') {
                this.mouseUp(e);
            }
        }).bind(This)
    ];
}
// Assign your `mouseDown`, `mouseUp` and `mouseLeave` to the returned functions.
export function handleMyMouseEventsFunction([ripple, setRipple]) {
    function down(e) {
        // Reset the ripple effect if it's not off
        if(ripple.state!='off'){
            setRipple({ state: 'off' });
            setTimeout(() => {
                setRipple ({
                    state: 'pressed',
                    X: e.nativeEvent.offsetX,
                    Y: e.nativeEvent.offsetY,
                    width: e.target.clientWidth,
                    height: e.target.clientHeight
                });
            }, 10);
            return;
        }
        setRipple ({
            state: 'pressed',
            X: e.nativeEvent.offsetX,
            Y: e.nativeEvent.offsetY,
            width: e.target.clientWidth,
            height: e.target.clientHeight
        });
    }

    function up(e) {
        setRipple ({
            state: 'released',
            X: e.nativeEvent.offsetX,
            Y: e.nativeEvent.offsetY,
            width: e.target.clientWidth,
            height: e.target.clientHeight 
        });
    }

    function leave(e) {
        if(ripple.state=='pressed') {
            up(e);
        }
    }
    
    return [down, up, leave];
}