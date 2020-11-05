import { animate } from './animate';
import { camera, renderer } from '../constants';
import { useStore } from '../store';

export function onWindowResize(): void {
  const { dispatch } = useStore();
  const height = renderer.domElement.offsetHeight;
  const width = renderer.domElement.offsetWidth;

  renderer.setSize(width, height, true);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  dispatch({ type: 'SET_DIMENSIONS', payload: { width, height } });

  animate();
}