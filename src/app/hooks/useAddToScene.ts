import { Group } from 'three';
import useScene from './useScene';

export default function useAddToScene(): {
  addToScene: (object: Group, name: string) => void;
} {
  const [scene] = useScene();

  function handleAddToScene(object: Group, name: string): void {
    object.name = name.toLowerCase();
    object.visible = false;

    scene?.add(object);
  }

  return {
    addToScene: handleAddToScene,
  };
}
