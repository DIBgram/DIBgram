import { __fmt } from '../language-pack/language-pack';

/**
 * 
 * @param {import("../TdWeb/td_api").TdApi.td_User} user 
 * @returns 
 */
export function getUserFullName({first_name, last_name}) {
    return last_name ? __fmt('lng_full_name', {first_name, last_name}).join('') : first_name;
}