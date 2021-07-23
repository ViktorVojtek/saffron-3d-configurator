import { camera, renderer, scene } from '../constants';

export default function animate(): void {
  renderer.render(scene, camera);
}
