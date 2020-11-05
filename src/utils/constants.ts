import {
  Scene,
  Raycaster,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type CameraPosType = {
  x: number;
  y: number;
  z: number;
};

export { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const appWrapperId: string = 'App'; 
export const containerId: string = 'canvas';
export const vendor: string = 'saffron';
export const cameraPosStart: CameraPosType = { x: 3, y: 2.25, z: 8 };
export const cameraPosChange: CameraPosType = { x: 0, y: 1.25, z: 8 };
export const scene: Scene = new Scene();

export const renderer: WebGLRenderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance',
});

export const appParent: HTMLDivElement = renderer.domElement.closest(
  `#${appWrapperId}`
);

export const camera: PerspectiveCamera = new PerspectiveCamera(
  30,
  renderer.domElement.offsetWidth / renderer.domElement.offsetHeight,
  0.1,
  1000
);

export const controls: OrbitControls = new OrbitControls(
  camera,
  renderer.domElement
);
export const raycaster: Raycaster = new Raycaster();
export const mouse: Vector2 = new Vector2();
