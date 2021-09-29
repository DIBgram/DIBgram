import React from 'react';
import LoadingSpinner from '../elements/loading-spinner';
import { connect } from 'react-redux';

/**
 * Renders the connecting spinner at the bottom left corner, which is hidden when connected
 */
export default connect(state=> ({state: state})) (function ConnectionState({state}) {
    return (
        <div className={'connectionState'+(([
            'connectionStateConnecting',
            'connectionStateConnectingToProxy',
            'connectionStateWaitingForNetwork'
        ].includes(state))? '' : ' connected')}>
            <LoadingSpinner
                progressColor="var(--theme-color-menuIconFg)"
                size="20"
                lineWidth="2"/>
        </div>
    );
});
