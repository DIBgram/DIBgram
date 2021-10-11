import TdClient from 'tdweb';
import {getConfig} from './config';

export function getUseTestDc() {
    var urlPar=new URL(window.location.href).searchParams.get('test');
    if(urlPar){
        return urlPar==='1' || urlPar==='true';
    }
    return false;
}

export function getCurrentSessionId() {
    return new URL(window.location.href).searchParams.get('account') || '1';
}

/**
 * Provides options to communicate with the Tdweb library
 */
export default class TdLib {
    /** @type TdClient */
    static #tdClient;
    /** @type {[string: Array<Function>]} */
    static #updateHandlers={};

    /**
     * Creates the instance of Tdweb
     */
    static async initializeTdLib() {
        const {log}= getConfig();
        TdLib.#tdClient= new TdClient({
            useDatabase: true,
            instanceName: ( getCurrentSessionId() ) + (getUseTestDc() ? 'test' : 'production'), // e.g. ?account=1&test=1 = '1test' or ?account=1&test=0 = '1production'
            onUpdate: function (update) {
                if(log.log_updates) {
                    console.log('Update: ',update);
                }
                if(TdLib.#updateHandlers[update['@type']]){
                    TdLib.#updateHandlers[update['@type']].forEach(h => h(update));
                }
            }
        });
        return await TdLib.sendQuery({'@type': 'getAuthorizationState'}); // It both starts TDLib and returns the authorization state
    }

    /**
     * Listen for updates from TdLib
     * @param {string} type The type of the update to listen to. Look for TdLib API docs for types
     * @param {Function} handler The function that gets called with the update object when the update is received
     */
    static registerUpdateHandler(type, handler) {
        if(TdLib.#updateHandlers[type]===undefined){
            TdLib.#updateHandlers[type]= [];
        }
        TdLib.#updateHandlers[type].push(handler);
    }

    /**
     * Remove an existing update handler
     * @param {string} type The type of the update to remove handler from. Look for TdLib API docs for types
     * @param {Function} handler The handler to remove
     */
    static unRegisterUpdateHandler(type, handler) {
        if(TdLib.#updateHandlers[type]===undefined){
            return;
        }
        TdLib.#updateHandlers[type].remove(handler);
    }

    /**
     * Send a request to the TdLib instance
     * If the query contains an `@extra` field, the same field will be added to the result
     * @param {import('tdweb').TdObject} query The request to send. Consult TdLib & JSON interface API for help.
     * @returns {Promise<import('tdweb').TdObject | import('tdweb').TdError>} The result of the request
     */
    static sendQuery(query) {
        const {log}= getConfig();
        if(log.log_queries) {
            console.log('Query: ',query);
        }
        return new Promise((resolve, reject) => {
            TdLib.#tdClient.send(query).then(result=> {
                if(log.log_queries) {
                    console.log('Query result: ', result);
                }
                resolve(result);
            }, error=> {
                if(log.log_queries) {
                    console.error('Query failed: ', error);
                }
                reject(error);
            }
            );
        });
    }
}