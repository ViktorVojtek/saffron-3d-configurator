import { MeshLambertMaterial, Object3D, sRGBEncoding, Texture } from 'three';
import { animate } from './animate';
import { renderer, scene } from '../constants';
import { AjaxTextureLoader, onProgress } from '../index';
import { useStore, ToLoadEnum } from '../store';

export function changeBedMaterial(i: number, tuft?: boolean) {
  const { state } = useStore();
  const { currentModelName, headTitle, headIsSet, legMatIdx, matIdx, models, objIdx, tuftIdx } = state;

  console.log('CHANGE MATERIAL OF:');
  console.log(models[objIdx]);

  console.log(headTitle);

  const object: Object3D = scene.getObjectByName(currentModelName);
  const bedItem = object.getObjectByName('Bed');
  const headItem = headIsSet ? object.getObjectByName(headTitle) : object.getObjectByName(models[objIdx].head);

  const bedTexture: string = tuft
    ? models[objIdx].textures.tuft[i].maps[matIdx]
    : (
      tuftIdx > 0 ? models[objIdx].textures.tuft[tuftIdx].maps[i] : models[objIdx].textures.bed[i].map
    );
  const headTextures: any[] = models[objIdx].textures.head;

  let headTexture: string;

  console.log(headTextures);
  console.log('headIsSet', headIsSet);

  if (!tuft) {
    // SET HEAD TEXTURE IF NOT TUFT CHANGE
    for (let j: number = 0; j < headTextures.length; j += 1) {
      if(headIsSet) {
        if (headTextures[j].title.toLowerCase() === headTitle.toLowerCase()) {
          if (headTitle.toLowerCase() === 'frame') {
            headTexture = headTextures[j].maps[i].wood[legMatIdx];
          } else {
            headTexture = headTextures[j].maps[i].map;
          }
          break;
        }  
      } else {
        if(headTextures[j].title.toLowerCase() === models[objIdx].head.toLowerCase()) {
          if (models[objIdx].head.toLowerCase() === 'frame') {
            headTexture = headTextures[j].maps[i].wood[legMatIdx];
          } else {
            headTexture = headTextures[j].maps[i].map;
          }
          break;
        }
      }
    }
  }

  console.log('Change bed material, head material accordingly.');
  console.log(headTexture);

  changeMaterial(bedItem, bedTexture, () => {
    if (!tuft) {
      console.log('Going to change Head');
      console.log(headItem);

      console.log(headTexture);
      changeMaterial(headItem, headTexture, () => animate());
    } else {
      animate();
    }
  });
}

export function changeLegMaterial(i: number): void {
  const {
    dispatch,
    state: {
      currentModelName, headIdx, legIdx, legTitle, matIdx, models, objIdx
    }
  } = useStore();

  const object: Object3D = scene.getObjectByName(currentModelName);
  const legItems: Object3D = object.getObjectByName('Legs');

  let legItem: Object3D;
  let legTexture: string = models[objIdx].textures.leg[legIdx].maps[i].map;
  let headIsFrame: boolean = false;
  let headItem: Object3D;
  let headTexture: string;

  const headItems: Object3D = object.getObjectByName('Heads');

  headItems.traverse((child: any) => {
    if (child.isMesh && child.visible && child.name.toLowerCase() === 'frame') {
      headIsFrame = true;
      headItem = child;
      headTexture = models[objIdx].textures.head[headIdx].maps[matIdx].wood[i];
    }
  });

  legItems.traverse((child: any) => {
    if (child.isMesh) {
      if (child.name === legTitle) {
        legItem = child;
      }
    }
  });

  if (currentModelName.toLowerCase().indexOf('aurelia') > -1) {
    const bedItem: Object3D = object.getObjectByName('Bed');
    const bedTexture: string = models[objIdx].textures.bed[matIdx].wood[i];

    if (headIsFrame) {
      changeMaterial(bedItem, bedTexture, () => {
        changeMaterial(headItem, headTexture, () => {
          changeMaterial(legItem, legTexture, () => {
            animate();
          });
        });
      });
    } else {
      changeMaterial(bedItem, bedTexture, () => {
        changeMaterial(legItem, legTexture, () => {
          animate();
        });
      });
    }
  } else {
    if (headIsFrame) {
      changeMaterial(headItem, headTexture, () => {
        changeMaterial(legItem, legTexture, () => {
          animate();
        });
      });
    } else {
      changeMaterial(legItem, legTexture, () => {
        animate();
      });
    }
  }

  // dispatch({ type: 'SET_LEG_MAT_IDX', payload: i });
}

