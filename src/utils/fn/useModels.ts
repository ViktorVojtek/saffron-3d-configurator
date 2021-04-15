import { useEffect } from 'react';
import { useStore } from '../store'; 
import { animate, fetchObjects, IModel } from '../index';
import Model from '../../components/THREE/Model';
import { scene, domainUri, vendor } from '../constants';
import { Object3D, Texture, sRGBEncoding, Mesh, MeshLambertMaterial } from 'three';
import { AjaxTextureLoader, onProgress } from '../../utils';
import { ToLoadEnum } from '../../utils/store';
import { renderer } from '../../utils/constants';

export const useModels: (
  models: any[],
  objIdx: number,
  tuftIdx: number,
  legIdx: number,
  edit: boolean,
  menuItem: number
) => void = (models, robjIdx, tuftIdx, legIdx, edit, menuItem) => {
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

        // console.log(models);

        if (models.length < 1) {
          const url: string = `${domainUri}/${vendor}/data.json`;
          // console.log(url);
          const data = await fetchObjects(url);

          // console.log(data);
          
          const modelItems = data.models;

          dispatch({ type: 'SET_MODELS', payload: modelItems });
          dispatch({ type: 'SET_HEAD_TITLE', payload: modelItems[0].head });
        } else {
          const { state } = useStore();
          const { matIdx, legMatIdx, legIsSet, legTitle, objIdx, headIdx, headTitle, headIsSet, tuftIdx } = state;
          const activeModelName: string = `Group - ${models[objIdx].vendor}: ${models[objIdx].title}`;
          const menuItems: any[] = await setCurrentMenuItems(menuItem, models, objIdx);

          console.log('ACTIVE MODEL: ', activeModelName);
          console.log('PREVIOS MODEL', currentModelName);

          console.log('LEG IS SET: ', legIsSet);
          console.log('LEG TITLE: ', legTitle);

          const modelData: IModel = {
            head: headIsSet ? headTitle : models[objIdx].head,
            headPosition: models[objIdx].headPosition,
            leg: legIsSet ? (
              legTitle.toLowerCase() === 'aurelia' && objIdx > 0 ? 'Cube' : legTitle
            ) : models[objIdx].leg, // models[objIdx].leg,
            legTexture:
              models[objIdx].textures.leg[legIdx || models[objIdx].legIdx].maps[legMatIdx || 0].map,
            path: models[objIdx].model[0],
            position: models[objIdx].position,
            scale: models[objIdx].scale,
            bedTexture: tuftIdx > 0 ? models[objIdx].textures.tuft[tuftIdx].maps[matIdx] : models[objIdx].textures.bed[matIdx].map,
            headTexture: headIsSet ?
              models[objIdx].textures.head[headIdx].maps[matIdx].map :
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

          console.log('\n');
          console.log('MODEL DATA, LEG: ', modelData.leg);

          if (activeModelName !== currentModelName) {
            const objectExist: Object3D = scene.getObjectByName(
              activeModelName, // currentModelName
            );

            // Hide all Models
            scene.traverse((child: any) => {
              if (child.name.toLowerCase().indexOf('group - saffron') > -1) {
                child.visible = false;
              }
            });

            console.log('OBJECT EXIST IN SCENE: ', objectExist);
            console.log('\n');

            if (!objectExist) {
              console.log('MODEL MOT EXIST, ADD IN');
              // console.log(modelData);
              // modelData.head = models[objIdx].head;
              // console.log(modelData.head);

              addModelToScene(modelData, activeModelName);
            } else {
              console.log('MODEL EXIST, PROCESS');
              objectExist.visible = false;
              // animate();

              const activeExistInObjects: Object3D = scene.getObjectByName(
                activeModelName
              );

              console.log('\n');
              console.log(activeExistInObjects);

              // if (activeExistInObjects) {
                console.log('Selected bed exists in scene');
                activeExistInObjects.visible = false;
                const TextureLoader = AjaxTextureLoader();

                const bed = activeExistInObjects.getObjectByName('Bed') as Mesh;
                const heads = activeExistInObjects.getObjectByName('Heads');
                const head = headIsSet ? headTitle : models[objIdx].head;
                const legs = activeExistInObjects.getObjectByName('Legs');
                const leg = legIsSet ? legTitle : models[objIdx].leg;

                const headTexture = modelData.headTexture;
                const bedTexture = modelData.bedTexture;
                const legTexture = modelData.legTexture;

                // Change Head/Texture
                heads.traverse((child: any) => {
                  if (child.isMesh) {
                    child.visible = false;

                    if (child.name.toLowerCase() === head.toLowerCase()) {
                      console.log('Head FOUND: ', head);

                      TextureLoader.load(headTexture, (texture: Texture) => {
                        console.log('Head Texture Loaded');
                        // child.visible = false;
                        const newHeadMaterial = new MeshLambertMaterial({
                          reflectivity: 0.15,
                        });

                        child.material = newHeadMaterial;
                        child.material.needsUpdate = true;

                        if ((child.material && child.material.map)) {
                          child.material.map.dispose();
                        }

                        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                        texture.encoding = sRGBEncoding;

                        console.log(child.material.map);
                        console.log(texture);
                        
                        child.material.map = texture;
                        child.material.needsUpdate = true;

                        // Change Bed Texture
                        TextureLoader.load(bedTexture, (texture: Texture) => {
                          console.log('Head Texture Loaded');
                          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                          texture.encoding = sRGBEncoding;

                          const bedMaterial =  new MeshLambertMaterial({
                            reflectivity: 0.15,
                          });
                          
                          bed.material = bedMaterial;
                          bed.material.needsUpdate = true;

                          if ((bed.material && (bed.material as any).map)) {
                            (bed.material as any).map.dispose();
                          }

                          (bed.material as any).map = texture;
                          bed.material.needsUpdate = true;

                          // Head visibility
                          // child.visible = true;

                          legs.traverse((legItem: any) => {
                            if (legItem.isMesh) {
                              legItem.visible = false;

                              if(legItem.name.toLowerCase() === leg.toLowerCase()) {
                                console.log('FOUND LEG: ', leg);
                                // Load Leg texture
                                TextureLoader.load(legTexture, (texture: Texture) => {
                                  console.log('Legs Texture Loaded');
                                  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                                  texture.encoding = sRGBEncoding;
        
                                  const legMaterial =  new MeshLambertMaterial({
                                    reflectivity: 0.15,
                                  });
                                  
                                  legItem.material = legMaterial;
                                  legItem.material.needsUpdate = true;
        
                                  if ((legItem.material && (legItem.material as any).map)) {
                                    (legItem.material as any).map.dispose();
                                  }
        
                                  (legItem.material as any).map = texture;
                                  legItem.material.needsUpdate = true;

                                  // Leg visibility
                                  legItem.visible = true;
        
                                  // Head visibility
                                  child.visible = true;
        
                                  // Model visibility
                                  activeExistInObjects.visible = true;
                                  animate();
                                }, (event: ProgressEvent<EventTarget>) => {
                                  console.log('Texture loading');
        
                                  onProgress(event, ToLoadEnum.HEAD_TEXTURE)
                                }, (err) => console.log(err));
                              }
                            }
                          });

                          // Model visibility
                          // activeExistInObjects.visible = true;
                          // animate();
                        }, (event: ProgressEvent<EventTarget>) => {
                          console.log('Texture loading');

                          onProgress(event, ToLoadEnum.HEAD_TEXTURE)
                        }, (err) => console.log(err));
                        // End Bed
                      }, (event: ProgressEvent<EventTarget>) => {
                        console.log('Texture loading');

                        onProgress(event, ToLoadEnum.HEAD_TEXTURE)
                      }, (err) => console.log(err));
                    }
                  }
                });
              // } else {
                // console.log('NOT EXIST IN OBJECTS OF SCENE');
                // console.log(modelData);
                // modelData.head = models[objIdx].head;
                /* modelData.headTexture = models[objIdx].textures.head[models[objIdx].headIdx].maps[
                  matIdx
                ].map; */
                // console.log(modelData.head);
                // console.log(modelData.headTexture);

                // addModelToScene(modelData, activeModelName);
              // }
            }

            dispatch({
              type: 'SET_CURRENT_MODEL_NAME',
              payload: activeModelName,
            });
            // dispatch({ type: 'SET_HEAD_IDX', payload: models[objIdx].headIdx });
            /* dispatch({
              type: 'SET_HEAD_TITLE',
              payload: models[objIdx].head,
            }); */
          }

          dispatch({ type: 'SET_MENU_ITEMS', payload: menuItems });

          /* scene.traverse((child) => {
            if (child.name.indexOf('Icon - ') > -1) {
              child.visible = edit;
            }
          }); */

          // animate();
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