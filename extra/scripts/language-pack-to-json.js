// Converts the `lang.strings` file to a JSON file, to be used in DIBgram.
// 1. Open this URL: https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/langs/lang.strings
// 2. Open developer tools (F12) and go to console
// 3. Paste the code below and press enter
// 4. Result JSON will be put in page content. You can select and copy it.
// 
// Note: The `lang.strings` is known to contain some incorrect strings, use `import-language-pack-from-tdlib.js` instead.
var result= {};
document.body.innerText.replace(/\/\*.*\*\//gs, '').split('\n').forEach( line => {
    if(/".+"\s*=\s*".+";/.test(line)){
        const [, key, value]= /"(.+)"\s*=\s*"(.+)";/.exec(line.trim());
        result[key]= value;
    }
});
document.write(JSON.stringify(result, null, 4));