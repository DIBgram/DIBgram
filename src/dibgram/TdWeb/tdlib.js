import TdClient from 'tdweb';
import {getConfig} from './config';
import '../../remove-item-from-array';

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
            onUpdate: function (update) {
                if(log.log_updates) {
                    console.log('Update: ',update);
                }
                if(TdLib.#updateHandlers[update['@type']]){
                    TdLib.#updateHandlers[update['@type']].forEach(h => h(update));
                }
            }
        });
        return await TdLib.sendQuery({'@type': 'getAuthorizationState'});
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
        TdLib.#updateHandlers.remove(handler);
    }

    /**
     * Send a request to the TdLib instance
     * If the query contains an `@extra` field, the same field will be added to the result
     * @param {import('tdweb').TdObject} query The request to send. Consult TdLib & JSON interface API for help.
     */
    static sendQuery(query) {
        const {log}= getConfig();
        if(log.log_queries) {
            console.log('Query: ',query);
        }
        return TdLib.#tdClient.send(query);
    }
}