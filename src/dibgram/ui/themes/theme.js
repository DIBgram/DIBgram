import React from 'react';
import classic from './classic.json';
import day from './day.json';
import tinted from './tinted.json';
import night from './night.json';
import { convertThemeToCSS } from './dibgram-theme-to-css';

const themes = { day, classic, tinted, night };
export var currentTheme= 'night';

/**
 * All children of this component will be rendered with the theme. Can be treated as a div.
 */
export function ThemeProvider(props) {
    return (
        <div 
            data-theme-is-dark={isThemeDark}
            {...props} 
            style={convertThemeToCSS({...classic, ...themes[currentTheme]})}
        />
    );
}

const isThemeDark=themes[currentTheme].isDark.value;
export {isThemeDark};