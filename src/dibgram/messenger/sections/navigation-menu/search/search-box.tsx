import React from 'react';
import './search-box.scss';
import { info_close } from '../../../../ui/icon/icons';
import __ from '../../../../language-pack/language-pack';

/**
 * Renders the search box.
 */
export default function SearchBox(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): JSX.Element {
    return (
        <div id="search-box">
            <input 
                placeholder={__('lng_dlg_filter') as string}
                {...props}/>
            <button 
                className="clear" 
                onClick={()=> props.onChange && props.onChange({target: {value: ''}} as any)}
                data-visible={((props.value as string) || '').length}
                dangerouslySetInnerHTML={{__html: info_close}}>
            </button>
        </div>
    );
}
