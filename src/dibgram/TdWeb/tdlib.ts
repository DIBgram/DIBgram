/* eslint-disable */
import { createTdClient } from './tdweb';
import {getConfig} from './config';
import TdApi from './td_api';

const {log}= getConfig();

let lastUniqueId = 0;

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
    static #updateHandlers: {[key: string]: ([(update: any) => void, number])[]}={};

    /**
     * Creates the instance of Tdweb
     */
    static initializeTdLib() {
        TdLib.#tdClient= createTdClient({
            useDatabase: true,
            instanceName: ( getCurrentSessionId() ) + (getUseTestDc() ? 'test' : 'production'), // e.g. ?account=1&test=1 = '1test' or ?account=1&test=0 = '1production'
            onUpdate: this.handleUpdate
        });
        return TdLib.sendQuery({'@type': 'getAuthorizationState'}); // It both starts TDLib and returns the authorization state
    }

    /**
     * Listen for updates from TdLib
     * @param type The type of the update to listen to. Look for TdLib API docs for types
     * @param handler The function that gets called with the update object when the update is received
     * @returns an ID that can be used to unregister the handler
     */
    static registerUpdateHandler<T extends TdApi.Update>(type: T['@type'], handler: (update: T) => void): number {
        if(TdLib.#updateHandlers[type]===undefined){
            TdLib.#updateHandlers[type]= [];
        }
        const id= ++lastUniqueId;
        TdLib.#updateHandlers[type].push([handler, id]);
        return id;
    }

    /**
     * Remove an existing update handler
     * @param type The type of the update to remove handler from. Look for TdLib API docs for types
     * @param handler The ID of the handler to remove (returned by registerUpdateHandler)
     */
    static unRegisterUpdateHandler<T extends TdApi.Update>(type: T['@type'], handlerId: number): void {
        if(TdLib.#updateHandlers[type]===undefined){
            return;
        }
        TdLib.#updateHandlers[type]= TdLib.#updateHandlers[type].filter(h => h[1]!==handlerId);
    }

    /**
     * Send a request to the TdLib instance
     * If the query contains an `@extra` field, the same field will be added to the result
     * @param query The request to send. Consult TdLib & JSON interface API for help.
     * @returns The result of the request
     */
    static sendQuery<T extends TdApi.TdFunction>(query: T): Promise<TdApi.TdFunctionReturn<T>> {
        if(log.log_queries && query['@type']!=='setTdlibParameters') {
            console.log('Query: ',query);
        }
        return new Promise((resolve, reject) => {
            TdLib.#tdClient.send(query).then((result: TdApi.TdFunctionReturn<T>)=> {
                if(log.log_queries) {
                    console.log('Query result: ', result);
                }
                resolve(result);
            }, (error: TdApi.Error)=> {
                if(log.log_queries) {
                    console.warn('Query failed: ', error);
                }
                reject(error);
            }
            );
        });
    }

    /**
     * Handles a TDLib update
     */
    static handleUpdate(update: TdApi.Update) {
        if(log.log_updates) {
            console.log('Update: ',update);
        }
        if(TdLib.#updateHandlers[update['@type']]){
            TdLib.#updateHandlers[update['@type']].forEach(h => h[0](update));
        }
    }
}