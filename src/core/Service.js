import ServiceResponse from './ServiceResponse'
import ServiceRequest from './ServiceRequest'

const EventEmitter2 = require('eventemitter2')
/**
 * A JS Service Client - for making RPC calls (service calls)
 * @example
 * import MRPTLIB from 'mrpt-web-js';
 *
 * const ws = new MRPTLIB.WebSocket({url: 'ws://127.0.0.1:3000'});
 *
 * const addThreeIntsClient = new MRPTLIB.Service({
 *  ws: ws,
 *  name: 'add_three_ints' // name of the remote procedure
 * });
 *
 * const a = 9, b = 3, c = 10;
 *
 * const request = new MRPTLIB.ServiceRequest({
 *  a: a,
 *  b: b,
 *  c: c
 * });
 *
 * addThreeIntsClient.callService(request, function(result) {
 *  console.log('The sum is ', result.sum);
 * });
 *
 * // ServiceRequest wraps the object with
 * // params for the Remote Procedure Call,
 * // Even if the ws is not connected, the client will queue the message
 * // to be sent. The message will be sent once connection is established.
 */
export default class Service extends EventEmitter2 {
    /**
     * @constructor
     * @param {Object} - possible keys include
     *  * ws - the MRPTLib.WS connection handle
     *  * name - the service name, like Playlist.GetItems
     *  * serviceType (optional)
     */
    constructor({ws=null,name=null,serviceType = null}={}) {
      super();
      /**
       * @type {@link WS}
       */
      this.ws = ws;
      /**
       * @type {string} - name of the remote procedure
       */
      this.name = name;
      /**
       * @type {string} - optional, dependant on websocket server
       */
      this.serviceType = serviceType;

      this._serviceCallback = null;
    }
    /**
     * Calls the service. Returns the service response in the
     * callback.
     *
     * @param {object|ServiceRequest} request - the MRPTLIB.ServiceRequest to send
     * @param {function} callback - function with paramsL:
     *    *response - the response from the service request
     * @param {function} failedCallback - the callback function when the service call failed (optiona). Params:
     *    * error - the error message reported by server
     */
    callService(request, callback, failedCallback) {
      const serviceCallId = `call_service:${this.name}:${++this.ws.idCounter}`;

      if(callback || failedCallback) {
        this.ws.once(serviceCallId, (message)=>{
          if (message.result !== undefined && message.result === false) {
            if (typeof failedCallback === 'function') {
              failedCallback(message.result);
            }
          } else if (typeof callback === 'function') {
            callback(message.result); // No Service Response used as it does not support Array
          }
        });
      }

      const call = {
        op : this.name,
        id : serviceCallId,
        v : this.ws.version,
        params : request
      };
      this.ws.callOnConnection(call);
    }

}
