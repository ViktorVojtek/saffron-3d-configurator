import {
  appWrapperId,
  scene,
  camera,
  cameraPosStart,
  canvasWrapperId,
  composer,
  containerId,
  controls,
  renderer,
  renderPass
} from '../../../utils/constants';
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Object3D,
  sRGBEncoding,
  Vector2
} from 'three';
import Lights from '../../../components/THREE/Lights';
import Ground from '../../../components/THREE/Ground';
import {
  animate,
  onDocumentMouseDown,
  onDocumentTouchDown,
  onWindowResize,
} from '../../../utils';
import { useStore } from '../../../utils/store';

// import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
// import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';

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
  
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.75;
  // controls.rotateSpeed = 0.35;
  controls.addEventListener('change', animate);
  // END

  // RENDERER SET UP

  renderer.clearDepth();
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  // renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.45; // 0.375;

  renderer.outputEncoding = sRGBEncoding;
  renderer.gammaFactor = 2.2; //2.75;

  renderer.physicallyCorrectLights = true;

  const lights: Object3D = Lights();
  const ground: Object3D = Ground();

  if (!scene.getObjectByName('Lights') && !scene.getObjectByName('Ground')) {
    scene.add(lights);
    scene.add(ground);
  }

  const dimContainer = document.getElementById(containerId);
  const dimensions = JSON.parse(dimContainer.getAttribute('data-dimensions'));

  document.getElementById(canvasWrapperId).appendChild(renderer.domElement);

  const width: number = dimensions[0];
  const height: number = dimensions[1];

  renderer.setSize(width, height, true);
  renderer.compile(scene, camera);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  /* const saoPass = new SAOPass(scene, camera, false, false, new Vector2(1024, 1024));

  saoPass.renderToScreen = true;

  saoPass.params.saoBias = 0.5;
  saoPass.params.saoIntensity = 0.0016; // 0.0015;
  saoPass.params.saoScale = 3.5;
  saoPass.params.saoKernelRadius = 8;
  saoPass.params.saoMinResolution = 0;
  saoPass.params.saoBlur = 1;
  saoPass.params.saoBlurRadius = 2.5;
  saoPass.params.saoBlurStdDev = 2;
  saoPass.params.saoBlurDepthCutoff = 0.01;

  const ssaaRenderPass: SSAARenderPass = new SSAARenderPass(scene, camera, 0xffffff, 0);

  // ssaaRenderPass.unbiased = true;
  ssaaRenderPass.setSize(width, height);
  ssaaRenderPass.sampleLevel = 2;

  composer.setSize(width, height);
  composer.setPixelRatio(window.devicePixelRatio || 1);

  composer.addPass(renderPass);
  composer.addPass(ssaaRenderPass);
  composer.addPass(saoPass); */

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
