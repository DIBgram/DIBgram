import React from 'react';
import classic from './classic.json';
import theme from './night.json';
import { convertThemeToCSS } from './dibgram-theme-to-css';

export default function CurrentThemeCSS(){
    return(
        <style>
            {convertThemeToCSS({...classic, ...theme})}
        </style>
    );
}

const isThemeDark=theme.isDark.value;
export {isThemeDark};