/**
 * A Quaternion.
 */
 /**  @constructor
 *  @param options - object with following keys:
 *   * x - the x value
 *   * y - the y value
 *   * z - the z value
 *   * w - the w value
 */
export default class Quaternion {
  /**
   * @constructor
   * @param {Object} - keys include x, y, z, w
   */
  constructor({x = 0, y = 0, z = 0, w = 1} = {}) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = (typeof w === 'number') ? w : 1;
  }

  /**
   * Perform a conjugation on this quaternion.
   */
  conjugate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
  }

  /**
   * Return the norm of this quaternion.
   */
  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  /**
   * Perform a normalization on this quaternion.
   */
  normalize() {
    var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (l === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 1;
    } else {
      l = 1 / l;
      this.x = this.x * l;
      this.y = this.y * l;
      this.z = this.z * l;
      this.w = this.w * l;
    }
  }

  /**
   * Convert this quaternion into its inverse.
   */
  invert() {
    this.conjugate();
    this.normalize();
  }

  /**
   * Set the values of this quaternion to the product of itself and the given quaternion.
   *
   * @param q the quaternion to multiply with
   */
  multiply(q) {
    var newX = this.x * q.w + this.y * q.z - this.z * q.y + this.w * q.x;
    var newY = -this.x * q.z + this.y * q.w + this.z * q.x + this.w * q.y;
    var newZ = this.x * q.y - this.y * q.x + this.z * q.w + this.w * q.z;
    var newW = -this.x * q.x - this.y * q.y - this.z * q.z + this.w * q.w;
    this.x = newX;
    this.y = newY;
    this.z = newZ;
    this.w = newW;
  }

  /**
   * Clone a copy of this quaternion.
   *
   * @returns the cloned quaternion
   */
  clone() {
    return new Quaternion(this);
  }
}
