import TdLib from './tdlib';
import {getCredentials} from './config';
import {getUseTestDc} from './tdlib';
import version from '../../version';
import TdApi from './td_api';

TdLib.registerUpdateHandler<TdApi.td_updateAuthorizationState>('updateAuthorizationState',function (update) {
    const credentials= getCredentials();
    const auth_state= update['authorization_state'];
    
    if(auth_state['@type']==='authorizationStateWaitEncryptionKey'){
        TdLib.sendQuery({'@type': 'checkDatabaseEncryptionKey', 'encryption_key': ''});
    }
    if(auth_state['@type']==='authorizationStateWaitTdlibParameters'){
        TdLib.sendQuery({
            '@type': 'setTdlibParameters',
            'parameters': ({
                '@type': 'tdlibParameters',
                'database_directory': 'tdlib',
                'use_message_database': true,
                'use_secret_chats': false,
                'api_id': credentials.api_id,
                'api_hash': credentials.api_hash,
                'system_language_code': 'en',
                'device_model': 'Web',
                'application_version': version,
                'enable_storage_optimizer': true,
                'use_test_dc': getUseTestDc()
            } as any)
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
    static givePhoneNumber(number: string): Promise<TdApi.td_error | TdApi.td_ok> {
        return TdLib.sendQuery({'@type': 'setAuthenticationPhoneNumber', 'phone_number': number});
    }
    /**
     * Pass authorization code the user has received
     * @param {string} code The code the user entered
     * @returns TdLib query result
     */
    static checkAuthCode(code: string): Promise<TdApi.td_error | TdApi.td_ok> {
        return TdLib.sendQuery({'@type': 'checkAuthenticationCode', 'code': code});
    }
    /**
     * Pass 2FA password of the account
     * @param {string} pass The password the user entered
     * @returns TdLib query result
     */
    static check2FACode(pass: string): Promise<TdApi.td_error | TdApi.td_ok> {
        return TdLib.sendQuery({'@type': 'checkAuthenticationPassword', 'password': pass});
    }
    /**
     * Sign up to Telegram
     * @param {string} first The first name to be used in the new account
     * @param {string} last Tha last name to be used in the new account
     * @returns TdLib query result
     */
    static registerNewAccount(first: string, last: string): Promise<TdApi.td_error | TdApi.td_ok> {
        return TdLib.sendQuery({'@type': 'registerUser', 'first_name': first, 'last_name': last});
    }
}