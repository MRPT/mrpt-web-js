# Core
Used for data transport between client and server using websocket protocol.

* Note: Here remote computer/ server are used to represent a websocket server running on robot. The websocket server should follow [mrpt-web protocol](https://github.com/rachit173/mrpt-web/wiki).
1. Setting a websocket connection with remote server(WS)
```
var ws = new MRPTLIB.WS('ws://127.0.0.1:5000');
ws.connect('ws://127.0.0.1:9090');  // for connecting to a new URL
// sending a message {object} through connection
ws.callOnConnection(message) //queues the message if not connected yet
// when the connection is to be closed
ws.close();
// another method for websocket creation
ws = new MRPTLIB.WS();
var socket = new WebSocket(); // provided by browsers or some other library
ws.wrap(socket); // socket is a WebSocket instance
```

2. Making Service calls to remote server
```
var addThreeIntsClient = new MRPTLIB.Service({
  ws: ws,
  name: 'add_three_ints'
});
var a = 9, b = 3, c = 10;
var request = new MRPTLIB.ServiceRequest({
  a: a,
  b: b,
  c: c
});
addThreeIntsClient.callService(request, function(result) {
  console.log('The sum is ', result.sum);
});
// Service Request wraps the object with
// params for the Remote Procedure Call
// Even if the ws is not connected, the client will queue the message
// to be sent. The message will be sent once connection is established.
```

3. Publishing to Topics
```
// Publish a goal to an autonomous robot
var goal = new MRPTLIB.Topic({
  ws: ws,
  name: '/cmd_vel',
  messageType: 'someMessageType'
});
const pose = new MRPTLIB.Message({
  linear: {
    x: 0.1,
    y: 0.2,
    z: 0.3
  },
  angular: {
    x: -0.1,
    y: -0.2,
    z: -0.3
  }
});
goal.publish(pose);
```

4. Subscribe to Topics
```
var listener = new MRPTLIB.Topic({
  ws: ws,
  name: '/path',
  messageType: 'dummy1'
});
listener.subscribe(function(message) {
  console.log("Received message on" + listener.name + " : ", ,message);
  //process message further
});
```

The requirement on advertising/ unadvertising for publishing depends on the websocket server implemented.
