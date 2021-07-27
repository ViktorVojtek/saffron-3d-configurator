import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Object3D,
  sRGBEncoding,
} from 'three';
import {
  scene,
  sceneName,
  camera,
  cameraPosition,
  cameraTarget,
  controls,
  renderer,
} from '../../constants';
import Lights from '../objects/Lights';
import Ground from '../objects/Ground';
import animate from './animate';

export default function setUpScene(parentElement: HTMLDivElement): void {
  scene.name = sceneName;

  // Camera setup
  setUpCamera();

  // Controls setup
  setUpControls();

  // Renderer setup
  setUpRenderer();

  if (!scene.getObjectByName('Lights') && !scene.getObjectByName('Ground')) {
    // Setup scene enviroment
    const lights: Object3D = Lights();
    const ground: Object3D = Ground();
    
    scene.add(lights);
    scene.add(ground);
  }

  // Set render size
  setSize(parentElement);

  parentElement.appendChild(renderer.domElement);

  animate();
}

function setUpCamera(): void {
  const { start: { x, y, z } } = cameraPosition;

  camera.position.set(x, y, z);
  camera.lookAt(scene.position);
}

function setUpControls(): void {
  controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.minDistance = 5.5;
  controls.maxDistance = 15;

  controls.update();
}

function setUpRenderer(): void {
  renderer.clearDepth();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = sRGBEncoding;
  renderer.gammaFactor = 2.75;
  renderer.physicallyCorrectLights = true;
}

function setSize(parent: HTMLDivElement): void {
  const { clientWidth: width, clientHeight } = parent;
  const height: number = !!clientHeight
    ? clientHeight
    : Math.round(window.innerHeight / 2.5);
  
  renderer.setSize(width, height, true);
  renderer.compile(scene, camera);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
