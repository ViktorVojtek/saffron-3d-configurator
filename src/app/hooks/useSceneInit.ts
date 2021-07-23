import { useEffect } from 'react';
import {
  scene,
  camera,
  cameraPosition,
  cameraTarget,
  // canvasWrapperId,
  controls,
  renderer,
} from '../three/constants';
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Object3D,
  sRGBEncoding,
} from 'three';
import { onDocumentMouseDown, onDocumentTouchDown } from '../three/utils/intersection';
import Lights from '../three/objects/Lights';
import Ground from '../three/objects/Ground';
import animate from '../three/utils/animate';

export default function useSceneInit(wrapper: HTMLDivElement | null): void {
  useEffect(() => {
    if (!wrapper) {
      return;
    }

    console.log('Init');
    // Camera setup
    const { start: { x, y, z } } = cameraPosition;

    camera.position.set(x, y, z);
    camera.lookAt(scene.position);

    // Controls setup
    controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    controls.update();

    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 5.5;
    controls.maxDistance = 15;

    // Renderer setup
    renderer.clearDepth();
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.45; // 0.375;
    renderer.outputEncoding = sRGBEncoding;
    renderer.gammaFactor = 2.2; //2.75;
    renderer.physicallyCorrectLights = true;

    // Setup scene enviroment
    const lights: Object3D = Lights();
    const ground: Object3D = Ground();

    if (!scene.getObjectByName('Lights') && !scene.getObjectByName('Ground')) {
      scene.add(lights);
      scene.add(ground);
    }

    // const canvasWrapper: HTMLDivElement = document.getElementById(canvasWrapperId) as HTMLDivElement;
    const canvas = renderer.domElement;

    canvas.style.border = '1px solid red';
    
    wrapper.appendChild(canvas);

    const { innerHeight: height, innerWidth: width } = window;// canvasWrapper;

    renderer.setSize(width, height, true);
    renderer.compile(scene, camera);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Listeners setup

    controls.addEventListener('change', animate);
    canvas.addEventListener('click', onDocumentMouseDown, false);
    canvas.addEventListener('touchstart', onDocumentTouchDown, false);
    // window.addEventListener('resize', onWindowResize, false);

    return () => {
      controls.removeEventListener('change', animate);
      canvas.removeEventListener('click', onDocumentMouseDown, false);
      canvas.removeEventListener('touchstart', onDocumentTouchDown, false);
    };
  }, [wrapper]);
}
