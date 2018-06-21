/**
 * @class Message
 */
export default class Message {
    /**
     * @constructor
     * @param {Object} msg : message to be stored in object
     */
    constructor(msg) {
        Object.assign(this, msg);
    }
}
