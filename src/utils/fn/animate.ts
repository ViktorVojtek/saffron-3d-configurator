import { camera, composer, renderer, scene } from '../constants';

export function animate(): void {
  renderer.render(scene, camera);
}