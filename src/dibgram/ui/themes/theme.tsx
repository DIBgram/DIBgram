import React from 'react';
import classic from './classic.json';
import day from './day.json';
import tinted from './tinted.json';
import night from './night.json';
import { convertThemeToCSS } from './dibgram-theme-to-css';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { getRtlMode } from '../../language-pack/language-pack';

const themes = { day, classic, tinted, night };

export type ThemeObject= {
    [colorName: string]: {
        value: string | {equals: string},
        comment?: string|null,
    }
}

export type ThemeName= 'classic' | 'day' | 'tinted' | 'night';

function getThemeFromStorage(): ThemeName {
    let theme = localStorage.getItem('dibgram-theme');
    if (!theme) { // if theme is not set in localStorage, use OS theme
        theme= window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
        localStorage.setItem('dibgram-theme', theme);
    }
    return theme as ThemeName;
}

export type ThemeStoreState= {
    theme: ThemeName,
    rtl: boolean,
}

export type ThemeStoreAction= {
    type: 'SET_THEME',
    theme: ThemeName,
} | {
    type: 'SET_RTL',
    rtl: boolean,
}

export const themeStore = createStore<ThemeStoreState, ThemeStoreAction, any, any>(
    (state = { 
        theme: getThemeFromStorage(),
        rtl: getRtlMode()
    }, action) => {
        switch (action.type) {
            case 'SET_THEME':
                return { ...state, theme: action.theme };
            case 'SET_RTL':
                return { ...state, rtl: action.rtl };
            default:
                return state;
        }
    }
);

/**
 * All children of this component will be rendered with the theme. Can be treated as a div.
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeProvider= connect<ThemeStoreState, unknown, React.PropsWithChildren<{[key:string]:any}>, ThemeStoreState>(state=> state) (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    function ThemeProvider({ theme, rtl, dispatch, ...rest}: ThemeStoreState & {dispatch: React.Dispatch<ThemeStoreAction>, [key:string]:any}): JSX.Element {
        return (
            <div dir={rtl ? 'rtl' : 'ltr'}
                data-theme-is-dark={themes[theme].isDark.value}
                {...rest} 
                style={convertThemeToCSS({...classic, ...themes[theme]})}
            />
        );
    });

export function setTheme(theme: ThemeName): void {
    localStorage.setItem('dibgram-theme', theme);
    themeStore.dispatch({ type: 'SET_THEME', theme });
}
