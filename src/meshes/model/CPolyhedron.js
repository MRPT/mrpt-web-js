import * as THREE from 'three'
export default class CPolyhedron extends THREE.Mesh {
  constructor(options = {}) {
    let vertices = options.vertices||[
      -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
      -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];
    let faces = options.faces||[
      2,1,0,    0,3,2,
      0,4,7,    7,3,0,
      0,1,5,    5,4,0,
      1,2,6,    6,5,1,
      2,3,7,    7,6,2,
      4,5,6,    6,7,4
    ];
    let geom = new THREE.PolyhedronGeometry(vertices, faces,6,2);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    super(geom, material);
  }
}
