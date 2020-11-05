import { animate } from './animate';
import { scene } from '../constants';

export const toggleEditBtn: (objectName: string, edit: boolean) => void = (objectName, edit) => {
  scene.traverse((child) => {

    if (child.name === objectName) {
      // console.log(true);
      /* if (child.name.indexOf('Icon - ') > -1) {
        child.visible = edit;
      } */
    }
  });

  animate();
};
