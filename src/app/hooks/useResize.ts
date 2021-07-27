import { useEffect } from 'react';
import { PerspectiveCamera } from 'three';
import useAnimate from './useAnimate';
import useCamera from './useCamera';
import useRenderer from './useRenderer';

export default function useResize(): void {
  const animate = useAnimate();
  const [camera] = useCamera();
  const [renderer] = useRenderer();

  useEffect(() => {
    if (!camera || !renderer) {
      return;
    }

    function onWindowResize(): void {
      const { offsetWidth: width } = renderer.domElement.closest('#canvasWrapper') as HTMLElement;
      const { offsetHeight } = renderer.domElement.closest('#canvas') as HTMLElement;
      const height: number = offsetHeight || Math.round(window.innerHeight);

      renderer.setSize(width, height, true);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
    
      (camera as PerspectiveCamera).aspect = width / height;
      (camera as PerspectiveCamera).updateProjectionMatrix();
    
      animate();
    }

    window.addEventListener('resize', onWindowResize, false);

    return () => window.removeEventListener('resize', onWindowResize, false);
  }, [camera, renderer]);
}
