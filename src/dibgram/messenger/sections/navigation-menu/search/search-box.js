import React from 'react';
import PropTypes from 'prop-types';
import './search-box.scss';
import { info_close } from '../../../../ui/icon/icons';

/**
 * Renders the search box.
 */
export default function SearchBox(props) {
    return (
        <div id="search-box">
            <input 
                placeholder="Search"
                value={props.value}
                onChange={props.onChange}
                {...props}/>
            <button 
                className="clear" 
                onClick={()=> props.onChange && props.onChange({target: {value: ''}})}
                data-visible={(props.value || '').length}
                dangerouslySetInnerHTML={{__html: info_close}}>
            </button>
        </div>
    );
}
SearchBox.propTypes= {
    value: PropTypes.string,
    onChange: PropTypes.func
};