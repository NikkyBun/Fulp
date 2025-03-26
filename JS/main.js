import { createScene, animate } from './Scene.js';
import { setupControls } from './Controls.js';
import { addCube } from './Objects.js';
import { loadTexture } from './Textures.js'

const canvas = document.getElementById('webgl-canvas');

const { scene, camera, renderer } = createScene(canvas);

// Load texture and apply to cube
const texture = loadTexture('./Styles/sehtxgh.png');
addCube(scene, texture);

setupControls(camera, canvas);

animate(renderer, scene, camera);
