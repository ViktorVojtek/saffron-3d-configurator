import { useEffect } from 'react';
import { useStore } from '../store'; 
import { animate, fetchObjects, IModel } from '../index';
import Model from '../../components/THREE/Model';
import { scene, domainUri, vendor } from '../constants';
import { Object3D } from 'three';

export const useModels: (
  models: any[],
  objIdx: number,
  tuftIdx: number,
  edit: boolean,
  menuItem: number
) => void = (models, robjIdx, tuftIdx, edit, menuItem) => {
  const { state, dispatch } = useStore();
  const { currentModelName } = state;

  useEffect(() => {
    (async function () {
      try {
        const { search } = window.location;

        if (search && search.length > 0) {
          const MODEL_IDX: number = await setModelIdx(search);

          dispatch({ type: 'SET_OBJ_IDX', payload: MODEL_IDX });
        }

        if (models.length < 1) {
          const modelItems = await fetchObjects(`${domainUri}/${vendor}/data.json`);

          dispatch({ type: 'SET_MODELS', payload: modelItems });
        } else {
          const { state } = useStore();
          const { matIdx, objIdx } = state;
          const activeModelName: string = `Group - ${models[objIdx].vendor}: ${models[objIdx].title}`;
          const menuItems: any[] = await setCurrentMenuItems(menuItem, models, objIdx);

          if (activeModelName !== currentModelName) {
            const modelData: IModel = {
              head: models[objIdx].head,
              headPosition: models[objIdx].headPosition,
              leg: models[objIdx].leg,
              legTexture:
                models[objIdx].textures.leg[models[objIdx].legIdx].maps[0].map,
              path: models[objIdx].model[0],
              position: models[objIdx].position,
              scale: models[objIdx].scale,
              bedTexture: models[objIdx].textures.bed[matIdx].map,
              headTexture:
                models[objIdx].textures.head[models[objIdx].headIdx].maps[
                  matIdx
                ].map,
              tuft: models[objIdx].textures.tuft[tuftIdx],
              titleID: `${models[objIdx].vendor}: ${models[objIdx].title}`,
              size: models[objIdx].size,
              bedTSize: models[objIdx].bedTSize,
              headTSize: models[objIdx].headTSize,
              legTSize: models[objIdx].legTSize
            };

            const objectExist: Object3D = scene.getObjectByName(
              currentModelName
            );

            if (!objectExist) {
              addModelToScene(modelData, activeModelName);
            } else {
              objectExist.visible = false;
              animate();

              const activeExistInObjects: Object3D = scene.getObjectByName(
                activeModelName
              );

              if (activeExistInObjects) {
                activeExistInObjects.visible = true;
              } else {
                addModelToScene(modelData, activeModelName);
              }
            }

            dispatch({
              type: 'SET_CURRENT_MODEL_NAME',
              payload: activeModelName,
            });
            dispatch({ type: 'SET_HEAD_IDX', payload: models[objIdx].headIdx });
            dispatch({
              type: 'SET_HEAD_TITLE',
              payload: models[objIdx].head,
            });
          }

          dispatch({ type: 'SET_MENU_ITEMS', payload: menuItems });

          scene.traverse((child) => {
            if (child.name.indexOf('Icon - ') > -1) {
              child.visible = edit;
            }
          });

          animate();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [models, robjIdx, edit, menuItem]);
};

function setModelIdx(search: string): Promise<number> {
  return new Promise((resolve) => {
    let modelIdx: number = 0;

    if (search && search.length > 0) {
      const param = search.toLowerCase().split('ref=')[1];

      switch (param) {
        case 'aur':
          modelIdx = 0;
          break;
        case 'aut':
          modelIdx = 1;
          break;
        case 'pha':
          modelIdx = 2;
          break;
        case 'lun':
          modelIdx = 3;
          break;
        case 'nuo':
          modelIdx = 4;
          break;
        default:
          modelIdx = 0;
          break;
      }
    }

    resolve(modelIdx);
  });
}

function setCurrentMenuItems(menuItem: number, models: any, objIdx: number): Promise<any[]> {
  return new Promise((resolve) => {
    let currentMenuItems: any[];

    switch (menuItem) {
      case 0:
        currentMenuItems = [...models[objIdx].matThumbs];
        break;
      case 1:
        currentMenuItems = [...models[objIdx].headThumbs];
        break;
      case 2:
        currentMenuItems = [...models[objIdx].legThumbs];
        break;
      default:
        currentMenuItems = [...models[objIdx].matThumbs];
        break;
    }

    resolve(currentMenuItems);
  });
}

async function addModelToScene(data: IModel, title: string): Promise<void> {
  const model: Object3D = await Model(data);
  const inScene: boolean = isModelInScene(title);

  if (!inScene) {
    scene.add(model);
    animate();
  }
}

function isModelInScene(title: string): boolean {
  let bedExist: boolean = false;

  scene.traverse((child) => {
    if ((child as any).isGroup && child.name === title) {
      bedExist = true;
    }
  });

  return bedExist;
}