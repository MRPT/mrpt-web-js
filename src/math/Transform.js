import Vector3 from './Vector3'
import Quaternion from './Quaternion'
/**
 * A Transform in 3-space. Values are copied into this object
 */
export default class Transform {
  /**
  * @constructor
  * @param {Object} - with following keys:
  *  * translation - the Vector3 describing the translation
  *  * rotation - the MRPTLIB.Quaternion describing the rotation
  */
  constructor({translation = {}, rotation = {}} = {}) {
    this.translation = new Vector3(translation);
    this.rotation = new Quaternion(rotation);
  }
  /**
   * Clone a copy of this transform
   *
   * @returns the cloned transform
   */
  clone() {
    return new Transform(this);
  }
}


