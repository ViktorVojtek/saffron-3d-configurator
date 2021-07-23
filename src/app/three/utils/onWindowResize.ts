import { camera, renderer } from '../constants';
import animate from './animate';

export default function onWindowResize(): void {
  const { offsetHeight: height, offsetWidth: width } = renderer.domElement.parentElement as HTMLDivElement;

  renderer.setSize(width, height, true);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  animate();
}
