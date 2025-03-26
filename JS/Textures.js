import * as THREE from 'three';

export function loadTexture(url) {
    const textureLoader = new THREE.TextureLoader();
    return textureLoader.load(
        url,
        () => console.log('Texture loaded:', url),
        undefined,
        (error) => console.error('Error loading texture:', error)
    );
}


