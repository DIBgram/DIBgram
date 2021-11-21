import React from 'react';
import PropTypes from 'prop-types';
import { bubble_tail } from '../../../ui/icon/icons';

import './message-containers.scss';

export function ServiceMessage(props) {
    return (
        <div className="history-service-message" {...props}/>
    );
}

export function MessageBubble({ children, showTail=true, ...rest}) {
    return (
        <div className={`bubble ${showTail ? 'has-tail' : ''}`} {...rest}>
            {children}
            {showTail && <span className="tail" dangerouslySetInnerHTML={{__html: bubble_tail}}/>}
        </div>
    );
}
MessageBubble.propTypes = {
    children: PropTypes.node,
    showTail: PropTypes.bool,
};