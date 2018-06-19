import SocketAdapter from './socketAdapter'
import Service from './Service'
import ServiceRequest from './ServiceRequest'

const WebSocket = require('ws');
const EventEmitter2 = require('eventemitter2').EventEmitter2;
export default class WS extends EventEmitter2 {
    /**
     * @constructor
     * @param {string} url
     */
    constructor({url = null, version = "1.0", transportLibrary = "websocket", transportOptions = {}} = {}) {
        super();
        console.log("Setting up the webconnection...");
        this.socket = null;
        this.idCounter = 0;
        this.isConnected = false;
        this.version = version;
        this.transportLibrary = transportLibrary;
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
        this.socket = Object.assign(new WebSocket(url), SocketAdapter.socketAdapter(this));
    }
    /**
     * Disconnect from the webserver
     */
    close() {
      if(this.socket) {
        this.socket.close();
      }
    }
    /**
     * Sends the message over the WebSocket, but queues the
     * message if not yet connected
     * @param {object} message
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
