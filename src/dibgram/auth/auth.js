import TdLib from '../TdWeb/tdlib';
import {getCredentials, getConfig} from '../TdWeb/config';

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
                'application_version': '0.0.1',
                'enable_storage_optimizer': true,
                'use_test_dc': getConfig().use_test_dc,
            }
        });
    }
});

export default class {
    static async givePhoneNumber(number) {
        return await TdLib.sendQuery({'@type': 'setAuthenticationPhoneNumber', 'phone_number': number});
    }
    static async checkAuthCode(code) {
        return await TdLib.sendQuery({'@type': 'checkAuthenticationCode', 'code': code});
    }
    static async check2FACode(pass) {
        return await TdLib.sendQuery({'@type': 'checkAuthenticationPassword', 'password': pass});
    }
    static async registerNewAccount(first, last) {
        return await TdLib.sendQuery({'@type': 'registerUser', 'first_name': first, 'last_name': last});
    }
}