import * as THREE from 'three'
export default class CubeMarker extends THREE.Mesh {
  constructor(options = {}) {
    const x = options.x || 0;
    const y = options.y || 0;
    const z = options.z || 0;
    let geometry = new THREE.BoxGeometry(0.06,0.06,0.06);
    let m = new THREE.Matrix4();
    geometry.applyMatrix(m);
    let material = new THREE.MeshBasicMaterial( {color : 0x0000ff});
    super(geometry, material);
    this.setPosition(new THREE.Vector3(x, y, z));
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
    this.scale.set(side, side, side);
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
