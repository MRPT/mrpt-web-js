/**
 * A ServiceRequest is passed into the service call.
 * It acts like a wrapper class for objects.
 * @example
 * import MRPTLIB from 'mrpt-web-js';
 * req = new ServiceRequest(obj);
 */
export default class ServiceRequest {
  /**
   * @constructor
   * @param {Object} values - matching the fields defined in the RPC.
   */
  constructor(values) {
    Object.assign(this, values);
  }
}
