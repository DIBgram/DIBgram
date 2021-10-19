import React from 'react';
import PropTypes from 'prop-types';
import { info_close, title_search } from '../icon/icons';
import './search.scss';
import IconButton from '../elements/icon-button';

export default function BoxSearch({value, onChange}) {
    return (
        <div className="box-search">
            <span className="icon" dangerouslySetInnerHTML={{__html: title_search}} />
            <input type="text" placeholder="Search" value={value} onChange={onChange} />
            <IconButton icon={info_close} className="icon-button clear" 
                onClick={()=> onChange && onChange({target: {value: ''}})}
                data-visible={(value || '').length}/>
        </div>
    );
}
BoxSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
