var expect = require('chai').expect
// var MRPTLib = require('../src/MRPTLib')
import MRPTLIB from '../src/MRPTLib'
describe('MRPT-LIB', function() {
  const lib = new MRPTLIB.WS({url:"ws://127.0.0.1:8080"});
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
})
