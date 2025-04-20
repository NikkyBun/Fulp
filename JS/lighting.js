import * as THREE from 'three';

export function addLighting(scene) {
  // Ambient Light (soft white light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // Directional Light (for strong shadows)
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(100, 100, 100);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // Directional light shadows
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;

  // Create the Sun Sprite and attach it to the light
  const sunTexture = new THREE.TextureLoader().load('./Styles/StupidStretchedOutWolp.png');
  const sunMaterial = new THREE.SpriteMaterial({ map: sunTexture, color: 0xffffff, fog: true });
  const sunSprite = new THREE.Sprite(sunMaterial);
  sunSprite.scale.set(50, 50, 1); // Adjust the size of the sun sprite
  sunMaterial.emissive = new THREE.Color(0xffff00); // Yellowish glow
  sunMaterial.emissiveIntensity = 1;  // Controls the intensity of the glow

  // Position the sun sprite at the same location as the directional light
  sunSprite.position.copy(dirLight.position);

  // Add the sun to the scene
  scene.add(sunSprite);
}
