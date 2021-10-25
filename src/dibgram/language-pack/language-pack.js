import React from 'react';
import { authStore } from '../auth/auth-screen';
import TdLib from '../TdWeb/tdlib';
import englishLanguagePack from './english.json';

var currentLanguagePack= null;

export function initLanguagePack(){
    TdLib.sendQuery({
        '@type': 'setOption', 
        'name': 'localization_target', 
        'value': {
            '@type': 'optionValueString', 
            value: 'tdesktop'
        }
    }).then(()=>{
        let languageInfo= localStorage.getItem('dibgram-active-language');
        if(languageInfo) languageInfo= JSON.parse(languageInfo);
        if(!languageInfo) languageInfo= {
            '@type': 'languagePackInfo',
            base_language_pack_id: '',
            id: 'en',
            is_beta: false,
            is_installed: false,
            is_official: true,
            is_rtl: false,
            local_string_count: 2784,
            name: 'English',
            native_name: 'English',
            plural_code: 'en',
            total_string_count: 2784,
            translated_string_count: 2784,
            translation_url: 'https://translations.telegram.org/en/'
        };
        TdLib.sendQuery({
            '@type': 'getLanguagePackStrings',
            language_pack_id: languageInfo.id || 'en'
        }).then(result=>{
            currentLanguagePack = {};
            result.strings.forEach(string=>{
                currentLanguagePack[string.key] = string;
            });

            authStore.dispatch({ // Force re-render9
                type: 'SET_STATE',
                state: authStore.getState().state
            });
        });
    });
}

function getFormattedText(text){
    const formatted= applyFormatting(text);
    if(formatted.length === 1) return formatted[0];
    return formatted;
}

function applyFormatting(format) {
    var res= [];
    /* eslint-disable-next-line no-constant-condition */
    while(true) {
        if(format.includes('\n')){
            const index= format.indexOf('\n');
            applyFormatting(format.substr(0, index)).forEach(e=>res.push(e));
            res.push(<br/>);
            format= format.substr(index + 1);
        } 
        else if(/\*\*.+\*\*/.test(format)){
            const execed= /\*\*(.+)\*\*/.exec(format);
            applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
            res.push(<strong>{execed[1]}</strong>);
            format= format.substr(execed.index + execed[1].length+4);
        }
        else break;
    }
    return [...res, format];
}

export function formatString(format, params= {}) {
    var res= [];
    while(/{\w+}/.test(format)){
        const execed= /{(\w+)}/.exec(format);
        if(!params[execed[1]]) continue;
        applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
        res.push(params[execed[1]]);
        format= format.substr(execed.index + execed[1].length+2);
    }
    return [...res, ...applyFormatting(format)];
}

// Returns 'zero', 'one', 'two', 'few', 'many' or 'other' depending on the number
function getCountMode(count) {
    if(count === 0) return 'zero';
    if(count === 1) return 'one';
    if(count === 2) return 'two';
    if(count > 2 && count < 10) return 'few';
    if(count >= 10) return 'many';
    return 'other';
}

function getPluralString(mode, callback) {
    switch(mode) {
    case 'zero': return callback('zero') || callback('few') || callback('many') || callback('other');
    case 'one': return callback('one') || callback('other');
    case 'two': return callback('two') || callback('few') || callback('many') || callback('other');
    case 'few': return callback('few') || callback('many') || callback('other');
    case 'many': return callback('many') || callback('other');
    case 'other': return callback('other');
    }
}

/**
 * Returns the localized string for the given language pack string.  
 * Use `__fmt` for formatted strings, or `__pl` for pluralized strings.
 * @example ```js
 * __('lng_menu_settings') // 'Settings'
 * __('lng_error_phone_flood') // 'Sorry, you have deleted and re-created your account too many times recently. Please wait for a few days before signing up again.'
 * ```
 * @param {string} key Language pack string name
 * @returns Localized version of the string
 */
export default function __(key) {
    if(key.includes('#')) {
        return null;
    }
    if(currentLanguagePack) {
        if(currentLanguagePack[key].value['@type'] === 'languagePackStringValueOrdinary') {
            return getFormattedText(currentLanguagePack[key].value.value);
        }
    }

    const languagePack = englishLanguagePack;
    return getFormattedText(languagePack[key]);
}

/**
 * Returns the localized string for the given language pack string, formatted with the given parameters.
 * @example ```js
 * __fmt('lng_menu_settings', {name: 'John'}) // 'John'
 * @param {string} name Language pack string name
 * @param {{[key: string]: string}} params An object containing formatting parameters
 * @returns Localized version of the string, with formattings applied
 */
export function __fmt(name, params) {
    const formatted= formatString(__(name), params);
    if(formatted.length === 1) return formatted[0];
    return formatted;
}

export function __pl(key, count) {
    var callback= null;
    if(currentLanguagePack) {
        if(currentLanguagePack[key].value['@type'] === 'languagePackStringValuePluralized') {
            const pluralized= currentLanguagePack[key].value;
            callback= (mode) => pluralized[mode+'_value'];
        }
    }

    callback=  (mode) => englishLanguagePack[key+'#'+mode];

    const pluralizedString= getPluralString(getCountMode(count), callback);
    const formatted= formatString(pluralizedString, {count});
    if(formatted.length === 1) return formatted[0];
    return formatted;
}