export function changeHead(items: any[], i: number): void {
  const { state, dispatch } = useStore();
  const { currentModelName, headIdx, legMatIdx, matIdx, models, objIdx } = state;
  const object: Object3D = scene.getObjectByName(currentModelName);
  const headItems: Object3D = object.getObjectByName('Heads');
  const headTextures: any[] = models[objIdx].textures.head;
  let jNumFound: number = 0;

  let headTexture: string;

  for (let j: number = 0; j < headTextures.length; j += 1) {
    if (headTextures[j].title.toLowerCase() === items[i].title.toLowerCase()) {
      headTexture = headTextures[j].maps[matIdx].map;
      jNumFound = j;
      break;
    }
  }

  (headItems as any).traverse((child: any) => {
    if (child.isMesh) {
      child.visible = false;

      if (items[i].title.toLowerCase() === 'frame') {
        console.log(models[objIdx].textures.head[jNumFound]);
        console.log(models[objIdx].textures.head[jNumFound].maps[matIdx]);
        headTexture = models[objIdx].textures.head[jNumFound].maps[matIdx].wood[legMatIdx];
      }

      if (child.name.toLowerCase() === items[i].title.toLowerCase()) {
        const headMaterial: MeshLambertMaterial = new MeshLambertMaterial({
          reflectivity: 0.15
        });

        child.material = headMaterial;
        child.material.needsUpdate = true;

        changeMaterial(child, headTexture, () => {
          child.visible = true;

          // dispatch({ type: 'SET_HEAD_TITLE', payload: items[i].title });
          // dispatch({ type: 'SET_HEAD_IDX', payload: i});

          animate();
        });
      }
    }
  });
}

export function changeLeg(items: any[], i: number) {
  const {
    dispatch,
    state: { currentModelName, legMatIdx, models, objIdx }
  } = useStore();

  /* dispatch({ type: 'SET_LEG_IDX', payload: i });
  dispatch({
    type: 'SET_LEG_TITLE',
    payload: models[objIdx].legThumbs[i].title,
  }); */

  const object: Object3D = scene.getObjectByName(currentModelName);
  const legItems: Object3D = object.getObjectByName('Legs');
  const legTextures: any[] = models[objIdx].textures.leg;
  let legTexture: string;

  for (let j: number = 0; j <= legTextures.length; j += 1) {
    if (legTextures[j].title.toLowerCase() === items[i].title.toLowerCase()) {
      legTexture = legTextures[j].maps[legMatIdx].map;
      break;
    }
  }

  (legItems as any).traverse((child: any) => {
    if (child.isMesh) {
      child.visible = false;

      if (child.name.toLowerCase() === items[i].title.toLowerCase()) {
        const legMaterial: MeshLambertMaterial = new MeshLambertMaterial({
          reflectivity: 0.225,
        });

        child.material = legMaterial;
        child.material.needsUpdate = true;

        changeMaterial(child, legTexture, () => {
          child.visible = true;

          /* if (models[objIdx].title.toLowerCase() === 'aurelia') {
            if (child.name.toLowerCase() !== 'aurelia') {
              if (object.position.y === 0) {
                // object.position.set(0, 0.04, 0);
              }
            } else {
              if (object.position.y !== 0) {
                object.position.set(0, 0, 0);
              }
            }
          } */

          animate();
        });
      }
    }
  });
}

export function changeMaterial(
  item: Object3D,
  textureImg: string,
  callback?: () => void
): void {
  const Loader = AjaxTextureLoader();

  if ((item as any).material && (item as any).material.map) {
    (item as any).material.map.dispose();
  }

  Loader.load(textureImg, (texture: Texture) => {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.encoding = sRGBEncoding;

    (item as any).material.map = texture;
    (item as any).material.needsUpdate = true;

    if (typeof callback === 'function') {
      callback();
    }

  }, (event: ProgressEvent<EventTarget>) => { onProgress(event, ToLoadEnum.TEXTURE) });
}