import * as THREE from 'three';

export function createAxisWidget() {
  const widgetScene = new THREE.Scene();

  const size = 1.2;
  const widgetCamera = new THREE.OrthographicCamera(-size, size, size, -size, 0.1, 10);
  widgetCamera.position.set(0, 0, 2);
  widgetCamera.lookAt(0, 0, 0);

  // Pivot to rotate
  const pivot = new THREE.Object3D();
  widgetScene.add(pivot);

  const axesHelper = new THREE.AxesHelper(0.8);
  pivot.add(axesHelper);

  // Use existing canvas
  const widgetCanvas = document.getElementById('axisCanvas');
  widgetCanvas.width = 158;
  widgetCanvas.height = 158;

  const widgetRenderer = new THREE.WebGLRenderer({ canvas: widgetCanvas, alpha: true });
  widgetRenderer.setSize(128, 128);
  widgetRenderer.setPixelRatio(window.devicePixelRatio);
  widgetRenderer.setClearColor(0x000000, 0); // transparent

  // Position labels
  const cameraXLabel = document.getElementById('cameraX');
  const cameraYLabel = document.getElementById('cameraY');
  const cameraZLabel = document.getElementById('cameraZ');

  return {
    update: (mainCamera) => {
      // Rotate the widget’s pivot to match the main camera
      pivot.quaternion.copy(mainCamera.quaternion);

      // Update position text
      cameraXLabel.textContent = `X: ${mainCamera.position.x.toFixed(2)}`;
      cameraYLabel.textContent = `Y: ${mainCamera.position.y.toFixed(2)}`;
      cameraZLabel.textContent = `Z: ${mainCamera.position.z.toFixed(2)}`;

      widgetRenderer.render(widgetScene, widgetCamera);
    }
  };
}
