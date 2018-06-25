import { expect } from 'chai'
import MRPTLIB from '../src/MRPTLib'
describe('math-ds-tests', function() {

  describe('quaternion', function() {

  })

  describe('transform', function() {

  })

  describe('vector3', function() {
    it('should have default vector3 empty', function() {
      const vec = new MRPTLIB.Vector3();
      expect(vec.x).to.be.eqls(0);
      expect(vec.y).to.be.eqls(0);
      expect(vec.z).to.be.eqls(0);
    })
    it('vector3 addition should work', function() {
      const a = Math.random(), b = Math.random(), c = Math.random();
      const a1 = Math.random(), b1 = Math.random(), c1 = Math.random();
      const vec1 = new MRPTLIB.Vector3({x: a, y: b, z: c});
      const vec2 = new MRPTLIB.Vector3({x: a1, y: b1, z: c1});
      vec1.add(vec2);
      expect(vec1).to.be.eqls(new MRPTLIB.Vector3({x: (a+a1), y: (b+b1), z: (c+c1)}));
    })
    it('should be able to mulitply with quaternion', function() {
      // TO be added
    })
  })

  describe('pose', function() {
    it('should be empty pose', function() {
      const ps = new MRPTLIB.Pose();
      expect(ps.position).to.be.eql(new MRPTLIB.Vector3());
      expect(ps.orientation).to.be.eql(new MRPTLIB.Quaternion());
    })
    it('should be transformed', function() {
      // To be added
    })
  })
})
