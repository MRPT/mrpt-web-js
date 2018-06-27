import * as THREE from 'three'
import { Arrow } from '.';
export default class CornerXYZ extends THREE.Group {
  /**
   *
   * @param {Object} options - with the following keys
   */
  constructor(options = {}) {
    super();
    const size = options.size || 1;
    let x0 = 0,y0 = 0, z0 = 0, x1 = 0,y1 = 0,z1 = 0;
    x1 = size;
    this.xarrow = new Arrow({x0,y0,z0,x1,y1,z1});
    this.xarrow.setColor(0xff0000);
    x1 = 0;
    y1 = size;
    this.yarrow = new Arrow({x0,y0,z0,x1,y1,z1});
    this.yarrow.setColor(0x00ff00); //green
    y1 = 0;
    z1 = size;
    this.zarrow = new Arrow({x0,y0,z0,x1,y1,z1});
    this.zarrow.setColor(0x0000ff);
    z1 = 0;
    this.add(this.xarrow);
    this.add(this.yarrow);
    this.add(this.zarrow);
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
   * @param {float} s
   */
  setSize(s) {
    this.xarrow.setLength(s);
    this.yarrow.setLength(s);
    this.zarrow.setLength(s);
  }
}
