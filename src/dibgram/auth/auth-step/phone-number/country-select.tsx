import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../../ui/dialog/dialog';
import SmallButton from '../../../ui/elements/small-button';
import ScrollView from '../../../ui/scroll/scrollbar';
import './country-select.scss';
import RippleEffect, { handleMyMouseEventsFunction, RippleEffectProps_AutoSettable } from '../../../ui/elements/ripple-effect';
import BoxSearch from '../../../ui/dialog/search';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';

type CountrySelectProps = {
    onChange?: (country: string) => void;
    id: string;
    countries: TdApi.td_countryInfo[];
}

export default function CountrySelect({onChange, id, countries}: CountrySelectProps): JSX.Element {
    const ref = React.useRef<Dialog>() as React.RefObject<Dialog>;
    
    const [search, setSearch] = React.useState('');
    if(search.length > 0) {
        countries = countries.filter((country: TdApi.td_countryInfo) => country.name.toLowerCase().startsWith(search.toLowerCase()));
    }

    return (
        <Dialog ref={ref} id={id} width="320px" className="confirm-dialog">
            <h1>{__('lng_country_select')}</h1>

            <BoxSearch value={search} onChange={(e) => setSearch(e.target.value)} />

            <ScrollView scrollAlwaysVisible>
                {countries.map(country => (country.is_hidden? null: (
                    <CountrySelectItem key={country.country_code} country={country} onClick={ ()=>{
                        onChange?.('+' + country.calling_codes[0]);
                        ref.current?.close();
                    }}/>
                )))}
            </ScrollView>

            <div className="options">
                <SmallButton onClick={()=> {ref.current?.close();}}>{__('lng_close')}</SmallButton>
            </div>
        </Dialog>
    );
}
CountrySelect.propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

type CountrySelectItemProps= {
    country: TdApi.td_countryInfo;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function CountrySelectItem({country, onClick}: CountrySelectItemProps): JSX.Element {
    const ripple = React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents = handleMyMouseEventsFunction(ripple);
    return (
        <div className="country-select-item" onClick={onClick} {...rippleEvents}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-windowBgRipple)"/>
            <div className="content">
                <span className="name">{country.english_name}</span>
                <span className="codes">{country.calling_codes.map(c=> '+' + c).join(', ')}</span>
            </div>
        </div>
    );
}
