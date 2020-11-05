export interface IModel {
  head: string;
  headPosition: {
    x: number;
    y: number;
    z: number;
  };
  leg: string;
  legTexture: string;
  path: string;
  position: number[];
  scale: number;
  bedTexture: string;
  headTexture: string;
  tuft: {
    title: string;
    color: string;
    map: string;
  };
  titleID: string;
  size: number;
  bedTSize: number,
  headTSize: number,
  legTSize: number
}

export { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js';

export { AjaxTextureLoader } from './fn/ajaxTextureLoader';

export { animate } from './fn/animate';

export { useModels } from './fn/useModels';

export { fetchObjects } from './fn/fetchObjects';

export { onDocumentMouseDown, onDocumentTouchDown } from './fn/interaction';

export { onWindowResize } from './fn/resize';

export { handleScreenshots } from './fn/screenshots';

export { changeBedMaterial, changeHead, changeLeg, changeLegMaterial } from './fn/changeParts';

export { onProgress } from './fn/progress';

export { toggleEditBtn } from './fn/toggleEdit';
