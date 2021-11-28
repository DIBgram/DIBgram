/**
 * Reads the built ZIP file downloaded from https://crowdin.com/project/dibgram and saves it in DIBgram source.
 * 
 * How to use:
 * - Make sure you have cloned the repo properly. This script does not work if it is standalone.
 * - Download and save the ZIP file to the same folder as this script. We will call it `translations.zip`.
 * - Run this script:
 *     node import-crowdin-translations.js translations.zip
 * 
 * Note: In addition to inserting the translation files in their respective locations, this script also outputs a JSON string containing translations for all languages.
 *       To save this JSON string, you need to insert a '>' character after the command, followed by the output file location:
 *          node import-crowdin-translations.js translations.zip > all-translations.json
 */

const outDir= process.argv[3] || '../../src/dibgram/language-pack/special-strings';

const ZIP = require('zip');
const fs = require('fs');

const data = fs.readFileSync(process.argv[2]);
const reader = new ZIP.Reader(data);
reader.toObject();

if(fs.existsSync(outDir)){
    fs.rmdirSync(outDir, {recursive: true, force: true});
}
fs.mkdirSync(outDir);

const allResults= {};
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
        
        allResults[languageCode]= result;
        const json= JSON.stringify(result);
        fs.writeFile(`${outDir}/${languageCode}.json`, json, function(){});
    }
}
reader.forEach(forEachFile);
reader.iterator();

console.log(JSON.stringify(allResults));
