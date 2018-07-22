import * as THREE from 'three'
/**
 * Display static or dynamic path
 * @example
 * let path = new MRPTLIB.model.Path({points: [{x: 1, y:2, z: 0},{x: 2, y:3, z: 0},{x: 4, y:4.5, z: 0}]});
 *
 * // add the path to the scene
 * scene.addObject(path);
 *
 * // change the path (dynamic)
 * path.processMessage({points: [{x: 0, y:1, z: 0},{x: -1, y: -3, z: 0},{x: -4, y: -4.5, z: 0}]});
 *
 * // change the color
 * path.setColor(0x00ff00); // color of path changes to green
 */
export default class Path extends THREE.Line {
  /**
   * @constructor
   * either poses or points need to be specified
   * @param {Array<{points:{x,y,z}}>} poses - poses along the path
   * @param {Array<{x,y,z}>} points - points along the path
   * @param {color} [color = 0xdd11ff] - color of the path
   *
   */
  constructor(options = {}) {
    const color = options.color || 0xdd11ff;
    let geom = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial( { color: color });
    super( geom, material);
    this.processMessage(options);
  }
  /**
   * Set the color of path to given hex value
   *
   * @param {hex} hex - the hex value of color
   */
  setColor(hex) {
    this.material.color.setHex(hex);
  }
  /**
   * Free memory of elements in this marker
   */
  dispose() {
    if (this.geometry !== undefined) {
      this.geometry.dispose();
    }
    if (this.material !== undefined) {
      this.material.dispose();
    }
  }
  /**
   * process the new path data
   * @param {object} message - with the following keys
   * @param {Array<{point: {x,y,z}}>} message.poses - array of poses
   * @param {Array<{x,y,z}>} message.points - array of points
   */
  processMessage(message) {
    // remove previous points in the path
    this.geometry.dispose();
    this.geometry = new THREE.Geometry();
    // add new points to the path (either from array of poses or points)
    if(message.poses !== undefined) {
      for (let i = 0; i < message.poses.length; i++) {
        let v3 = new THREE.Vector3( message.poses[i].point.x, message.poses[i].point.y, message.poses[i].point.z);
        this.geometry.vertices.push(v3);
      }
    } else if(message.points !== undefined) {
      for (let i = 0; i < message.points.length; i++) {
        let v3 = new THREE.Vector3( message.points[i].x, message.points[i].y, message.points[i].z);
        this.geometry.vertices.push(v3);
      }
    }
    this.computeLineDistances();
  }
}
