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
        color: PropTypes.string.isRequired,
    }

    /** Gets the smallest radius that a circle, centered at click location, needs to fill the button */
    getMaxRadius() {
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
    }
    render() {
        if(this.props.state=='off') return null;
        return (
            <div
                className={'ripple '+this.props.state}
                style={{
                    '--top': (this.props.Y || 0)+'px',
                    '--left': (this.props.X || 0)+'px',
                    '--radius': this.getMaxRadius()+'px',
                    backgroundColor: this.props.color
                }}/>
        );
    }
}