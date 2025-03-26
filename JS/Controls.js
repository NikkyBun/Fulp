import * as THREE from 'three';
const keys = {};
let isMouseDown = false;
let pitch = 0;
let yaw = 0;
const lookSpeed = 0.004;
const moveSpeed = 0.1;

export function setupControls(camera, canvas) {
    window.addEventListener('keydown', (event) => keys[event.key.toLowerCase()] = true);
    window.addEventListener('keyup', (event) => keys[event.key.toLowerCase()] = false);

    canvas.addEventListener('mousedown', (event) => {
        if (event.button === 0) { // Left click
            canvas.requestPointerLock(); // Lock mouse to canvas
            isMouseDown = true;
        }
    });

    document.addEventListener('mouseup', (event) => {
        if (event.button === 0) {
            document.exitPointerLock(); // Release mouse lock
            isMouseDown = false;
        }
    });
    canvas.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            yaw -= event.movementX * lookSpeed;
            pitch -= event.movementY * lookSpeed;

            // Limit pitch to prevent camera flip
            pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

            camera.rotation.x = pitch;
            camera.rotation.y = yaw;
        }
    });
    function updateCameraMovement() {
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        forward.y = 0; // Flatten to XZ plane
        forward.normalize();
    
        const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward).normalize();
    
        // Forward movement (W/S)
        if (keys['w']) camera.position.addScaledVector(forward, moveSpeed);
        if (keys['s']) camera.position.addScaledVector(forward, -moveSpeed);
    
        // Sideways movement (A/D)
        if (keys['a']) camera.position.addScaledVector(right, -moveSpeed);
        if (keys['d']) camera.position.addScaledVector(right, moveSpeed);
    }

    function animate() {
        requestAnimationFrame(animate);
        updateCameraMovement();
    }

    animate();
}
