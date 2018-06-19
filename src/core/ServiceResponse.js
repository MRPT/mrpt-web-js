/**
 * A ServiceResponse is returned from the service call.
 *
 */
export default class ServiceReponse {
  /**
   * @constructor
   * @param {Object} values - matching the fiels defined in the RPC.
   */
  constructor(values) {
    Object.assign(this, values);
  }
}
