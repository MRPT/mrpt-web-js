import * as THREE from 'three'
export default class CornerXYZSimple extends THREE.AxesHelper {
  /**
   * @constructor
   * @param {Object} options -default is 1
   */
  constructor(options = {}) {
    const size = options.size || 1;
    super(size);
    this.size = size;
    if(options.pose !== undefined) {
      this.setPosition(...pose.position);
      this.setRotationFromQuaternion(new THREE.Quaternion(...pose.orientation));
    }
  }
  /**
   * set the positin of the origin of the corner
   * @param {float} x
   * @param {float} y
   * @param {float} z
   */
  setPosition(x = 0, y = 0, z = 0) {
    this.position.copy(new THREE.Vector3(x, y, z));
  }
  /**
   *
   * @param {float} s - the length of the axes
   */
  setSize(s) {
    let size = this.size;
    if(size !== 0) {
      this.scale(s/size,s/size,s/size);
      this.size = s;
    }
  }
}
