import useCamera from './useCamera';
import useRenderer from './useRenderer';
import useScene from './useScene';

export default function useAnimate(): () => void {
  const [camera] = useCamera();
  const [renderer] = useRenderer();
  const [scene] = useScene();

  function animate(): void {
    if (!camera || !renderer || !scene) {
      return;
    }

    renderer.render(scene, camera);
  }

  return animate;
}
