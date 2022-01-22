import React from 'react';
import PropTypes from 'prop-types';
import { info_close, title_search } from '../icon/icons';
import './search.scss';
import IconButton from '../elements/icon-button';
import __ from '../../language-pack/language-pack';

type BoxSearchProps = {
    value: string;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BoxSearch({value, onChange}: BoxSearchProps): JSX.Element {
    return (
        <div className="box-search">
            <span className="icon" dangerouslySetInnerHTML={{__html: title_search}} />
            <input type="text" placeholder={__('lng_dlg_filter') as string} value={value} onChange={onChange} />
            <IconButton icon={info_close} className="icon-button clear" 
                onClick={()=> onChange && onChange({target: {value: ''} as any} as React.ChangeEvent<HTMLInputElement>)}
                data-visible={(value || '').length}/>
        </div>
    );
}
BoxSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
