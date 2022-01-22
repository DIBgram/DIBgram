import React from 'react';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';
import './scrollbar.scss';

type ScrollViewProps = ScrollbarProps & {
    /** Scroll-bar thickness, in pixels (default: 4) */
    scrollBarWidth?: number|string;
    /** A React ref that is passed down to the scrollbars component */
    scrollRef?: React.RefObject<Scrollbars>;
    /** Whether to always show the scrollbars (default: false) */
    scrollAlwaysVisible?: boolean;
}


/**
 * A scrollable container. Sizing might need to be tweaked by CSS.
 */
export default function ScrollView({scrollBarWidth, scrollRef, scrollAlwaysVisible, ...propsRest}: ScrollViewProps): JSX.Element {
    const [mouseEntered, setMouseEntered] = React.useState(false);
    const [timeoutId, setTimeoutId] = React.useState(0);
    return (
        <Scrollbars
            className="scrollbar"
            style= {{ '--bar-width': (scrollBarWidth || 4)+'px' } as {[key: string]: string}}
            data-mouse-entered={mouseEntered}
            renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
            onMouseEnter={() => {
                setMouseEntered(true);
                setTimeoutId(window.setTimeout(() => {
                    setMouseEntered(false);
                }, 1000));
            }}
            onMouseLeave={() => {
                setMouseEntered(false);
                clearTimeout(timeoutId);
            }}
            autoHide={!scrollAlwaysVisible}
            data-auto-hide={scrollAlwaysVisible? 'false' : 'true'}
            autoHideTimeout={1000}
            hideTracksWhenNotNeeded={true}
            ref={scrollRef}
            {...propsRest}
        />
    );
}
