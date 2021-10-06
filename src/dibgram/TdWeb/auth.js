import TdLib from './tdlib';
import {getCredentials} from './config';
import {getUseTestDc} from './tdlib';
import version from '../../version';

TdLib.registerUpdateHandler('updateAuthorizationState',function (update) {
    const credentials= getCredentials();
    const auth_state= update['authorization_state'];
    
    if(auth_state['@type']==='authorizationStateWaitEncryptionKey'){
        TdLib.sendQuery({'@type': 'checkDatabaseEncryptionKey', 'encryption_key': ''});
    }
    if(auth_state['@type']==='authorizationStateWaitTdlibParameters'){
        TdLib.sendQuery({
            '@type': 'setTdlibParameters',
            'parameters': {
                'database_directory': 'tdlib',
                'use_message_database': true,
                'use_secret_chats': true,
                'api_id': credentials.api_id,
                'api_hash': credentials.api_hash,
                'system_language_code': 'en',
                'device_model': 'Web',
                'application_version': version,
                'enable_storage_optimizer': true,
                'use_test_dc': getUseTestDc(),
            }
        });
    }
});

/**
 * Provides functions to pass required authorization data to Telegram
 */
export default class Auth {
    /**
     * Pass phone number of the account to be logged in to
     * @param {string} number The phone number the user entered
     * @returns TdLib query result
     */
    static async givePhoneNumber(number) {
        return await TdLib.sendQuery({'@type': 'setAuthenticationPhoneNumber', 'phone_number': number});
    }
    /**
     * Pass authorization code the user has received
     * @param {string} code The code the user entered
     * @returns TdLib query result
     */
    static async checkAuthCode(code) {
        return await TdLib.sendQuery({'@type': 'checkAuthenticationCode', 'code': code});
    }
    /**
     * Pass 2FA password of the account
     * @param {string} pass The password the user entered
     * @returns TdLib query result
     */
    static async check2FACode(pass) {
        return await TdLib.sendQuery({'@type': 'checkAuthenticationPassword', 'password': pass});
    }
    /**
     * Sign up to Telegram
     * @param {string} first The first name to be used in the new account
     * @param {string} last Tha last name to be used in the new account
     * @returns TdLib query result
     */
    static async registerNewAccount(first, last) {
        return await TdLib.sendQuery({'@type': 'registerUser', 'first_name': first, 'last_name': last});
    }
}