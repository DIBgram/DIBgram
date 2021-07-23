import React from 'react';
import theme from './classic.json';
import { convertThemeToCSS } from './dibgram-theme-to-css';

export default function CurrentThemeCSS(){
    return(
        <style>
            {convertThemeToCSS(theme)}
        </style>
    );
}

const isThemeDark=theme.isDark;
export {isThemeDark};