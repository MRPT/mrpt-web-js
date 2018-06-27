import * as THREE from 'three'
import Pose from '../../math/Pose'
export default class COccupancyGrid extends THREE.Object3D {
  /**
   *
   * @param {Object} options - with the following keys
   * @param {float} resolution - the size of the grid cell
   * @param {int} width - the number of columns
   * @param {int} height - the number of rows
   * @param {int} range - the range of values that the grid can have
   * @param {Object{r,g,b}} color - the rgb value of the colors
   * @param {Pose} pose - the pose of the origin of the map
   */
  constructor(options = {}) {
    super();
    const resolution = options.resolution || 0.05;
    const width = options.width || 4;
    const height = options.height || 4;
    // 0 to 100 range
    const data = options.data || [50,0,50,0,0,50,0,50,50,0,50,0,0,50,0,50];
    let range = options.range || 100;
    const baseColor = options.color || {r:255,g:255,b:255};
    let pose;
    if(options.pose === undefined) {
      pose = new Pose(options.pose);
    } else {
      pose = new Pose();
    }
    let i = 0;
    for ( let row = 0; row < height; row++) {
      for ( let col = 0; col < width; col++) {
        let mapI = (col + (height - row - 1) * width);
        let val = data[mapI];
        let color = new THREE.Color();
        let tmp = 255*range;
        color.setRGB((val * baseColor.r)/tmp, (val * baseColor.g)/tmp, (val * baseColor.b)/tmp);
        let geom = new THREE.PlaneBufferGeometry(resolution,resolution);
        let material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        let cell = new THREE.Mesh( geom, material);
        let m = new THREE.Matrix4();
        m.setPosition(new THREE.Vector3());
        // translate to required location
        cell.position.copy(new THREE.Vector3(resolution/2 + resolution*col,resolution/2 + resolution*row,0));
        this.add(cell);
      }
    }
  }
  /**
   * setPosition
   * @param x
   * @param y
   * @param z
   */
  setPosition(x = 0,y = 0,z = 0) {
    this.position.copy(new THREE.Vector3(x,y,z));
  }
  /**
   * setOrientation
   * @param
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
}
