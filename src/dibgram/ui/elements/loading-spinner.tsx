import { ProgressRing } from 'progress-ring';
import 'progress-ring/src/styles.css';
import React from 'react';

type LoadingSpinnerProps = {
    /** Spinner circle size */
    size: number;
    /** Spinner thickness */
    lineWidth: number;
    /** Spinner color */
    progressColor: string;
}

type LoadingSpinnerState = {
    percentage: number;
}

/**
 * Renders a spinner which in addition to spinning, also changes size.
 */
export default class LoadingSpinner extends React.Component<LoadingSpinnerProps, LoadingSpinnerState> {
    state= {
        percentage: 10 // From 10 to 90, this specifies how much the spinner grows and shrinks while spinning (reversed)
    }
    intervalNum= 0;
    render (): JSX.Element {
        return (
            <div className="loading-spinner">
                <ProgressRing
                    percent={this.state.percentage}
                    caps='round'
                    trackColor="transparent"
                    spin={true}
                    {...this.props}
                    transitionDuration={2000}/>
            </div>
        );
    }

    componentDidMount (): void {
        this.intervalNum= window.setInterval(() => { // Spinner grows and shrinks while spinning
            this.setState({
                percentage: (90 - this.state.percentage)
            });
        }, 2000);
    }

    componentWillUnmount (): void {
        clearInterval(this.intervalNum);
    }
}