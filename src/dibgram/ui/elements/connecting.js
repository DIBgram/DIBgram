import { ProgressRing } from 'progress-ring';
import React from 'react';
import TdLib from '../../TdWeb/tdlib';

export default class ConnectionState extends React.Component {
    state= {
        cState: 'connectionStateReady',
        percentage: 10
    }
    render () {
        return (
            <div className="connectionState">
                <ProgressRing
                    percent={this.state.percentage}
                    caps='round'
                    trackColor="transparent"
                    progressColor="gray"
                    size="20"
                    lineWidth="2"
                    spin="true"
                    transitionDuration="2000"/>
            </div>
        );
    }
    handleUpdate = (update) => {
        this.setState({
            cState: update.state['@type']
        });
    }
    componentDidMount () {
        TdLib.registerUpdateHandler('updateConnectionState', this.handleUpdate);
        this.intervalNum= setInterval(() => {
            this.setState({
                percentage: (90 - this.state.percentage)
            });
        }, 2000);
    }
    componentWillUnmount () {
        TdLib.registerUpdateHandler('updateConnectionState', this.handleUpdate);
        clearInterval(this.intervalNum);
    }

}