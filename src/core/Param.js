/**
 * @class Param
 * @todo: might be used in future for wrapping Param Object
 *        for providing extended functionality, compression, defalte etc.
 */
export default class Param {
  /**
   * @constructor
   * @param {object} params - contains the params to be sent in a message
   */
  constructor(params = {}) {
    this.params = params;
  }
}
