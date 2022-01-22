import React from 'react';
import RippleEffect, {handleMyMouseEvents, RippleEffectProps_AutoSettable} from './ripple-effect';

type BigHighlightedButtonProps = {
        /** Fires when the button is clicked */
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
        /** The button's content */
    children: React.ReactNode | React.ReactNode[];
}

type BigHighlightedButtonState = {
    ripple: RippleEffectProps_AutoSettable;
}

/**
 * Renders a BIG button which is filled with accent color
 */
export default class BigHighlightedButton extends React.Component<BigHighlightedButtonProps, BigHighlightedButtonState> {
    state= {
        ripple: {
            state: 'off'
        }
    } as const;
    mouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
    mouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
    mouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
    constructor(props: BigHighlightedButtonProps | Readonly<BigHighlightedButtonProps>) {
        super(props);
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }

    render (): JSX.Element {
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