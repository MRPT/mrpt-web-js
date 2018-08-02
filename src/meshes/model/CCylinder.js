import * as THREE from 'three'
/**
 * Creates a cylinder with specified bottom, top radius height, open / closed ends.
 * Can be used to create markers
 * @example
 * cyl = new MRPTLIB.model.CCylinder({baseRadius: 2, topRadius: 4});
 * scene.addObject(cyl);
 *
 * cyl.setPosition(2, 3, 4);
 * @todo add methods to change the orientation
 */
export default class CCylinder extends THREE.Mesh {
  /**
   *
   * @param {object} options - with the following keys
   * @param {number} [options.baseRadius = 1] - the radius of the base of the cylinder
   * @param {number} [options.topRadius = 1] - the radius of the top of the cylinder
   * @param {number} [options.height = 1] - the height of the cylinder
   * @param {number} [options.slices = 20] - the number of slices curvature of the cylinder is divided into
   * @param {number} [options.stacks = 10] - the number of stacks the cylinder is comprised of vertically
   * @param {boolean} [hasBothBase = true]
   */
  constructor(options = {}) {
    const baseRadius = options.baseRadius || 1;
    const topRadius = options.topRadius || 1;
    const height = options.height || 1;
    const slices = options.slices || 20;
    const stacks = options.stacks || 10;
    // only supports completely open ended
    const hasBothBase = (options.hasBothBase||true);
    let geom  = new THREE.CylinderGeometry(topRadius, baseRadius, height, slices, stacks,!hasBothBase);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00});
    super(geom, material);
  }
  /**
   * Sets the position of COG (or simply cemter) of the cylinder
   * @param {float} x
   * @param {float} y
   * @param {float} z
   */
  setPosition(x = 0, y = 0, z = 0) {
    this.position.copy(new THREE.Vector3(x, y, z));
  }
}
