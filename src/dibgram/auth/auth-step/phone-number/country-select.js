import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../../ui/dialog/dialog';
import SmallButton from '../../../ui/elements/small-button';
import ScrollView from '../../../ui/scroll/scrollbar';
import './country-select.scss';
import RippleEffect, { handleMyMouseEventsFunction } from '../../../ui/elements/ripple-effect';

export default function CountrySelect({onChange, id, countries}) {
    const ref = React.useRef();
    return (
        <Dialog ref={ref} id={id} width="320px" className="confirm-dialog">
            <h1>Select Country</h1>

            <ScrollView scrollAlwaysVisible>
                {countries.map(country => country.is_hidden? null: (
                    <CountrySelectItem key={country.country_code} country={country} onClick={ ()=>{
                        onChange?.('+' + country.calling_codes[0]);
                        ref.current.close();
                    }}/>
                ))}
            </ScrollView>

            <div className="options">
                <SmallButton onClick={()=> {ref.current.close();}}>
                    Close
                </SmallButton>
            </div>
        </Dialog>
    );
}
CountrySelect.propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function CountrySelectItem({country, onClick}) {
    const ripple = React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave] = handleMyMouseEventsFunction(ripple);
    return (
        <div className="country-select-item" onClick={onClick} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseLeave}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                <span className="name">{country.english_name}</span>
                <span className="codes">{country.calling_codes.map(c=> '+' + c).join(', ')}</span>
            </div>
        </div>
    );
}
CountrySelectItem.propTypes = {
    country: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};
