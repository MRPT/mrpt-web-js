import * as THREE from 'three'
/**
 * Adds a cube marker at given x,y,z coordinates
 * @example
 * let cubeMarker = new MRPTLIB.model.CubeMarker({x: 1, y: 2.3, z: 3.45, side: 0.1});
 *
 * cubeMarker.setColor(0xffff00); // sets the color of the marker to yellow
 *
 * cubeMarker.setSize(1); // sets the side of the cube to 1 unit while keeping the center of the cube same
 *
 * cubeMarker.setPosition(new THREE.Vector3(1,2,3)); // changes the position of center of cube to given coords
 */
export default class CubeMarker extends THREE.Mesh {
  /**
   * @constructor
   * @param {object} options - with the following keys
   * @param {float} [options.x = 0] - x coord of the position
   * @param {float} [options.y = 0] - y coord of the position
   * @param {float} [options.z = 0] - z coord of the position
   * @param {float} [options.side = 0.06]
   */
  constructor(options = {}) {
    const x = options.x || 0;
    const y = options.y || 0;
    const z = options.z || 0;
    const side = options.side || 0.06;
    let geometry = new THREE.BoxGeometry(0.06,0.06,0.06);
    let m = new THREE.Matrix4();
    geometry.applyMatrix(m);
    let material = new THREE.MeshBasicMaterial( {color : 0x0000ff});
    super(geometry, material);
    this.setPosition(new THREE.Vector3(x, y, z));
    /**
     * @type {float}
     * @desc stores the initial side value only (value stored during constructor call)
     */
    this.side = side;
  }
  /**
   * Set the position for the marker
   * @param {THREE.Vector3} origin
   */
  setPosition(origin) {
    this.position.copy(origin);
  }
  /**
   * Resize the side of cube marker
   * @param {float} side
   */
  setSize(side) {
    if(this.side) {
      this.scale.set(side/this.side, side/this.side, side/this.side);
    }
  }
  /**
   * Set the color of the marker to given hex value
   *
   * @param {hex} hex - the hex value of color
   */
  setColor(hex) {
    this.material.color.setHex(hex);
  }
  /**
   * Free memory of elements in this marker.
   */
  dispose() {
    if (this.geometry !== undefined) {
      this.geometry.dispose();
    }
    if (this.material !== undefined) {
      this.material.dispose();
    }
  }
}
