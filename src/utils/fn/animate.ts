import { camera, renderer, scene } from '../constants';

export function animate(): void {
  renderer.render(scene, camera);
}