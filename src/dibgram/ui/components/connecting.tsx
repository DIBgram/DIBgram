import React from 'react';
import LoadingSpinner from '../elements/loading-spinner';
import { connect } from 'react-redux';
import { ConnectionStoreState } from '../../TdWeb/connectionStore';

/**
 * Renders the connecting spinner at the bottom left corner, which is hidden when connected
 */
export default (connect<{state: ConnectionStoreState}, unknown, Record<string, never>, ConnectionStoreState>((state:ConnectionStoreState)=> ({state: state})) (function ConnectionState({state}) {
    return (
        <div className={'connectionState'+(([
            'connectionStateConnecting',
            'connectionStateConnectingToProxy',
            'connectionStateWaitingForNetwork'
        ].includes(state))? '' : ' connected')}>
            <LoadingSpinner
                progressColor="var(--theme-color-menuIconFg)"
                size={20}
                lineWidth={2}/>
        </div>
    );
}) as unknown as ()=> JSX.Element);
