// DIBgram themes are converted to CSS in runtime here.

export function convertThemeToCSS(theme){ // Convert theme colors to CSS vars
    var css={};
    for(const name in theme){
        var obj= theme[name];
        if(typeof obj.value == 'string') {
            css['--theme-color-' + name]= obj.value;
        } else if(typeof obj.value == 'object') { // A color is equal to another color
            css['--theme-color-' + name]= `var(--theme-color-${obj.value.equals})`;
        }
    }
    return css;
}