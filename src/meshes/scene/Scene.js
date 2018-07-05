import * as THREE from 'three'
import TrackballControls from './trackballcontrols';
/**
 * Scene class is used to render an interactive 3D scene.
 *
 * @constructor
 * @param options - object with following kets:
 * * divID - the ID of the div to place the viewer in
 * * width - the initial width, in pixels, of the canvas
 * * height - the initial height, in pixels, of the canvas
 * * background (optional) - the color to render the background
 * * alpha (optional) - the alpha of the background
 * * antialias (optional) - if antialiasing should be used
 * * intensity (optional) - the lightning intensity setting to use
 * * cameraPosition (optional) - the starting position of the camera
 */
export default class Scene {
  /**
   * @constructor
   */
  constructor(options = {}) {
    const divID = options.divID;
    const width = options.width;
    const height = options.height;
    const background = options.background || '#dddddd';
    const antialias = options.antialias;
    const intensity = options.intensity || 0.66;
    const near = options.near || 0.01;
    const far = options.far || 1000;
    const alpha = options.alpha || 1.0;
    const cameraPosition = options.cameraPose || {
      x : 5,
      y : 5,
      z : 5
    };
    const cameraZoomSpeed = options.cameraZoomSpeed || 0.5;
    // setup the scene
    this.scene = new THREE.Scene();
    //set scene background color
    this.scene.background = new THREE.Color(parseInt(background.replace('#', '0x'), 16))
    // set scene lighting
    // lights
    this.scene.add(new THREE.AmbientLight(0x555555));
    this.directionalLight = new THREE.DirectionalLight(0xffffff, intensity);
    this.scene.add(this.directionalLight);
    // add axes
    this.axes = new THREE.AxesHelper(20);
    this.processAxes(true);
    // rotation of PI/2 about x-axis in anticlockwise direction
    // stored in q
    let e = new THREE.Euler(Math.PI/2,0,0);
    let q = new THREE.Quaternion();
    q.setFromEuler(e);
    // add ground plane
    this.ground = new THREE.GridHelper(100, 100, 0xcccccc, 0xcccccc);
    this.ground.quaternion.copy(q);
    this.processGround(true);
    //setup the camera
    this.camera = new THREE.PerspectiveCamera(70, width/height, 0.1, 1000);
    this.camera.position.x = cameraPosition.x;
    this.camera.position.y = cameraPosition.y;
    this.camera.position.z = cameraPosition.z;
    this.camera.lookAt(new THREE.Vector3(0 ,0 ,0));
    // setup the renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias : antialias,
      alpha : alpha
    });
    this.renderer.setSize(width, height);
    this.parent = document.getElementById(divID);
    // add the renderer to the DOM element
    document.getElementById(divID).appendChild(this.renderer.domElement);
    // Camera controls , based on three-trackballcontrols
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    //configure
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 1.0;
    this.controls.staticMoving = true;
    this.animationRequestId = undefined;
    this.started = true;
    this.start();
  }
  /**
   * To start rendering the loop
   */
  start() {
    this.started = true;
    this.draw();
  }
  /**
   * draw function acts as the render loop
   */
  draw() {
    if(!this.started)
    {
      return;
    }
    this.controls.update();
    this.animationRequestId = requestAnimationFrame(this.draw.bind(this));
    // this.cube.rotation.x += 0.1;
    // this.cube.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
  }
  // TODO add code for stopping the animation
  stop() {
    if(this.started) {
      // Stop the animation loop
      cancelAnimationFrame(this.animationRequestId);
    }
    this.stopped = true;
  }
  /**
   * Resize 3D  viewer
   *
   * @param {float} width
   * @param {float} height
   */
  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  /**
   * set the axes on or off
   * @param {bool} flag
   */
  processAxes(flag) {
    if(flag) {
      this.scene.add(this.axes);
    }
    else {
      this.scene.remove(this.axes);
    }
  }
  /**
   * set the ground plane on or off
   * @param {bool} flag
   */
  processGround(flag) {
    if(flag) {
      this.scene.add(this.ground);
    }
    else {
      this.scene.remove(this.ground);
    }
  }
  /**
   * Add a given THREE Object3D to the global scene in the scene
   * @param {THREE.Object3D} object
   */
  addObject(object) {
    this.scene.add(object);
  }
  /**
   * Remove a given THREE Object3D from global scene
   * @param {THREE.Object3D} object
   */
  removeObject(object) {
    try {
      this.scene.remove(object);
    }
    catch(error){
      console.error(error);
    }
  }
  removeScene() {
    this.parent.removeChild(this.renderer.domElement);
  }
}
