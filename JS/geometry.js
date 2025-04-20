import * as THREE from 'three';


export function addGrid(scene) {
    // Size of the grid (distance between the grid lines)
    const gridSize = 200;
    // Number of divisions (how many lines in both directions)
    const gridDivisions = 20;
  
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x555555); // Grid lines in gray
    scene.add(gridHelper);
}
export function addAxes(scene) {
    // The number is the length of the axis lines
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
}

// Create a box geometry
export function createBoxGeometry() {
  return new THREE.BoxGeometry(1, 1, 1);
}

// Create a sphere geometry
export function createSphereGeometry() {
  return new THREE.SphereGeometry(1, 32, 32);
}

// Create a cylinder geometry
export function createCylinderGeometry() {
  return new THREE.CylinderGeometry(1, 1, 2);
}

// Create a basic material (you can extend this to handle different material types)
export function createBasicMaterial(color = 0xffffff) {
  return new THREE.MeshBasicMaterial({ color: color });
}

// Create a standard material (you can add properties like metalness, roughness, etc.)
export function createStandardMaterial(color = 0xffffff) {
  return new THREE.MeshStandardMaterial({ color: color });
}

// Create a lambert material
export function createLambertMaterial(color = 0xffffff) {
  return new THREE.MeshLambertMaterial({ color: color });
}

  
