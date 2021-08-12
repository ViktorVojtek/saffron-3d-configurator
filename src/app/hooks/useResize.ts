import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { PerspectiveCamera } from 'three';
import useAnimate from './useAnimate';
import useCamera from './useCamera';
import useOrientation from './useOrientation';
import useRenderer from './useRenderer';
import useScene from './useScene';

export default function useResize(): void {
  const animate = useAnimate();
  const [camera] = useCamera();
  const orientation = useOrientation();
  const [renderer] = useRenderer();
  const [scene] = useScene();

  useEffect(() => {
    if (!camera || !renderer) {
      return;
    }

    function onWindowResize(): void {
      const { devicePixelRatio: ratio, innerHeight } = window;

      const width: number = isMobile
        ? screen.availWidth
        : renderer.domElement?.parentElement?.parentElement?.offsetWidth as number;
      const height: number = isMobile
        ? Math.round(
          screen.availHeight / (
            orientation === 'landscape' ? 2 : 2.5
          )
        )
        : innerHeight;

      renderer.setSize(width, height, true);
      renderer.compile(scene, (camera as PerspectiveCamera));
      renderer.setPixelRatio(ratio || 1);
    
      (camera as PerspectiveCamera).aspect = (width / height);
      (camera as PerspectiveCamera).updateProjectionMatrix();
      
      animate();
    }

    window.addEventListener('resize', onWindowResize, false);

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, [camera, renderer, orientation]);
}
