import * as THREE from 'three'
export default class CCylinder extends THREE.Mesh {
  constructor(options = {}) {
    const baseRadius = options.baseRadius || 1;
    const topRadius = options.topRadius || 1;
    const height = options.height || 1;
    const slices = options.slices || 20;
    const stacks = options.stacks || 10;
    // only supports completely open ended
    const hasBothBase = (options.hasBottomBase||true) & (options.hasTopBase||true);
    let geom  = new THREE.CylinderGeometry(topRadius, baseRadius, height, slices, stacks,!hasBothBase);
    let material = new THREE.MeshBasicMaterial({color: 0xffff00});
    super(geom, material);
  }
}
