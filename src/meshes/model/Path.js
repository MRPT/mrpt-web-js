import * as THREE from 'three'
export default class Path extends THREE.Line {
  /**
   * @constructor
   */
  constructor(options = {}) {
    const color = options.color || 0xdd11ff;
    let geom = new THREE.Geometry();
    if(options.poses !== undefined) {
      for (let i = 0; i < options.poses.length; i++) {
        let v3 = new THREE.Vector3( options.poses[i].point.x, options.poses[i].point.y, options.poses[i].point.z);
        geom.vertices.push(v3);
      }
    } else if(options.points !== undefined) {
      for (let i = 0; i < options.points.length; i++) {
        let v3 = new THREE.Vector3( options.points[i].x, options.points[i].y, options.points[i].z);
        geom.vertices.push(v3);
      }
    }
    let material = new THREE.LineBasicMaterial( { color: color });
    super( geom, material);
    this.computeLineDistances();
  }
  /**
   *
   */
}
