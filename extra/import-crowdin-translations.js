/**
 * Reads the built ZIP file downloaded from https://crowdin.com/project/dibgram and saves it in DIBgram source.
 * 
 * How to use:
 * - Make sure you have cloned the repo properly. This script does not work if it is standalone.
 * - Download and save the ZIP file to the same folder as this script. We will call it `translations.zip`.
 * - Run this script:
 *     node import-crowdin-translations.js translations.zip
 */

const ZIP = require('zip');
const fs = require('fs');

if(fs.existsSync('../src/dibgram/language-pack/special-strings')){
    fs.rmdirSync('../src/dibgram/language-pack/special-strings', {recursive: true, force: true});
}
fs.mkdirSync('../src/dibgram/language-pack/special-strings');

const data = fs.readFileSync(process.argv[2]);
const reader = new ZIP.Reader(data);
reader.toObject();

function forEachFile(entry) {
    const name= entry.getName();
    if(entry.isFile() && name.endsWith('.csv')) {
        var languageCode = name.split('/')[0].toLowerCase();
        var [language, languageDialect] = languageCode.split('-');
        if(language==languageDialect) languageCode= language;
        const data = entry.getData().toString().split('\n');

        let result= {};
        data.forEach(line => {
            if(!line) return;
            const [key, value] = line.slice(1, -1).split('","');
            result[key] = value; // sliced to remove quotes
        });
        
        const json= JSON.stringify(result);
        fs.writeFile(`../src/dibgram/language-pack/special-strings/${languageCode}.json`, json, function(){});
    }
}
reader.forEach(forEachFile);
reader.iterator();
