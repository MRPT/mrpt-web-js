import SocketAdapter from './socketAdapter'
import Service from './Service'
import ServiceRequest from './ServiceRequest'
import WebSocket from 'ws'
import {EventEmitter2} from 'eventemitter2'
/**
 * A class for handling websocket connection and sending messages
 * @example
 * import WS from 'mrpt-web-js/src/core/WS.js'
 * ws = new WS('ws://127.0.0.1:5000');
 *
 * // for connecting to a new URL
 * ws.connect('ws://127.0.0.1:9090');
 *
 * // sending a message {object} through connection
 * ws.callOnConnection(message) //queues the message if not connected yet
 *
 * // when the connection is to be closed
 * ws.close();
 *
 * @example
 * import WS from 'mrpt-web-js/src/core/WS.js'
 * // another method for creating
 * ws = new WS();
 * ws.wrap(socket); // socket is a WebSocket instance
 *
 */
export default class WS extends EventEmitter2 {
    /**
     * @constructor
     * @param {?string} url
     */
    constructor({url = null, version = "1.0", transportLibrary = "websocket", transportOptions = {}} = {}) {
        super();
        console.log("Setting up the webconnection...");
        this.socket = null;
        this.idCounter = 0;
        this.isConnected = false;
        /**
         * @type {string} - default "1.0"
         */
        this.version = version;
        /**
         * @type {string} - default library websocket
         */
        this.transportLibrary = transportLibrary;
        /**
         * @type {string} - default empty
         */
        this.transportOptions = transportOptions;
        //Sets unlimited event listeners
        this.setMaxListeners(0);

        // check if the url was given
        // connect if true
        if(url) {
            this.connect(url);
        }
    }
    /**
     * Connect to the specified WebSocket.
     *
     * @param {string} url - WebSocket URL label
     */
    connect(url) {
        this.isConnected = false;
        this.socket = Object.assign(new WebSocket(url), SocketAdapter.socketAdapter(this));
        if (this.socket.readyState !== 'undefined' && this.socket.readyState === 1)
        {
          this.isConnected = true;
        }
    }
    /**
     * Alternate to connect this takes a socket
     * and keeps the reference in the class for making
     * different calls. Only native websocket is supported.
     * @param {WebSocket} $socket
     */
    wrap($socket) {
      this.socket = Object.assign($socket, SocketAdapter.socketAdapter(this));
      if (this.socket.readyState !== 'undefined' && this.socket.readyState === 1)
      {
        this.isConnected = true;
      }
    }
    /**
     * Disconnect from the webserver,
     * closes the websocket connection
     */
    close() {
      if(this.socket) {
        this.socket.close();
      }
    }
    /**
     * Sends the message over the WebSocket, but queues the
     * message if not yet connected
     * @param {object} message - object to be sent by the websocket
     */
    callOnConnection(message) {
      var that  = this;
      var messageJson = JSON.stringify(message);
      var emitter = (msg)=>that.socket.send(msg);

      if(!this.isConnected) {
        that.once('connection',()=>emitter(messageJson));
      }
      else {
        emitter(messageJson);
      }
    }
    /**
     * Retrieves the list of topics being published
     * on the Server machine
     *
     * @param {function} callback - success return the topics
     * @param {function} failedCallback - failure pass the message
    */
    getTopics(callback, failedCallback) {
        let result, message;
        callback(result);
        failedCallback(message);
    }
    /**
     * Retrieves the details of the specific topic.
     *
     * @param {string} topic - topic for which details reqd.
     * @param {function} callback - success
     *                         return the topic details
     * @param {function} failedCallback - failure
     *                         return the failure message
     */
    getTopicDetails(topic, callback, failedCallback) {
        let result, message;
        callback(result);
        failedCallback(message);
    }
    /**
     * Retrieves the list of services being published
     * on the Server machine
     *
     * @param {function} callback - success return the servicess
     * @param {function} failedCallback - failure pass the message
    */
    getServices(callback, failedCallback) {
        let result, message;
        callback(result);
        failedCallback(message);
    }
    /**
     * Retrieves the details of the specific service.
     *
     * @param {string} service - service for which details reqd.
     * @param {function} callback - success
     *                         return the service details
     * @param {function} failedCallback - failure
     *                         return the failure message
     */
    getServiceDetails(service, callback, failedCallback) {
        let result, message;
        callback(result);
        failedCallback(message);
    }
}
