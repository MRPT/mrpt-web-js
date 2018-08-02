# 3D Visualization

Module is based on [three.js](https://threejs.org/) and aims to provide objects commonly used in robotic visualization and calculations.

* Note: A preliminary knowledge of three.js is useful. Checkout some [tutorials](https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene).

* Setting a scene
```
var scene = new MRPTLIB.Scene({
  divID: "someDivID",
  width: 800,
  height: 600,
  cameraPose: {
    x: -3,
    y: -3,
    z: 5
  }
});
// add object to scene
scene.addObject(obj); // where obj is an object derived from THREE.Object3D or similar classes
// removing the object obj from the scene
scene.removeObject(obj);
```
For moving in the scene, a mouse would be useful. Move about the pivot by pressing left button and moving the mouse.

## Examples
* adding Arrow to scene
```
var arrow = new MRPTLIB.model.Arrow();
// add arrow to the scene
scene.addObject(arrow);
//process messages
arrow.processMessage({position: {x: 1, y: 2, z: 3}, orientation: {x: 0.3, y: 0.6, z: 7}});
// processMessage can be used in a loop or with event emitter
// to process the position and orientation whenever a change is emitted.
```
Arrow can be used to indicate pose. Method "processMessage" allows to change orientation and position of arrow even after instantiation.

* adding laser scan to scene
```
var laserScan = new MRPTLIB.model.CPlanarLaserScan({enable_surface: false, points_color: {r:0, g:1, b:0, a:1}});
// add laser scan to a MRPTLIB.Scene object
scene.addObject(laserScan);
// process messages to change the laserscan
laserScan.processMessage({n:4, xs: [0,2,2,0], ys: [0,0,2,2]}); // zs will be taken as array of 0s
//process another message
laserScan.processMessage({n:4, xs:[0,2,3,0], ys: [0,0,4,2]}); // zs will be taken as array of 0s
```

More objects:
* CCylinder
* COccupancyGrid
* CornerXYZ
* CornerXYZSimple
* CPointCloud
* CPolyhedron
* CubeMarker
* Path
* SphereMarker

Read about instructions and further details about them in references.
