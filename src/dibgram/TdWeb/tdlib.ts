/* eslint-disable */
import { createTdClient } from './tdweb';
import {getConfig} from './config';
import TdApi from './td_api';
import removeItemFromArray from '../../remove-item-from-array';
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
    static #tdClient: any;
    /** @type {[string: Array<Function>]} */
    static #updateHandlers: {[key: string]: ((update: TdApi.td_Update) => void)[]}={};

    /**
     * Creates the instance of Tdweb
     */
    static async initializeTdLib() {
        const {log}= getConfig();
        TdLib.#tdClient= createTdClient({
            useDatabase: true,
            instanceName: ( getCurrentSessionId() ) + (getUseTestDc() ? 'test' : 'production'), // e.g. ?account=1&test=1 = '1test' or ?account=1&test=0 = '1production'
            onUpdate: function (update: TdApi.td_Update) {
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
    static registerUpdateHandler(type: string, handler: (update: TdApi.td_Update) => void) {
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
    static unRegisterUpdateHandler(type: string, handler: (update: TdApi.td_Update) => void) {
        if(TdLib.#updateHandlers[type]===undefined){
            return;
        }
        removeItemFromArray.call(TdLib.#updateHandlers[type], handler);
    }

    /**
     * Send a request to the TdLib instance
     * If the query contains an `@extra` field, the same field will be added to the result
     * @param query The request to send. Consult TdLib & JSON interface API for help.
     * @returns The result of the request
     */
    static sendQuery<T extends TdApi.TdFunction>(query: T): Promise<TdApi.TdFunctionReturn<T> | TdApi.td_Error> {
        const {log}= getConfig();
        if(log.log_queries) {
            console.log('Query: ',query);
        }
        return new Promise((resolve, reject) => {
            TdLib.#tdClient.send(query).then((result: TdApi.TdFunctionReturn<T>)=> {
                if(log.log_queries) {
                    console.log('Query result: ', result);
                }
                resolve(result);
            }, (error: TdApi.td_Error)=> {
                if(log.log_queries) {
                    console.error('Query failed: ', error);
                }
                reject(error);
            }
            );
        });
    }
}