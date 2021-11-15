import { authStore } from '../auth/auth-screen';
import TdLib from '../TdWeb/tdlib';
import englishLanguagePack from './english.json';
import { applyKeys, formatString, getCountMode, getFormattedText, getPluralString } from './string-format';
import specialStringsEnglish from './special-strings/en.json';

var currentLanguagePack= null;
var specialStrings= specialStringsEnglish;

export function initLanguagePack(){
    const languageInfo= getCurrentLanguagePack();

    const specialStringsCache= localStorage.getItem('dibgram-special-language-strings-cache');
    if(specialStringsCache){
        specialStrings= JSON.parse(specialStringsCache)[languageInfo.id] || specialStringsEnglish;
    }
    console.log('initLanguagePack');
    TdLib.sendQuery({
        '@type': 'setOption', 
        'name': 'localization_target', 
        'value': {
            '@type': 'optionValueString', 
            value: 'tdesktop'
        }
    }).then(()=>{
        TdLib.sendQuery({
            '@type': 'getLanguagePackStrings',
            language_pack_id: languageInfo.id || 'en'
        }).then(result=>{
            currentLanguagePack = {};
            result.strings.forEach(string=>{
                currentLanguagePack[string.key] = string;
            });

            authStore.dispatch({ // Force re-render
                type: 'SET_STATE',
                state: authStore.getState().state
            });
        });
    });
}

/**
 * Gets the language pack info for the selected language
 * @param {boolean} englishIsDefault If true, returns english if the user didn't set a language
 * @returns {import('../TdWeb/td_api').TdApi.td_LanguagePackInfo|null} Language pack object
 */
export function getCurrentLanguagePack(englishIsDefault= true) {
    let languageInfo= localStorage.getItem('dibgram-active-language');
    if(languageInfo) languageInfo= JSON.parse(languageInfo);
    if((!languageInfo) && englishIsDefault) languageInfo= {
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
    return languageInfo;
}

export function getRtlMode() {
    return (localStorage.getItem('dibgram-allow-rtl-layout') == 'true') && (getCurrentLanguagePack(false)?.is_rtl || false);
}

/**
 * Returns the localized string for the given language pack string.  
 * Use `__fmt` for formatted strings, or `__pl` for pluralized strings.
 * @example ```js
 * __('lng_menu_settings') // 'Settings'
 * __('lng_error_phone_flood') // 'Sorry, you have deleted and re-created your account too many times recently. Please wait for a few days before signing up again.'
 * ```
 * @param {string} key Language pack string name
 * @returns {string | React.ReactNode[]} Localized version of the string
 */
export default function __(key) {
    if(currentLanguagePack) {
        const languagePackString= currentLanguagePack[key].value;
        if(languagePackString['@type'] === 'languagePackStringValueOrdinary') {
            return getFormattedText(languagePackString.value);
        }
    }

    const languagePack = englishLanguagePack;
    return getFormattedText(languagePack[key]);
}

/**
 * Returns the localized string for the given language pack string, formatted with the given parameters.
 * @example 
 * ```js
 * __fmt('lng_menu_settings', {name: 'John'}) // 'John'
 * ```
 * @param {string} name Language pack string name
 * @param {{[key: string]: string}} params An object containing formatting parameters
 * @returns Localized version of the string, with formattings applied
 */
export function __fmt(name, params, useFragments= true) {
    return  formatString(__(name), params).map(useFragments? applyKeys : e=>e);
}

export function __pl(key, count, params={}) {
    var callback= null;
    if(currentLanguagePack) {
        if(currentLanguagePack[key].value['@type'] === 'languagePackStringValuePluralized') {
            const pluralized= currentLanguagePack[key].value;
            callback= (mode) => pluralized[mode+'_value'];
        }
    }
    else callback=  (mode) => englishLanguagePack[key+'#'+mode];

    const pluralizedString= getPluralString(getCountMode(count), callback);
    const formatted= formatString(pluralizedString, {count, ...params});
    if(formatted.length === 1) return formatted[0];
    return formatted.map(applyKeys);
}

/**
 * Formats an array of objects in the format `A, B, C and D`
 * Uses the format strings given as the parameters to do the formatting.
 * The default values for the strings are `{accumulated}, {user}` and `{accumulated} and {user}`
 * 
 * @param {boolean} isInvite If true, the value of the strings `lng_action_invite_users_and_one` and `lng_action_invite_users_and_last` will be used. Otherwise, `lng_action_add_users_and_one` and `lng_action_add_users_and_last` will be used.
 * @param {React.ReactNode[]} users An array of objects to format
 * @param {boolean} usesReact If true, the result will be returned as an array of objects, each wrapped in a React Fragment. If false, the result will be returned as a string.
 */
export function __collection(isInvite, users, usesReact= false, getLPString= __) {
    if(users.length == 1) return users[0];

    const format= getLPString(isInvite? 'lng_action_invite_users_and_one' : 'lng_action_add_users_and_one');
    const formatLast= getLPString(isInvite? 'lng_action_invite_users_and_last' : 'lng_action_add_users_and_last');

    var result= [users[0]];
    for(let i= 1; i < users.length - 1; i++) {
        const user= users[i];
        result= formatString(format, {accumulated: result, user}).flat();
    }
    result= formatString(formatLast, {accumulated: result, user: users[users.length - 1]}).flat();
    return usesReact? result.map(applyKeys) : result.join('');
}

export function _s__(key) {
    return specialStrings[key];
}

export function _s__fmt(key, params, useFragments= true) {
    return formatString(_s__(key), params).map(useFragments? applyKeys : e=>e);
}

// export function _s__pl(key, count, params={}) {
// }

export function _s__collection(isInvite, users, usesReact) {
    return __collection(isInvite, users, usesReact, _s__);
}
