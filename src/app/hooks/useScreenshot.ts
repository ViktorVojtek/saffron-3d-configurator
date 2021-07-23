import {
  camera,
  cameraPosition,
  controls,
  renderer
} from '../three/constants';

export default function useScreenshot(): (callback?: () => void) => string[] {
  function handleTakeScreenshot(callback?: () => void): string[] {
    const mime = 'image/png';
    const images: string[] = [];
  
    controls.enabled = false;
    camera.position.set(cameraPosition.change.x, cameraPosition.change.y, cameraPosition.change.z);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    controls.reset();
    camera.position.set(cameraPosition.start.x, cameraPosition.start.y, cameraPosition.start.z);
    controls.target.set(0, 0.9, 0);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    controls.enabled = true;

    if (typeof callback === 'function') {
      callback();
    }
  
    return images;
  }

  return handleTakeScreenshot;
}
