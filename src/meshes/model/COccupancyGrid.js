import * as THREE from 'three'
import Pose from '../../math/Pose'
/**
 * Display the Occupancy Grid (or costmap)
 * @example
 *
 */
export default class COccupancyGrid extends THREE.Object3D {
  /**
   * @constructor
   * @param {Object} options - with the following keys
   * @param {float} options.resolution - the size of the grid cell
   * @param {int} options.width - the number of columns
   * @param {int} options.height - the number of rows
   * @param {Array<int>} options.data - the data of grid in row-major order
   * @param {int} options.range - the range of values that the grid can have
   * @param {object{r,g,b}} options.color - the rgb value of the colors
   * @param {Pose} pose - the pose of the origin of the map
   */
  constructor(options = {}) {
    super();
    this.resolution = options.resolution || 0.05;
    this.width = options.width || 4;
    this.height = options.height || 4;
    // 0 to 100 range
    this.data = options.data || [50,0,50,0,0,50,0,50,50,0,50,0,0,50,0,50];
    this.range = options.range || 100;
    this.baseColor = options.color || {r:255,g:255,b:255};
    if(options.pose === undefined) {
      this.pose = new Pose(options.pose);
    } else {
      this.pose = new Pose();
    }
    this.processGrid();
  }
  processGrid() {
    // remove previous children
    this.children.splice(0);
    // add new grid cells
    let i = 0;
    for ( let row = 0; row < this.height; row++) {
      for ( let col = 0; col < this.width; col++) {
        let mapI = (col + (this.height - row - 1) * this.width);
        let val = this.data[mapI];
        let color = new THREE.Color();
        let tmp = 255*this.range;
        color.setRGB((val * this.baseColor.r)/tmp, (val * this.baseColor.g)/tmp, (val * this.baseColor.b)/tmp);
        let geom = new THREE.PlaneBufferGeometry(this.resolution, this.resolution);
        let material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        let cell = new THREE.Mesh( geom, material);
        let m = new THREE.Matrix4();
        m.setPosition(new THREE.Vector3());
        // translate to required location
        cell.position.copy(new THREE.Vector3(this.resolution/2 + this.resolution*col,this.resolution/2 + this.resolution*row,0));
        this.add(cell);
      }
    }
  }
  /**
   * setPosition
   * @param {float} [x = 0]
   * @param {float} [y = 0]
   * @param {float} [z = 0]
   */
  setPosition(x = 0,y = 0,z = 0) {
    this.position.copy(new THREE.Vector3(x,y,z));
  }
  /**
   * setOrientation
   * @param {float} [x = 0]
   * @param {float} [y = 0]
   * @param {float} [z = 0]
   * @param {float} [w = 1]
   */
  setOrientation(x = 0,y = 0,z = 0,w = 1) {
    this.orientation.copy(new THREE.Quaternion(x,y,z,w));
  }
  /**
   * setFromPose
   * @param {Pose}
   */
  setFromPose(pose) {
    // TODO
    throw "Not Implemented yet.s"
  }
  /**
   * @param {Object} options - with the following keys
   * @param {float} options.resolution - the size of the grid cell
   * @param {int} options.range - the range of values that the grid can have
   * @param {object{r,g,b}} options.color - the rgb value of the colors
   */
  setConfiguration(options) {
    this.resolution = options.resolution || this.resolution;
    this.range = options.range || this.range;
    this.baseColor = options.baseColor || this.baseColor;
    // recreate the occupancy grid according to current configuration
    this.processGrid();
  }
  /**
   *
   * @param {object} message - with the following keys
   * @param {int} options.width - the number of columns
   * @param {int} options.height - the number of rows
   * @param {Array<int>} options.data - the data of grid in row-major order
   * @param {?object{x,y,z}} position- the position of origin of the occupancy grid
   * @param {?object{x,y,z,w}} orientation - the orientation of the plane of occupancy grid
   */
  processMessage(message) {
    this.height = message.height;
    this.width = message.width;
    this.data = message.data;
    this.processGrid();
    if (message.position) {
      let x = message.position.x;
      let y = message.position.y;
      let z = message.position.z;
      this.setPosition(x, y, z);
    }
    if (message.orientation) {
      let x = message.orientation.x;
      let y = message.orientation.y;
      let z = message.orientation.z;
      let w = message.orientation.w;
      this.setOrientation(x, y, z, w);
    }
  }
}
