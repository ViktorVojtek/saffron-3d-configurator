import { useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { PerspectiveCamera } from 'three';
import useAnimate from './useAnimate';
import useCamera from './useCamera';
import useRenderer from './useRenderer';
import useScene from './useScene';

export default function useResize(): void {
  const animate = useAnimate();
  const [camera] = useCamera();
  const [renderer] = useRenderer();
  const [scene] = useScene();

  useEffect(() => {
    if (!camera || !renderer) {
      return;
    }

    function onWindowResize(): void {
      const width: number = isMobileOnly ? window.innerWidth : renderer.domElement?.parentElement?.parentElement?.offsetWidth as number;
      const { innerHeight } = window;
      const height: number = isMobileOnly
      ? Math.round(
        innerHeight / (2.5)
      )
      : innerHeight;

      // console.log(width, height);

      renderer.setSize(width, height, true);
      renderer.compile(scene, (camera as PerspectiveCamera));
      renderer.setPixelRatio(window.devicePixelRatio || 1);
    
      (camera as PerspectiveCamera).aspect = width / height;
      (camera as PerspectiveCamera).updateProjectionMatrix();
    
      animate();
    }

    window.addEventListener('resize', onWindowResize, false);

    return () => window.removeEventListener('resize', onWindowResize, false);
  }, [camera, renderer]);
}
