import { expect } from 'chai'
import MRPTLIB from '@/MRPTLib'

const lib = new MRPTLIB.WS({url:"ws://127.0.0.1:8080"});

describe('core-tests', function() {
  describe('check-connection', function() {
      it('should connect with ws-server on the port 8080 on local host', function() {
        console.log(lib.isConnected);
        lib.on('connection', ()=>console.log('Connected to WS server'));
        lib.on('error', (err)=>console.log('Error connecting',err));
        lib.on('close', ()=>console.log('Connection to ws server closed'));
      });
  })
  describe('check-rpc-calls', function() {
    describe('standard-rpc-calls', function() {
      it('Get RPC List', function() {

      })
    })
    describe('user-defined-rpc-calls', function() {
      it('Add Three Ints', function() {
        const addThreeIntsClient = new MRPTLIB.Service({
          ws : lib,
          name : 'add_three_ints'
        });

        const a = 9, b = 3, c = 10;

        const request = new MRPTLIB.ServiceRequest({
          a,
          b,
          c
        });
        if(lib.isConnected) {
          addThreeIntsClient.callService(request, function(result) {
            expect(result.sum).to.be.eql((a+b+c));
          });
        }
      })
    })
  })

  describe('check topic pub/sub/adv', function() {
    it('should publish',function() {
      const goal = new MRPTLIB.Topic({
        ws : lib,
        name: '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
      });

      const pose = new MRPTLIB.Message({
        linear : {
          x : 0.1,
          y : 0.2,
          z : 0.3
        },
        angular : {
          x : -0.1,
          y : -0.2,
          z : -0.3
        }
      });
      goal.publish(pose);
      goal.unadvertise();
    })
    it('should be able to subscribe to topics', function() {
      const listener1 = new MRPTLIB.Topic({
        ws : lib,
        name : '/path',
        messageType : 'dummy1'
      });

      listener1.subscribe(function(message) {
        console.log('Received message on ' + listener1.name + ' : ',message);
      });
      const listener2 = new MRPTLIB.Topic({
        ws : lib,
        name : '/pose',
        messageType : 'dummy2'
      });
      listener2.subscribe(function(message) {
        console.log('Received message on' + listener2.name + ':', message);
      });
      const listener3 = new MRPTLIB.Topic({
        ws : lib,
        name : '/pose',
        messageType : 'dummy2'
      });
      listener3.subscribe(function(message) {
        console.log('Received message on' + listener3.name + ':', message);
      });
    })
  })
})
