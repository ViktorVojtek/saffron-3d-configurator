import {
  Scene,
  Raycaster,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

export type CameraPosType = {
  x: number;
  y: number;
  z: number;
};

export { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const appWrapperId: string = 'App'; 
export const canvasWrapperId: string = 'canvasWrapper';
export const containerId: string = 'canvas';
export const vendor: string = 'saffron';

const protocol: string = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const domainName: string = process.env.NODE_ENV === 'production' ? 'enli.technology' : 'localhost:3000';
export const domainUri: string = `${protocol}://${process.env.NODE_ENV === 'production' ? vendor + '.' : ''}${domainName}`;

type CameraPosition = {
  start: {
    x: number;
    y: number;
    z: number;
  };
  change: {
    x: number;
    y: number;
    z: number;
  };
}

export const cameraPosition: CameraPosition = {
  start: {
    x: 3, y: 2.25, z: 8,
  },
  change: {
    x: 0, y: 1.25, z: 8,
  },
};

type CameraTarget = {
  x: number;
  y: number;
  z: number;
};

export const cameraTarget: CameraTarget = { x: 0, y: 0.9, z: 0};
export const cameraPosStart: CameraPosType = { x: 3, y: 2.25, z: 8 };
export const cameraPosChange: CameraPosType = { x: 0, y: 1.25, z: 8 };
export const scene: Scene = new Scene();
export const sceneName = 'Saffron';

export const renderer: WebGLRenderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance',
});

export const composer: EffectComposer = new EffectComposer(renderer);

export const appParent: HTMLDivElement = renderer.domElement.closest(
  `#${appWrapperId}`
) as HTMLDivElement;

export const camera: PerspectiveCamera = new PerspectiveCamera(
  30,
  renderer.domElement.offsetWidth / renderer.domElement.offsetHeight,
  0.1,
  1000
);

export const renderPass: RenderPass = new RenderPass(scene, camera);

export const controls: OrbitControls = new OrbitControls(
  camera,
  renderer.domElement
);
export const raycaster: Raycaster = new Raycaster();
export const mouse: Vector2 = new Vector2();
