import { Group } from 'three';
import { scene } from '../three/constants';

export default function useAddToScene(object: Group, name: string): void {
  object.name = name.toLowerCase();
  object.visible = false;

  scene.add(object);
}
