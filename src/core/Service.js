import ServiceResponse from './ServiceResponse'
import ServiceRequest from './ServiceRequest'

const EventEmitter2 = require('eventemitter2')
/**
 * A JS Service Client
 *
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
      this.ws = ws;
      this.name = name;
      this.serviceType = serviceType;

      this._serviceCallback = null;
    }
    /**
     * Calls the service. Returns the service response in the
     * callback.
     *
     * @param request - the MRPTLIB.ServiceRequest to send
     * @param callback - function with paramsL:
     *    *response - the response from the service request
     * @param failedCallback - the callback function when the service call failed (optiona). Params:
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
            callback(new ServiceResponse(message.result));
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
