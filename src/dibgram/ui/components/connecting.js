import React from 'react';
import TdLib from '../../TdWeb/tdlib';
import LoadingSpinner from '../elements/loading-spinner';

/**
 * Renders the connecting spinner at the bottom left corner, which is hidden when connected
 */
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
                    progressColor="var(--theme-color-menuIconFg)"
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
        TdLib.unRegisterUpdateHandler('updateConnectionState', this.handleUpdate);
    }

}

addEventListener('online', () => {
    TdLib.sendQuery({
        '@type':'setNetworkType',
        'type': {
            '@type': 'networkTypeOther'
        }
    });
});
addEventListener('offline', () => {
    TdLib.sendQuery({
        '@type':'setNetworkType',
        'type': {
            '@type': 'networkTypeNone'
        }
    });
});
