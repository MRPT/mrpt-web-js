/**
 * A ServiceRequest is passed into the service call.
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
