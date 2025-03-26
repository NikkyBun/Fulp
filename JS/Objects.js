import * as THREE from 'three';

export function addCube(scene, texture) {
    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //Animate the cube
    function animate(){
        requestAnimationFrame(animate);
        cube.rotation.x =+ 0;
        cube.rotation.y =+ 0;
    }
    animate();
}
