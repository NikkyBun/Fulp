import * as THREE from 'three';
import { createBoxGeometry, createSphereGeometry, createCylinderGeometry, createBasicMaterial, createStandardMaterial, createLambertMaterial } from './geometry.js';

export function addObjectToScene(scene, x, y, z, color = 0xffffff, geometryType = 'box', scale = { x: 1, y: 1, z: 1}, rotation = { x: 0, y: 0, z: 0 }, materialType = 'basic', texturePath = null) {
    let geometry;
    let material;

    // Determine geometry type
    if (geometryType === 'sphere') {
        geometry = createSphereGeometry();
    } else if (geometryType === 'cylinder') {
        geometry = createCylinderGeometry();
    } else {
        geometry = createBoxGeometry(); // Default to box geometry
    }

    // Determine material type and apply texture if needed
    if (materialType === 'basic') {
        material = createBasicMaterial(color);
    } else if (materialType === 'standard') {
        material = createStandardMaterial(color);
    } else {
        material = createLambertMaterial(color);
    }

    // If texture is provided, load it and apply it to the material
    if (texturePath) {
        const texture = new THREE.TextureLoader().load(texturePath);
        material.map = texture; // Apply texture to material
    }

    // Create the mesh
    const object = new THREE.Mesh(geometry, material);

    // Set position, scale, and rotation
    object.position.set(x, y, z);
    object.scale.set(scale.x, scale.y, scale.z);
    object.rotation.set(rotation.x, rotation.y, rotation.z);

    // Enable shadow properties
    object.castShadow = true;   // This object will cast shadows
    object.receiveShadow = true; // This object will receive shadows

    // Add the object to the scene
    scene.add(object);
}

