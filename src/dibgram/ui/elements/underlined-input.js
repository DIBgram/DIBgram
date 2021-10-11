import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a beautiful field with a title and underline
 */
export default class UnderlinedInput extends React.Component {
    constructor(args) {
        super(args);

        this.state= {
            inactive: false,
            mouseX: '50%',
            titleClass: this.getTitleClass(this.props.autoFocus)
        };
    }

    getTitleClass (focus) {
        return (focus || (!!this.props.value)) ? 'title top' : 'title placeholder';
    }

    render () {
        var className='underlined-input';
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
                style={{'--mouse-left': this.state.mouseX || '50%'}}>
                { this.props.title ? (
                    <div className={this.state.titleClass}>{this.props.title}</div>
                ) : null }
                <input 
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

    handleFocus =()=>{
        this.setState({
            inactive: false,
            titleClass: this.getTitleClass(true)
        });
    }
    handleBlur =()=>{
        this.setState({
            inactive: true, 
            mouseX: '50%',
            titleClass: this.getTitleClass(false)
        });
    }
    handleMouseDown =(e)=>{
        this.setState({
            mouseX: e.nativeEvent.offsetX+'px'
        });
    }
    handleKeyDown =(e)=>{
        if(e.key=='Enter') {
            this.props.onEnterKeyPressed && this.props.onEnterKeyPressed();
        }
        if(this.props.preventNumberScrolling) {
            if(e.key=='ArrowUp' || e.key=='ArrowDown') {
                e.preventDefault();
            }
        }
    }

}
UnderlinedInput.propTypes = {
    /** Input type, can be `text`, `number`, `password`, `email`, `url` */
    type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'url']).isRequired,
    /** Fired when input is modified */
    onChange: PropTypes.func,
    /** Input value */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** The maximum number of characters the input can have */
    maxLength: PropTypes.number,
    active: PropTypes.bool,
    /** If set to true, the input will gain focus when it renders */
    autoFocus: PropTypes.bool,
    /** Fires when the 'Enter' key is pressed */
    onEnterKeyPressed: PropTypes.func,
    /** Input title/placeholder */
    title: PropTypes.string,
    /** If true, the input will become red */
    invalid: PropTypes.bool,
    /** If true, text cannot be copied from the input */
    disableCopy: PropTypes.bool,
    /** If true, up and down buttons cannot change input value */
    preventNumberScrolling: PropTypes.bool
};