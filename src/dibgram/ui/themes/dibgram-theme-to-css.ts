// DIBgram themes are converted to CSS in runtime here.

import { ThemeObject } from './theme';

export function convertThemeToCSS(theme: ThemeObject): {[property: string]: string} { // Convert theme colors to CSS vars
    const css: {[property: string]: string} = {};
    for(const name in theme){
        const obj= theme[name];
        if(typeof obj.value == 'string') {
            css['--theme-color-' + name]= obj.value;
        } else if(typeof obj.value == 'object') { // A color is equal to another color
            css['--theme-color-' + name]= `var(--theme-color-${obj.value.equals})`;
        }
    }
    return css;
}