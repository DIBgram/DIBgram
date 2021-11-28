/**
 * Converts a Telegram Desktop color palette to a DIBgram-readable JSON file.
 * 
 * How to use:
 * - Make sure NodeJS and the `readline` NPM package is installed (readline is built-in AFAIK).
 * - Open Telegram Desktop (not DIBgram), then open settings, chat settings section
 * - Activate the theme you want to export.
 * - From the three-dots menu, click 'Create new theme'.
 * - A theme editor will open to the right. Click on its three-dots menu and select 'Show palette file'.
 * - Copy the file to the same folder as this script and rename it to the name of the theme (e.g. 'classic.tdesktop-palette)
 * - Open the folder in PowerShell
 * - Type this: (replace 'classic' with the name of the file that you copied)
 *    Get-Content classic.tdesktop-palette | node tdesktop-palette-to-json.js > classic.json
 * - Open the file in a text editor.
 * - Manually add two properties `isDark` and `chatBg` to the JSON file.
 *     Look at the file src/dibgram/ui/themes/day.json to see how you should do it. `isDark` is at the top of the file, `chatBg` is at the end.
 *     `isDark` should be "true" if the theme is dark, "false" otherwise.
 *     `chatBg` should be a CSS compatible color value for chat background 
 *          (note: If you want to use an image and include it in compile results, you need to place the image in src/dibgram/ui/img, create a CSS variable in src/dibgram/ui/img/img-paths.scss, and use that variable in the JSON file).
 * 
 * At the moment, the only way to use a custom color palette is to modify the app source code.
 */

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var data={};

rl.on('line', function(line){
    if(/(\w+)(\s*):(\s*)(#[0-9a-fA-F]{3,8}|\w+)(\s*)/.test(line)){
        const name= /((\w+)(\s*))(?=:(\s*)(#[0-9a-fA-F]{3,8}|\w+)(\s*);)/.exec(line);
        const value= /(?<=(\w+)(\s*):(\s*))((#[0-9a-fA-F]{3,8}|\w+))(?=(\s*);)/.exec(line);
        const comment= /(?<=\/\/).*/.exec(line);
        if(name==null || value==null) return;
        if(data[value[0]]) value[0]={equals:value[0]};
        var obj={value: value[0], comment: (comment && comment[0])};
        data[name[0]]= obj;
    }
});
rl.on('close',()=>console.log(JSON.stringify(data, null, 4)));