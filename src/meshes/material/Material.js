import * as THREE from 'three'
export default class Material {
  /**
   * @constructor
   */
  constructor() {}
  /**
   *
   * @param {float} r
   * @param {float} g
   * @param {float} b
   * @param {float} a
   * @returns The three material
   */
  static makeColorMaterial(r,g,b,a) {
    let color = new THREE.Color();
    color.setRGB(r, g, b);
    if (a <= 0.99) {
      return new THREE.MeshBasicMaterial({
        color : color.getHex(),
        opacity : a + 0.1,
        transparent : true,
        depthWrite : true,
        blendSrc : THREE.SrcAlphaFactor,
        blendDst : THREE.OneMinusSrcAlphaFactor,
        blendEquation : THREE.ReverseSubtractEquation,
        blending : THREE.NormalBlending
      });
    } else {
      return new THREE.MeshPhongMaterial({
        color : color.getHex(),
        opacity : a,
        blending : THREE.NormalBlending
      });
    }
  }
}
