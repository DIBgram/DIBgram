import React from 'react';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../elements/ripple-effect';
import { three_dots } from '../icon/icons';
import './three-dots-menu.scss';
import { getRtlMode } from '../../language-pack/language-pack';

export default function ThreeDotsMenu({children, className, ...rest}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const [onMouseDown, onMouseUp, onMouseLeave]= handleMyMouseEventsFunction(ripple);

    const [visible, setVisible]= React.useState(false);

    return (
        <div className={'three-dots-menu ' + (className || '')} onMouseLeave={e=> {
            onMouseLeave(e);
            setVisible(false);
        }} {...rest}>
            <button className="icon-button" onMouseDown={e=> {
                onMouseDown(e);
                setVisible(true);
            }}>
                <span dangerouslySetInnerHTML={{__html: three_dots}} />
                <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgOver)" small={true}/>
            </button>
            {visible && <div className={'menu ' + (getRtlMode() ? 'br' : 'bl')} onClick={e=> {
                onMouseUp(e);
                setVisible(false);
            }}>
                {children}
            </div>}
        </div>
    );
}
