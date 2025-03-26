import * as THREE from 'three';

const canvas = document.getElementById('webgl-canvas');

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    canvas.width / canvas.height, // Aspect ratio
    0.1, // Near plane
    1000 // Far plane
);
camera.position.set(0,1,5); // Camera start pos

// Create renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.width, canvas.height);

//Cube texture and making sure it loaded
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    'Styles/sehtxgh.png',
    () => console.log('Texture loaded successfully'),
    undefined,
    (error) => console.error('Error loading texture:', error)
);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
geometry.computeVertexNormals();

// Text 
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const geometry = new TextGeometry('Hello!', {
        font: font,
        size: 0.2,
        height: 0.2
    });
    const material = new THREE.MeshBasicMaterial({ color: 0xffff0f });
    const text = new THREE.Mesh(geometry, material);
    scene.add(text);
});





// Ambient light (soft background light)
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // color, intensity
scene.add(ambientLight);

// Directional light (like sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 3, 3); // Position the light source
scene.add(directionalLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0;
    cube.rotation.y += 0;

    renderer.render(scene, camera);
}

// Add mouse interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;
    }

    previousMousePosition = {
    x: event.clientX,
    y: event.clientY
    };
});

animate();

// Close button behavior
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.window').style.display = 'none';
});
