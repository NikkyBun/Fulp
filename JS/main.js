import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { addLighting } from './lighting.js';
import { addGrid, addAxes } from './geometry.js';
import { addObjectToScene } from './objects.js';
import { createAxisWidget } from './axisWidget.js';

let axisWidget;
let camera, scene, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const clock = new THREE.Clock();

init();
animate();

function init() {
  const canvas = document.getElementById('webgl-canvas');

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 10, 0);

  // Lighting setup
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(100, 100, 100);
  scene.add(dirLight);

  // Ground setup
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x556655 })
  );
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Add lighting and helper functions
  addLighting(scene);
  addGrid(scene);
  addAxes(scene);

  //Code Block for all objects added to the scene
  // for parameters, refer to Fulp/Notes AddObjectToScene
  // addObjectToScene(scene, x, y, z, color = 0xffffff, geometryType = 'box', scale = { x: 1, y: 1, z: 1 }, rotation = { x: 0, y: 0, z: 0 }, materialType = 'basic', texturePath = null)
  addObjectToScene(scene, 1, 2, 0, 0xffffff, 'cylinder', { x: 0.5, y: 6, z: 0.5 } , { x: 0, y: 0, z: 0 }, 'basic');



  

  // Controls setup
  controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());

  document.addEventListener('click', () => controls.lock());
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  window.addEventListener('resize', onWindowResize);

  axisWidget = createAxisWidget(renderer);
}

function onWindowResize() {
  const canvas = document.getElementById('webgl-canvas');
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
}

function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyD': moveRight = true; break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyD': moveRight = false; break;
  }
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
  if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  renderer.render(scene, camera);
  
  if (axisWidget) axisWidget.update(camera);
}
