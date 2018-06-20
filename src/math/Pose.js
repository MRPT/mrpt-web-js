import Vector3 from './Vector3'
import Quaternion from './Quaternion'

/**
 * A Pose in 3D space, Values are copied into this object.
 */
export default class Pose {
  /**
   * @constructor
   * @param {Object} - keys include a Vector3 and Quaternion obj params
   */
  constructor({position = {}, orientation = {}} = {}) {
    this.position = new Vector3(position);
    this.orientation = new Quaternion(orientation);
  }
  /**
   * Apply a transform against this pose.
   *
   * @param tf the transform
   */
  applyTransform(tf) {
    position.multiplyQuaternion(tf.rotation);
    position.add(tf.translation);
    let tmp = tf.rotation.clone();
    tmp.multiply(this.orientation);
    this.orientation = tmp;
  }
  /**
   * Clone a copy of this pose
   *
   * @returns the cloned pose
   */
  clone() {
    return new Pose(this);
  }
}
