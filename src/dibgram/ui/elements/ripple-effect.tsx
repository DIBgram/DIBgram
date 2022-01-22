import React from 'react';

export type RippleEffectProps_AutoSettable = {
    /** 
     * - Change to `pressed` on `mouseDown`
     * - Change to `released` on `mouseUp`
     * - Change to `off` 1000ms after `mouseUp`
     */
    state: 'off' | 'pressed' | 'released';
    X?: number;
    Y?: number;
    width?: number;
    height?: number;
}

type RippleEffectProps = RippleEffectProps_AutoSettable & {
    /** The color to show in the ripple (same as `:active` if you used CSS) */
    color: string;
    /** Pass true if the button is small to make animation faster */
    small?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RippleableComponent= React.Component<any, {ripple: RippleEffectProps_AutoSettable}>;

/**
 * Adds a ripple effect to a button.
 * 
 * Insert at the beginning of the button.
 * 
 * **Note:** The button needs `position: relative;` and `overflow: hidden;`
 */
export default class RippleEffect extends React.Component<RippleEffectProps> {

    /** Gets the smallest radius that a circle, centered at click location, needs to fill the button */
    getMaxRadius(): number {
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
            return Math.max(//    │╭───────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────╮
                /* ┏ */ Math.hypot(this.props.X as number                                   , this.props.Y as number),//                               │ 
                /* ┓ */ Math.hypot((this.props.width as number) - (this.props.X as number)  , this.props.Y as number),//                               │
                /* ┗ */ Math.hypot(this.props.X as number                                   ,( this.props.height as number) - (this.props.Y as number)), 
                /* ┛ */ Math.hypot((this.props.width as number) - (this.props.X as number)  , (this.props.height as number) - (this.props.Y as number)), 
            );
        } else {
            const {X, Y, width, height} = this.props as {X: number, Y: number, width: number, height: number};
            const [rX, rY] = [X - width / 2, Y - height / 2]; // Click position relative to center of circle.
            const distanceToCenter= Math.hypot(Math.abs(rX), Math.abs(rY)); // Get distance from click position to the center of circle.
            return distanceToCenter + (width / 2); // Add circle radius to result
        }
    }
    render(): JSX.Element|null {
        if(this.props.state=='off') return null;
        return (
            <div
                className={'ripple '+this.props.state+ (this.props.small? ' small':'')}
                style={{
                    '--top': (this.props.Y || 0)+'px',
                    '--left': (this.props.X || 0)+'px',
                    '--radius': this.getMaxRadius()+'px',
                    backgroundColor: this.props.color
                } as {[key: string]: string}}/>
        );
    }
}

function getRelativeCoordinates(event: React.MouseEvent): {X: number, Y: number} {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    return {
        X: event.clientX - rect.left,
        Y: event.clientY - rect.top
    };
}

/** 
 * Assign your `mouseDown`, `mouseUp` and `mouseLeave` to the returned functions.
 * @param This The current component
 */
export function handleMyMouseEvents(This: RippleableComponent): ((e: React.MouseEvent) => void)[] {
    return [
        // mouseDown
        (function(this: RippleableComponent, e: React.MouseEvent): void {
            // Reset the ripple effect if it's not off
            if(this.state.ripple.state!='off'){
                this.setState({
                    ripple: { state: 'off' }
                });
                setTimeout(() => {
                    this.setState({
                        ripple: {
                            state: 'pressed',
                            ...getRelativeCoordinates(e),
                            width: (e.target as HTMLElement).clientWidth,
                            height: (e.target as HTMLElement).clientHeight
                        }
                    });
                }, 50);
                return;
            }
            this.setState({
                ripple: {
                    state: 'pressed',
                    ...getRelativeCoordinates(e),
                    width:  (e.target as HTMLElement).clientWidth,
                    height:  (e.target as HTMLElement).clientHeight
                }
            });
        }).bind(This),
        // mouseUp
        (function(this: RippleableComponent, e: React.MouseEvent): void {
            this.setState({
                ripple: { 
                    state: 'released',
                    ...getRelativeCoordinates(e),
                    width:  (e.target as HTMLElement).clientWidth,
                    height:  (e.target as HTMLElement).clientHeight 
                }
            });
        }).bind(This),
        // mouseLeave
        (function(this: RippleableComponent, e: React.MouseEvent): void {
            if(this.state.ripple.state=='pressed') {
                (this as any).mouseUp(e);
            }
        }).bind(This)
    ];
}
// Assign your `mouseDown`, `mouseUp` and `mouseLeave` to the returned functions.
export function handleMyMouseEventsFunction([ripple, setRipple]: [RippleEffectProps_AutoSettable, React.Dispatch<React.SetStateAction<RippleEffectProps_AutoSettable>>]): ((e: React.MouseEvent) => void)[] {
    function down(e: React.MouseEvent): void {
        // Reset the ripple effect if it's not off
        if(ripple.state!='off'){
            setRipple({ state: 'off' });
            setTimeout(() => {
                setRipple ({
                    state: 'pressed',
                    ...getRelativeCoordinates(e),
                    width:  (e.target as HTMLElement).clientWidth,
                    height:  (e.target as HTMLElement).clientHeight
                });
            }, 50);
            return;
        }
        setRipple ({
            state: 'pressed',
            ...getRelativeCoordinates(e),
            width:  (e.target as HTMLElement).clientWidth,
            height:  (e.target as HTMLElement).clientHeight
        });
    }

    function up(e: React.MouseEvent): void {
        setRipple ({
            state: 'released',
            X: e.nativeEvent.offsetX,
            Y: e.nativeEvent.offsetY,
            width:  (e.target as HTMLElement).clientWidth,
            height:  (e.target as HTMLElement).clientHeight
        });
    }

    function leave(e: React.MouseEvent): void {
        if(ripple.state=='pressed') {
            up(e);
        }
    }
    
    return [down, up, leave];
}