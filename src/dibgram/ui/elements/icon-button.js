import React from 'react';
import PropTypes from 'prop-types';
import RippleEffect, {handleMyMouseEventsFunction} from '../../ui/elements/ripple-effect';
import './icon-button.scss';

/**
 * Renders a round button with an icon in it, and a special ripple effect.
 */
export default function IconButton({icon, ...rest}) {
    const ripple= React.useState({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);
    return (
        <button className="icon-button" {...rest} {...{onMouseDown, onMouseUp, onMouseLeave}}>
            <span dangerouslySetInnerHTML={{__html: icon}} />
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgOver)" small={true}/>
        </button>
    );
}
IconButton.propTypes = {
    icon: PropTypes.string.isRequired
};
