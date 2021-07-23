import { scene } from '../three/constants';

export default function useIsInScene(name: string): boolean {
  const isInScene = scene.getObjectByName(name);

  if (!isInScene) {
    return false;
  }

  return true;
}
