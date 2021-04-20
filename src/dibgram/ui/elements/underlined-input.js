import React from 'react';
import PropTypes from 'prop-types';

export default class UnderlinedInput extends React.Component {
    constructor(args) {
        super(args);
    }

    render () {
        return (
            <input type={this.props.type} onChange={this.props.onChange} value={this.props.value}/>
        );
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'number', 'password', 'email']).isRequired,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
}