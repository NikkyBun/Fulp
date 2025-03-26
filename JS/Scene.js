import * as THREE from 'three';

export function createScene(canvas) {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75, // Field of view
        canvas.width / canvas.height, // Aspect ratio
        0.1, // Near plane
        1000 // Far plane
    );
    camera.position.set(0,1,5); // Cam start pos
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    // Ambient light (soft background light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
    scene.add(ambientLight);
    
    // Directional light (like sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3); // Position the light source
    scene.add(directionalLight);
    
    return { scene, camera, renderer };
}
export function animate(renderer, scene, camera) {
    function loop() {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    }
    loop();
}

// Close button behavior
document.querySelector('.close-btn').addEventListener('click', () => {
document.querySelector('.window').style.display = 'none';
});
