// import { Object3D } from 'three';
import { camera, cameraPosChange, cameraPosStart, controls, renderer /* , scene */ } from '../constants';
import { useStore } from '../store';

export function handleScreenshots(callback?: () => void) {
  controls.enabled = false;

  const { dispatch /*, state: { currentModelName } */ } = useStore();
  const strMime: string = 'image/png';
  const newImagesArr: string[] = [];

  // const item: Object3D = scene.getObjectByName(currentModelName);

  /* item.traverse((child: any) => {
    if (child.isSprite) {
      child.visible = false;
    }
  }); */

  camera.position.set(cameraPosChange.x, cameraPosChange.y, 2); // cameraPosChange.z
  controls.update();

  const imgData1: string = renderer.domElement.toDataURL(strMime);

  newImagesArr.push(imgData1);

  setTimeout(() => {
    controls.reset();
    camera.position.set(cameraPosStart.x, cameraPosStart.y, 2); // cameraPosStart.z
    controls.target.set(0, 0.9, 0);
    controls.update();

    const imgData2: string = renderer.domElement.toDataURL(strMime);

    newImagesArr.push(imgData2);
  
    dispatch({ type: 'SET_ORDER_IMAGES', payload: newImagesArr });

    /* item.traverse((child: any) => {
      if (child.isSprite) {
        child.visible = true;
      }
    }); */

    if (typeof callback === 'function') {
      callback();
    }
  }, 1);

  controls.enabled = true;
}