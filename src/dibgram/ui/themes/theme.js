import React from 'react';
import theme from './night.json';
import { convertThemeToCSS } from './dibgram-theme-to-css';

export default function CurrentThemeCSS(){
    return(
        <style>
            {convertThemeToCSS(theme)}
        </style>
    );
}