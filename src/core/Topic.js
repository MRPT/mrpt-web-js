import Message from './Message'

const EventEmitter2 = require('eventemitter2').EventEmitter2
/**
 * Publish and/or subscribe to a topic in mrpt-web server.
 *
 * Emits the following events:
 *  * 'warning' - if there are any warning during the Topic creation
 *  * 'message' - the message data from server
 * @example
 * import MRPTLIB from 'mrpt-web-js';
 * ws = new MRPTLIB.WS({url: 'ws://127.0.0.1:3000'});
 *
 * var goal = new MRPTLIB.Topic({
 *  ws: ws,
 *  name: '/cmd_vel',
 *  messageType: 'someMessageType'
 * });
 *
 * const pose  = new MRPTLIB.Message({
 *  linear: {
 *    x: 0.1,
 *    y: 0.2,
 *    z: 0.3,
 *  },
 *  angular: {
 *    x: -0.1,
 *    y: -0.2,
 *    z: -0.3
 *  }
 * });
 *
 * goal.publish(pose);
 * // advertise and unadvertise requirement is dependant
 * // on the websocket server.
 * @example
 * const listener = new MRPTLIB.Topic({
 *  ws: ws,   // same as previous example
 *  name: '/path',
 *  messageType: 'dummy1'
 * });
 *
 * listener.subscribe(function(message) {
 *  console.log("Received message on" + listener.name + ' : ', message);
 * });
 *
 * // Here the message will be logged as when received from the
 * // websocket server
 */
export default class Topic extends EventEmitter2 {
  /**
   * @constructor
   * @param {object} - object with the following keys
   *  * ws - the MRPTLIB.WS connection handle
   *  * name - the topic name, like /cmd_vel
   *  * messageType - the message type, like 'std_msgs/String'
   *  * compression - the type of compression to use, like 'png'
   *  * throttle_rate - the rate (in ms in between messages) at which to throttle the topics
   *  * queue_size - the queue created at server side used when subscribing (defaults to 100).
   *  * latch - latch the topic when publishing
   *  * queue_length - the queue legth at server side used when subscribing (defaults to true)
   *  * reconnect_on_close - the flag to enable resubscription and readvertisement on close event(defaults to true).
   */
  constructor({
    ws,
    name,
    messageType,
    isAdvertised = false,
    compression = 'none',
    throttle_rate = 0,
    latch = false,
    queue_size = 100,
    queue_length = 0,
    reconnect_on_close = true
  }) {
    super();
    this.ws = ws;
    this.name = name;
    this.messageType = messageType;
    this.isAdvertised = isAdvertised;
    this.compression = compression;
    this.throttle_rate = throttle_rate;
    this.latch = latch;
    this.queue_length = queue_length;
    this.queue_size = queue_size;
    this.reconnect_on_close = reconnect_on_close;

    // Check for valid compression type
    // Currently no compression is supported
    if (this.compression && this.compression !== 'none') {
      this.emit('warning', this.compression +
      'compression is not supported. No compression will be used');
    }

    // Check if the throttle rate is negative
    if (this.throttle_rate < 0) {
      this.emit('warning', this.throttle_rate + 'is not allowed. Set to 0.');
      this.throttle_rate = 0;
    }

    const that = this;
    if(this.reconnect_on_close) {
      this.callForSubscribeAndAdvertise = function(message) {
        that.ws.callOnConnection(message);

        that.waitForReconnect = false;
        that.reconnectFunc = function() {
          if(!that.waitForReconnect) {
            that.waitForReconnect = true;
            that.ws.callOnConnection(message);
            that.ws.once('connection', function() {
              that.waitForReconnect = false;
            });
          }
        };
        that.ws.on('close', that.reconnectFunc);
      };
    }
    else {
      this.callForSubscribeAndAdvertise = this.ws.callOnConnection;
    }

    this._messsageCallback = function(data) {
      that.emit('message', new Message(data));
    };
  }
  /**
   * Everytime a message is published for the given topic, the callback
   * will be called with the message object
   *
   * @param {function} callback - function with the following params:
   *  * message - the published message
   */
  subscribe(callback) {
    if (typeof callback === 'function') {
      this.on('message',callback);
    }

    if(this.subscribeId) { return; }
    this.ws.on(this.name, this._messsageCallback);
    this.subscribeId = `subscribe:${this.name}:${++this.ws.idCounter}`;

    this.callForSubscribeAndAdvertise({
      op: 'Subscriber.subscribe',
      id: this.subscribeId,
      v: this.ws.version,
      params: {
        type: this.messageType,
        topic: this.name,
        compression: this.compression,
        throttle_rate: this.throttle_rate,
        queue_length: this.queue_length
      }
    });
  }
  /**
   * Unregisters as a subscriber for the topic. Unsubscribing stop remove
   * all subscribe callbacks. To remove a callback, you must explicitly
   * pass the callback function in.
   *
   * @param {function} callback - the optional callback to unregister, if
   *  * provided and other listeners are registered the topic won't
   *  * unsubscribe, just stop emitting to the passed listener
   */
  unsubscribe(callback) {
    if (callback) {
      this.off('message', callback);
      // If there is any other callbacks still subscribed don't
      // unsubscribe
      if(this.listeners('message').length) { return; }
    }
    if (!this.subscribeId) { return; }
    // Note: Don't call this.removeAllListeners, allow client to handle that themselves
    this.ws.off(this.name, this._messsageCallback);
    if(this.reconnect_on_close) {
      this.ws.off('close', this.reconnectFunc);
    }
    this.emit('unsubscribe');
    this.ws.callOnConnection({
      op: 'Subscriber.unsubscribe',
      id: this.subscribeId,
      v: this.ws.version,
      params:{
        topic: this.name
      }
    });
    this.subscribeId = null;
  }
  /**
   * Registers as a publisher for the topic.
   */
  advertise() {
    if (this.isAdvertised) {
      return;
    }
    this.advertiseId = `advertise:${this.name}:${++this.ws.idCounter}`;
    this.callForSubscribeAndAdvertise({
      op: 'Publisher.advertise',
      id: this.advertiseId,
      params:
      {
        type: this.messageType,
        topic: this.name,
        latch: this.latch,
        queue_size: this.queue_size
      }
    });
    this.isAdvertised = true;

    if(!this.reconnect_on_close) {
      const that = this;
      this.ws.on('close', function() {
        that.isAdvertised = false;
      });
    }
  }
  /**
   * Unregisters as a publisher for the topic
   */
  unadvertise() {
    if(!this.isAdvertised) {
      return;
    }
    if(this.reconnect_on_close) {
      this.ws.off('close', this.reconnectFunc);
    }
    this.emit('unadvertise');
    this.ws.callOnConnection({
      op: 'Publisher.unadvertise',
      id: this.advertiseId,
      params: {
        topic: this.name
      }
    });
    this.isAdvertised = false;
  }
  /**
   * Publish the message.
   *
   * @param {object} message - JSON object or MRPTLIB.Message object
   */
  publish(message) {
    if(!this.isAdvertised) {
      this.advertise();
    }

    const call = {
      op : 'Publish',
      id : `publish:${this.name}:${++this.ws.idCounter}`,
      v : this.ws.version,
      params : {
        topic : this.name,
        message : message,
        latch : this.latch
      }
    };
    this.ws.callOnConnection(call);
  }
}
