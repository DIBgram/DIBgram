import React from 'react';
import PropTypes from 'prop-types';
import { removeDialog } from './dialogs';
import './toast.scss';

export default function Toast({id, children}) {
    const [closed, setClosed] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setClosed(true);
            setTimeout(() => {
                removeDialog(id);
            }, 2000);
        }, 6000);
    }, []);
    return (
        <div className={'toast' + (closed? ' closed':'')}>
            <div className="toast-content">
                {children}
            </div>
        </div>
    );
}
Toast.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};