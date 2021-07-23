import { useEffect } from 'react';
import { camera, renderer } from '../three/constants';
import animate from '../three/utils/animate';

export default function useResize(): void {
  useEffect(() => {
    window.addEventListener('onResize', onWindowResize, false);

    return () => window.removeEventListener('onResize', onWindowResize, false);
  }, []);
}

function onWindowResize(): void {
  console.log(renderer.domElement);
  const { offsetHeight: height, offsetWidth: width } = renderer.domElement;

  renderer.setSize(width, height, true);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  animate();
}
