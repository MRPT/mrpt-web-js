import * as THREE from 'three'
/**
 * Arrow is used to indicate the position and orientation (or direction) of a body.
 * It can be used as a stationary marker
 * or used to depict a moving body
 * @example
 * // to depict a moving body
 * arrow = new MRPTLIB.model.Arrow();
 *
 * // add arrow to the scene
 * scene.addObject(arrow);
 *
 * // process messages
 * arrow.processMessage({position: {x: 1,y: 2, z: 3}, orientation: {x: 0.3, y: 0.6, z: 7}});
 *
 * // The processMessage can be used in a loop or with event emitter
 * // to process the position and orientation whenever a change is emitted
 *
 * @example
 * // as a stationary object
 * arrow = new MRPTLIB.model.Arrow({x0:0.3,y0:0.4,z0:0.5, x1:2,y1:2.4,z1:4.2});
 * // x0,y0,z0 are the origin keys and x1,y1,z1 are destination keys
 *
 * // add arrow to the scene
 * scene.addObject(arrow);
 *
 * // processMessage can still be used, among other member functions
 */
export default class Arrow extends THREE.Mesh {
  /**
   *
   * The arrow starts from the origin coordinates. It extends and points to the destination coordinate.
   * @param {?object} options - with possible keys
   * @param {?object} options.origin - format: {x0,y0,z0} arrow starting coords, default {x0:0,y0:0,z0:0}
   * @param {?object} options.destination - format: {x1,y1,z1} arrow destination coords, default {x1:1,y1:0,z1:0}
   * @param {?number} options.headRatio - the ratio of the head of the arrow to its entire length, default: head length is kept fixed as 0.2
   * @param {?number} options.shaftRadius - radius of the cylinder part of the arrow
   * @param {?number} options.headRadius - radius of the bottom of the cone part of the arrow
   */
  constructor(options = {}) {
    let origin, destination, direction, headLength;
    if(options.x0 === undefined || options.y0 === undefined || options.z0 === undefined)
    {
      origin = new THREE.Vector3(0, 0, 0);
    }
    else {
      origin = new THREE.Vector3(options.x0, options.y0, options.z0);
    }
    if(options.x1 === undefined || options.y1 === undefined || options.z1 === undefined)
    {
      destination = new THREE.Vector3(1, 0, 0);
    }
    else {
      destination = new THREE.Vector3(options.x1, options.y1, options.z1);
    }

    if(origin === destination) {
      direction = new Vector3(1,0,0);
      direction.normalize();
    }
    else {
      direction = destination.clone().sub(origin);
      direction.normalize();
    }
    if(options.headRatio){
      headLength = options.headRatio * destination.clone.sub(origin).length();
    }
    else {
      headLength = 0.2;
    }
    const shaftRadius = options.smallRadius || 0.025;
    const headRadius = options.largeRadius || 0.05;
    const shaftLength = destination.clone().sub(origin).length() - headLength;
    let material = options.material || new THREE.MeshBasicMaterial({color: 0xff0000});
    // create and merge the geometries
    let geometry = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLength, 12, 1);
    let m = new THREE.Matrix4();
    m.setPosition(new THREE.Vector3(0, shaftLength*0.5, 0));
    geometry.applyMatrix(m);

    //create the head
    let coneGeometry = new THREE.CylinderGeometry(0, headRadius, headLength, 12 , 1);
    m.setPosition(new THREE.Vector3(0, shaftLength + (headLength * 0.5),0));
    coneGeometry.applyMatrix(m);

    //put the arrow together/
    geometry.merge(coneGeometry);

    super(geometry, material);
    this.length = destination.clone().sub(origin).length();
    this.setPosition(origin);
    this.setDirection(direction);
  }
  /**
   * Set the start position of the arrow
   *
   * @param {THREE.Vector3} origin
   */
  setPosition(origin) {
    this.position.copy(origin);
  }
  /**
   * Set the direction of this arrow to that of the given vector.
   *
   * @param {THREE.Vector3} direction - the direction to set this arrow
   */
  setDirection(direction) {
    let axis = new THREE.Vector3(0, 1, 0).cross(direction);
    let radians = Math.acos(new THREE.Vector3(0, 1, 0).dot(direction.clone().normalize()));
    this.matrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians);
    this.rotation.setFromRotationMatrix(this.matrix, this.rotation.order);
  }
  /**
   * Set this arrow to be the given length.
   *
   * @param {number} length - the new length of the arrow
   */
  setLength(length) {
    if(this.length) {
      this.scale.set(length/this.length, length/this.length, length/this.length);
      this.length = length;
    }
  };

  /**
   * Set the color of this arrow to the given hex value.
   *
   * @param hex - the hex value of the color to use
   */
  setColor(hex) {
    this.material.color.setHex(hex);
  };

  /*
  * Free memory of elements in this marker.
  */
  dispose() {
    if (this.geometry !== undefined) {
        this.geometry.dispose();
    }
    if (this.material !== undefined) {
        this.material.dispose();
    }
  };
  /**
   *
   * @param {object} message - with the following keys
   * @param {object} position - {x,y,z} , contains the coordinateds of the starting of arrow (base of cyliner)
   * @param {object} orientation - {x,y,z}, contains the direction vector of the arrow
   * @param {?number} length - length of the arrow
   */
  processMessage(message) {
    let x = message.position.x;
    let y = message.position.y;
    let z = message.position.z;
    this.setPosition(new THREE.Vector3(x, y, z));
    x = message.orientation.x;
    y = message.orientation.y;
    z = message.orientation.z;
    this.setDirection(new THREE.Vector3(x, y, z));
    if (message.length) {
      this.setLength(message.length);
    }
  }
}
