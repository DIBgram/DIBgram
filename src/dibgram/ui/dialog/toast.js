import React from 'react';
import PropTypes from 'prop-types';
import { removeDialog } from './dialogs';
import './toast.scss';

/**
 * Renders a toast (a small text which is temporarily shown in the middle of the screen)
 */
export default function Toast({id, children}) {
    const [closed, setClosed] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => { // Automatically close after 6 seconds
            setClosed(true); // When an element has a closing dialog, a CSS class should be added to trigger the animation
            setTimeout(() => { // Then we wait until the animation is finished
                removeDialog(id); // And we can safely remove the element
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
    /** Toast ID, required to remove hide the dialog */
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};