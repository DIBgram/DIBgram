import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import './scrollbar.scss';

export default function ScrollView(props) {
    var [mouseEntered, setMouseEntered] = React.useState(false);
    var [timeoutId, setTimeoutId] = React.useState(null);
    return (
        <Scrollbars
            className="scrollbar"
            style= {{ '--bar-width': (props.scrollBarWidth || 4)+'px' }}
            data-mouse-entered={mouseEntered}
            renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
            onMouseEnter={() => {
                setMouseEntered(true);
                setTimeoutId(setTimeout(() => {
                    setMouseEntered(false);
                }, 1000));
            }}
            onMouseLeave={() => {
                setMouseEntered(false);
                clearTimeout(timeoutId);
            }}
            autoHide
            autoHideTimeout={1000}
            {...props}
        />
    );
}
ScrollView.propTypes = {
    scrollBarWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
