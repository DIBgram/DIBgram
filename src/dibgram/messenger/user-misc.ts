import { __fmt } from '../language-pack/language-pack';
import TdApi from '../TdWeb/td_api';

export function getUserFullName({first_name, last_name}: TdApi.td_user): string {
    return last_name ? __fmt('lng_full_name', {first_name, last_name}, false).join('') : first_name;
}