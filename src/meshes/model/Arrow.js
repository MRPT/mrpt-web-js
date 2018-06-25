import * as THREE from 'three'
export default class Arrow extends THREE.Mesh {
  /**
   *
   * @param {Object} options - with possible keys
   * origin - arrow starting coords
   * destination -arrow starting coords
   * headRatio - the ratio of the head of the arrow to its entire length
   * shaft radius - radius of the cylinder part of the arrow
   * head radius - radius of the bottom of the cone part of the arrow
   */
  constructor(options = {}) {
    let origin, destination, direction, headLength;
    if(!options.x0 || !options.y0 || !options.z0)
    {
      origin = new THREE.Vector3(0, 0, 0);
    }
    else {
      origin = new THREE.Vector3(options.x0, options.y0, options.z0);
    }
    if(!options.x1 || !options.y1 || !options.z1)
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
   * @param direction - the direction to set this arrow
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
   * @param length - the new length of the arrow
   */
  setLength(length) {
    this.scale.set(length, length, length);
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
  dispose = function() {
    if (this.geometry !== undefined) {
        this.geometry.dispose();
    }
    if (this.material !== undefined) {
        this.material.dispose();
    }
  };

}
