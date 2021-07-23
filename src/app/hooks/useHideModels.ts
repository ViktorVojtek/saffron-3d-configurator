import { Object3D } from 'three';
import { scene } from '../three/constants';

export default function useHideModels(): void {
  scene.traverse((child: Object3D) => {
    const isBed: boolean = checkIsBed(child.name.toLowerCase());
    
    if (isBed) {
      child.visible = false;
    }
  });

  function checkIsBed(name: string): boolean {
    const beds = ['aurelia', 'authentica', 'phantasia', 'luna', 'nuova'];

    return beds.includes(name);
  }
}