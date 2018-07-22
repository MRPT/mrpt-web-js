import * as THREE from 'three'
export default class CPointCloud extends THREE.Points {
  /**
   * @constructor
   * @param {Object} options - with the possible keys
   * pointSize - the size of point in float
   * xs {Array} - contains x coords of all the points
   * ys {Array} - contains y coords of all the points
   * zs {Array} - contains z coords of all the points
   * colorFromDepth_min {R,G,B} -float values of RGB channels
   * colorFromDepth_max {R,G,B} - float values of RGB channels
   * pointSmooth {bool} - flag
   * @todo add processMessage and colorConfiguration methods
   */
  constructor(options = {}) {
    let pointSize = options.pointSize || 1.0;
    let N = Math.min((options.xs.length || 0), (options.ys.length || 0),(options.zs.length || 0));
    let xs = options.xs;
    let ys = options.ys;
    let zs = options.zs;
    let color = new THREE.Color(0x00ff00);
    let geom = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
      size: pointSize,
      color: color
    });
    for (let i = 0; i < N; i++) {
      let particle = new THREE.Vector3(xs[i],ys[i],zs[i]);
      geom.vertices.push(particle);
      let particle_color = new THREE.Color(0x00ff00);
      //TODO: change to gradient colors later
      let hsl = {};
      color.getHSL(hsl);
      particle_color.setHSL(hsl.h, hsl.s, hsl.l);
      geom.colors.push(particle_color);
    }
    super(geom, material);
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
   * scale equally in 3 directions
   * @param {float} r
   */
  setSize(r) {
    this.scale.set(r, r, r);
  }
}
