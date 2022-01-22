import React from 'react';

type UnderlinedInputProps = {
    /** Input type */
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    /** Fired when input is modified */
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    /** Input value */
    value?: string|number;
    /** The maximum number of characters the input can have */
    maxLength?: number;
    /** If set to true, the input will gain focus when it renders */
    autoFocus?: boolean;
    /** Fires when the 'Enter' key is pressed */
    onEnterKeyPressed?: (e: React.KeyboardEvent) => void;
    /** Input title/placeholder */
    title?: React.ReactNode|React.ReactNode[];
    /** If true, the input will become red */
    invalid?: boolean;
    /** If true, text cannot be copied from the input */
    disableCopy?: boolean;
    /** If true, up and down buttons cannot change input value */
    preventNumberScrolling?: boolean;
    /** `<input>` React ref */
    iRef?: React.RefObject<HTMLInputElement>;
    /** Fires when a key is pushed down while the element is in focus. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

type UnderlinedInputState = {
    inactive: boolean;
    mouseX: string;
    titleClass: string;
}

/**
 * Renders a beautiful field with a title and underline
 */
export default class UnderlinedInput extends React.Component<UnderlinedInputProps, UnderlinedInputState> {
    constructor(args: UnderlinedInputProps | Readonly<UnderlinedInputProps>) {
        super(args);

        this.state= {
            inactive: false,
            mouseX: '50%',
            titleClass: this.getTitleClass(this.props.autoFocus)
        };
    }

    getTitleClass (focus: boolean|undefined): string {
        return (focus || (!!this.props.value)) ? 'title top' : 'title placeholder';
    }

    render(): JSX.Element {
        let className='underlined-input';
        if(this.state.inactive) {
            className+=' inactive';
        }
        if(this.props.autoFocus) {
            className+=' autoFocus';
        }
        if(this.props.invalid) {
            className+=' invalid';
        }
        return (
            <div className={className}
                style={{'--mouse-left': this.state.mouseX || '50%'} as {[key: string]: string}}>
                { this.props.title ? (
                    <div className={this.state.titleClass}>{this.props.title}</div>
                ) : null }
                <input 
                    ref={this.props.iRef}
                    type={this.props.type} 
                    onChange={this.props.onChange} 
                    value={this.props.value}
                    onMouseDown={this.handleMouseDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    autoFocus={this.props.autoFocus || false}
                    onKeyDown={this.handleKeyDown}
                    maxLength={this.props.maxLength}
                    onCopy={e=> {
                        if(this.props.disableCopy) {
                            e.preventDefault();
                        }
                    }}/>
                <div className="underline"></div>
            </div>
        );
    }

    handleFocus= (): void => {
        this.setState({
            inactive: false,
            titleClass: this.getTitleClass(true)
        });
    }
    handleBlur= (): void => {
        this.setState({
            inactive: true, 
            mouseX: '50%',
            titleClass: this.getTitleClass(false)
        });
    }
    handleMouseDown= (e: React.MouseEvent): void => {
        this.setState({
            mouseX: e.nativeEvent.offsetX+'px'
        });
    }
    handleKeyDown= (e: React.KeyboardEvent<HTMLInputElement>): void => {
        this.props.onKeyDown?.(e);
        if(e.key=='Enter') {
            this.props.onEnterKeyPressed && this.props.onEnterKeyPressed(e);
        }
        if(this.props.preventNumberScrolling) {
            if(e.key=='ArrowUp' || e.key=='ArrowDown') {
                e.preventDefault();
            }
        }
    }

}