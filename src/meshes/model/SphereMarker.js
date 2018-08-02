import * as THREE from 'three'
/**
 * Adds a spherical marker at given x,y,z coordinates
 * @example
 * let sphere = new MRPTLIB.model.SphereMarker({x: 1, y: 2.4, z: 3.65, side: 0.2});
 *
 * sphere.setColor(0x00ff00); // sets the color of sphere to green
 *
 * sphere.setSize(1); // sets the radius of sphere
 *
 * sphere.setPosition(new THREE.Vector3(2, 3, 4)); // changes the position of center of cube to given coords
 *
 */
export default class SphereMarker extends THREE.Mesh {
  /**
   * @constructor
   * @param {object} options - with the following keys
   * @param {float} [options.x = 0] - x coord of the position
   * @param {float} [options.y = 0] - y coord of the position
   * @param {float} [options.z = 0] - z coord of the position
   * @param {float} [options.radius = 0.1]
   */
  constructor(options = {}) {
    const x = options.x || 0;
    const y = options.y || 0;
    const z = options.z || 0;
    const radius = options.radius || 0.1;
    let geometry = new THREE.SphereGeometry(radius, 20, 20);
    let m = new THREE.Matrix4();
    geometry.applyMatrix(m);
    let material = new THREE.MeshBasicMaterial( {color : 0x0000ff});
    super(geometry, material);
    this.setPosition(new THREE.Vector3(x, y, z)); // use THREE.Vector3 for setting position
    this.radius = radius;
  }
  /**
   * Set the position for the marker
   * @param {THREE.Vector3} origin
   */
  setPosition(origin) {
    this.position.copy(origin);
  }
  /**
   * Resize the sphere
   * @param {float} radius
   */
  setSize(radius) {
    if (this.radius) {
      this.scale.set(radius / this.radius, radius / this.radius, radius / this.radius);
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
