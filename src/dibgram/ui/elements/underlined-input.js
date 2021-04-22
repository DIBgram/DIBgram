import React from 'react';
import PropTypes from 'prop-types';

export default class UnderlinedInput extends React.Component {
    constructor(args) {
        super(args);

        this.state= {
            inactive: false,
            mouseX: '50%'
        };
    }

    render () {
        var className='underlined-input';
        if(this.state.inactive) {
            className+=' inactive';
        }
        if(this.props.autoFocus) {
            className+=' autoFocus';
        }
        return (
            <div className={className}
                style={{'--mouse-left': this.state.mouseX || '50%'}}>
                <input 
                    type={this.props.type} 
                    onChange={this.props.onChange} 
                    value={this.props.value}
                    onMouseDown={this.handleMouseDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    autoFocus={this.props.autoFocus || false}
                    onKeyDown={this.handleKeyDown}/>
                <div className="underline"></div>
            </div>
        );
    }

    handleFocus =()=>{
        this.setState({
            inactive: false
        });
    }
    handleBlur =()=>{
        this.setState({inactive: true, mouseX: '50%'});
    }
    handleMouseDown =(e)=>{
        this.setState({
            mouseX: e.nativeEvent.offsetX+'px'
        });
    }
    handleKeyDown =(e)=>{
        if(e.key=='Enter') {
            this.props.onEnterKeyPressed();
        }
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'url']).isRequired,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        active: PropTypes.bool,
        autoFocus: PropTypes.bool,
        onEnterKeyPressed: PropTypes.func
    }
}