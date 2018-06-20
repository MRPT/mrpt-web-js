/**
 * A 3D vector.
 */
export default class Vector3 {
  /**
   * @constructor
   * @param {Object} - with default keys x,y,z
   */
  constructor({x = 0, y = 0, z = 0} = {}) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * Set the values of this vector to the sum of itself
   * and the given vector
   *
   * @param v the vector to add with
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  /**
   * Multiply the given Quaternion with this vector.
   *
   * @param q - the quaternion to multiply with
   */
  multiplyQuaternion(q) {
    var ix = q.w * this.x + q.y * this.z - q.z * this.y;
    var iy = q.w * this.y + q.z * this.x - q.x * this.z;
    var iz = q.w * this.z + q.x * this.y - q.y * this.x;
    var iw = -q.x * this.x - q.y * this.y - q.z * this.z;
    this.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
    this.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
    this.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
  }
  /**
   * Clone a copy of this vector
   *
   * @returns the cloned vector
   */
  clone() {
    return new Vector3(this);
  }
}
