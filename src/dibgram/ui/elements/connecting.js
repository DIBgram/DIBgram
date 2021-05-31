import React from 'react';
import TdLib from '../../TdWeb/tdlib';
import LoadingSpinner from './loading-spinner';

export default class ConnectionState extends React.Component {
    state= {
        cState: 'connectionStateReady',
    }
    render () {
        return (
            <div className={'connectionState'+(([
                'connectionStateConnecting',
                'connectionStateConnectingToProxy',
                'connectionStateWaitingForNetwork'
            ].includes(this.state.cState))? '' : ' connected')}>
                <LoadingSpinner
                    progressColor="rgb(168, 168, 168)"
                    size="20"
                    lineWidth="2"/>
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
    }
    componentWillUnmount () {
        TdLib.registerUpdateHandler('updateConnectionState', this.handleUpdate);
    }

}