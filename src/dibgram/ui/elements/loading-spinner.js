import { ProgressRing } from 'progress-ring';
import 'progress-ring/src/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a spinner which in addition to spinning, also changes size.
 */
export default class LoadingSpinner extends React.Component {
    static props= {
        /** Spinner circle size */
        size: PropTypes.number.isRequired,
        /** Spinner thickness */
        lineWidth: PropTypes.number.isRequired,
        /** Spinner color */
        progressColor: PropTypes.string.isRequired
    }
    state= {
        percentage: 10 // From 10 to 90, this specifies how much the spinner grows and shrinks while spinning (reversed)
    }
    render () {
        return (
            <div className="loading-spinner">
                <ProgressRing
                    percent={this.state.percentage}
                    caps='round'
                    trackColor="transparent"
                    spin="true"
                    {...this.props}
                    transitionDuration="2000"/>
            </div>
        );
    }

    componentDidMount () {
        this.intervalNum= setInterval(() => { // Spinner grows and shrinks while spinning
            this.setState({
                percentage: (90 - this.state.percentage)
            });
        }, 2000);
    }

    componentWillUnmount () {
        clearInterval(this.intervalNum);
    }
}