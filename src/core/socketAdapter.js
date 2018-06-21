const WebSocket = require('ws');
/**
 * Events listener for a WebSocket to a JS Client.
 * Sets up Messages for a given topic to trigger
 * an event on JS client.
 * @namespace socketAdapter
 * @private
 */
export default class SocketAdapter{
  static socketAdapter(client) {
    /**
     * Handles the incoming json object according
     * to the op code.
     * The op code determines the action the incoming
     * message wants to perform on the JS client.
     * @param {Object} message
     */
    function handleMessage(message) {
      if (message.op === 'publish') {
        client.emit(message.topic, message.msg);
      } else if (message.op === 'service_response') {
        client.emit(message.id, message);
      } else if (message.op === 'call_service') {
        client.emit(message.service, message);
      } else if (message.op === 'status') {
        if(message.id) {
          client.emit(`status:${message.id}`, message);
        } else {
          client.emit('status',message);
        }
      }
    }
    /**
     * Checks and converts binary data to necessary format
     * if needed, then passes data to the callback
     * @param {Object} message
     * @param {Function} callback
     */
    function handleData(message, callback) {
      if (message.op === '#some particular blob type') {

      } else {
        callback(message);
      }
    }
    return {
      /**
       * Emits a 'connection' event on WebSocket connection.
       *
       * @param event - the argument to emit with the event
       * @memberof socketAdapter
       */
      onopen(event) {
        client.isConnected = true;
        client.emit('connection',event);
      },

      /**
       * Emits a 'close' event on WebSocket disconnection.
       *
       * @param event - the argument to emit with the event
       * @memberof socketAdapter
       */
      onclose(event) {
        client.isConnected = false;
        client.emit('close', event);
      },

      /**
       * Emits an 'error' event whenever there was an error.
       *
       * @param event - the argument to emit with the event
       * @memberof SocketAdapter
       */
      onerror(event) {
        client.emit('emit', event);
      },

      /**
       * Parses message responses from server and sends to the
       * appropriate topic, service, or param.
       *
       * @param message - the raw JSON message from server.
       * @memberof socketAdapter
       */
      onmessage(data) {
        if(typeof Blob !== 'undefined' && data.data instanceof Blob) {
          /**
           * To be Added Blob decode code
           */
          const message = data;
          handleData(message, handleMessage);
        } else {
          const message = JSON.parse(typeof data === 'string' ? data : data.data);
          handleData(message, handleMessage);
        }
      }
    };
  }
}
