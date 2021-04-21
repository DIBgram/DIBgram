import React from 'react';
import PropTypes from 'prop-types';

export default class UnderlinedInput extends React.Component {
    constructor(args) {
        super(args);

        this.state= {
            inactive: this.props.active
        };
    }

    render () {
        var className='underlined-input';
        if(this.state.inactive) {
            className+=' inactive';
        }
        return (
            <div className={className}>
                <input 
                    type={this.props.type} 
                    onChange={this.props.onChange} 
                    value={this.props.value}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}/>
                <div className="underline"></div>
            </div>
        );
    }

    handleFocus =()=>{
        this.setState({inactive: false});
    }
    handleBlur =()=>{
        this.setState({inactive: true});
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'url']).isRequired,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        active: PropTypes.bool
    }
}