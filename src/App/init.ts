import {
  appWrapperId,
  scene,
  camera,
  cameraPosStart,
  containerId,
  controls,
  renderer
} from '../utils/constants';
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Object3D,
  sRGBEncoding,
} from 'three';
import Lights from '../components/THREE/Lights';
import Ground from '../components/THREE/Ground';
import {
  animate,
  onDocumentMouseDown,
  onDocumentTouchDown,
  onWindowResize,
} from '../utils';
import { useStore } from '../utils/store';

export default function (): void {
  const { dispatch } = useStore();

  // CAMERA SET UP
  
  const { x, y, z } = cameraPosStart;

  camera.position.set(x, y, z);
  camera.lookAt(scene.position);
  // END

  // CONTROLS SETTINGS
  
  controls.target.set(0, 0.9, 0);
  controls.update();
  
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.minDistance = 5.5;
  
  controls.enableDamping = true;
  controls.dampingFactor = 0.75;
  controls.rotateSpeed = 0.35;
  controls.addEventListener('change', animate);
  // END

  // RENDERER SET UP

  renderer.clearDepth();
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.375;

  renderer.outputEncoding = sRGBEncoding;
  renderer.gammaFactor = 2.25;

  renderer.physicallyCorrectLights = true;

  const lights: Object3D = Lights();
  const ground: Object3D = Ground();

  scene.add(lights);
  scene.add(ground);

  const dimContainer = document.getElementById(containerId);
  const dimensions = JSON.parse(dimContainer.getAttribute('data-dimensions'));

  document.getElementById(appWrapperId).appendChild(renderer.domElement);

  const width: number = dimensions[0];
  const height: number = dimensions[1];

  renderer.setSize(width, height, true);
  renderer.compile(scene, camera);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.domElement.addEventListener('click', onDocumentMouseDown, false);
  renderer.domElement.addEventListener(
    'touchstart',
    onDocumentTouchDown,
    false
  );
  window.addEventListener('resize', onWindowResize, false);

  dispatch({
    type: 'SET_DIMENSIONS',
    payload: {
      width,
      height,
    },
  });

  animate();
  // END
}
