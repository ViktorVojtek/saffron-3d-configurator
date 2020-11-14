import {
  Group,
  Sprite,
  MeshLambertMaterial,
  Object3D,
  Texture,
  sRGBEncoding
} from 'three';
import Icon from './Icon';
import { animate, AjaxTextureLoader, IModel, onProgress } from '../../utils';
import { FBXLoader, renderer } from '../../utils/constants';
import { useStore, ToLoadEnum } from '../../utils/store';

export default function (model: IModel): Promise<Object3D> {
  const { dispatch } = useStore();

  const HeadIcon: Sprite = Icon('Head', { x: 0.1, y: 1.75, z: -0.9 }, () => {
    dispatch({ type: 'SET_TUFTS', payload: false });
    dispatch({ type: 'SET_MENU_ITEM', payload: 1 });
    dispatch({ type: 'TOGGLE_MENU', payload: true });
  });
  const BedIcon: Sprite = Icon('Bed', { x: 1.05, y: 0.6, z: 1.15 }, () => {
    dispatch({ type: 'SET_TUFTS', payload: false });
    dispatch({ type: 'SET_MENU_ITEM', payload: 0 });
    dispatch({ type: 'TOGGLE_MENU', payload: true });
  });
  const LegIcon: Sprite = Icon('Leg', { x: 1.05, y: 0.15, z: 1.15 }, () => {
    dispatch({ type: 'SET_TUFTS', payload: false });
    dispatch({ type: 'SET_MENU_ITEM', payload: 2 });
    dispatch({ type: 'TOGGLE_MENU', payload: true });
  });

  return new Promise(function (resolve, reject) {
    const Loader: FBXLoader = new FBXLoader();
    const ajaxTextureLoader = AjaxTextureLoader();

    const onLoaded = (object: Object3D) => {
      const { bedTexture, position, scale, titleID } = model;

      object.position.set(position[0], position[1], position[2]);
      object.scale.set(scale, scale, scale);
      object.name = titleID;
      object.castShadow = true;

      if (bedTexture) {
        ajaxTextureLoader.load(
          bedTexture,
          (texture: Texture) => {
            setModel(object, texture);
          },
          (event: ProgressEvent<EventTarget>) => { onProgress(event, ToLoadEnum.BED_TEXTURE) },
          (error) => console.log(error)
        );
      } else {
        setModel(object);
      }
    };

    const onError: (error: Error | ErrorEvent) => void = function (error) {
      console.log(error);
    };

    async function setModel(object: Object3D, texture?: any) {
      const { headTexture, legTexture } = model;
      const group: Group = new Group();

      let material: MeshLambertMaterial = new MeshLambertMaterial({
        reflectivity: 0.15
      });

      if (texture) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.encoding = sRGBEncoding;
        material.map = texture;
      }

      const bed = object.getObjectByName('Bed');

      (bed as any).material = material;
      (bed as any).materialNeedsUpdate = true;

      const updatedObject = object;

      updatedObject.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
        }

        if (
          child.name.toLowerCase().indexOf('legs') > -1 ||
          child.name.toLowerCase().indexOf('heads') > -1
        ) {
          child.traverse((childEl: any) => {
            if (childEl.isMesh) {
              childEl.visible = false;
            }
          });
        }
      });

      const legs = updatedObject.getObjectByName('Legs');
      const heads = updatedObject.getObjectByName('Heads');

      let headTxtImage: Texture;

      ajaxTextureLoader.load(headTexture, (hTextureImg: Texture) => {
        headTxtImage = hTextureImg;
        headTxtImage.anisotropy = renderer.capabilities.getMaxAnisotropy();
        headTxtImage.encoding = sRGBEncoding;

        const headMaterial: MeshLambertMaterial = new MeshLambertMaterial({
          map: headTxtImage,
          reflectivity: 0.15
        });

        heads.traverse((child: any) => {
          if (
            child.isMesh &&
            child.name.toLowerCase() === model.head.toLowerCase()
          ) {
            child.material = headMaterial;
            child.material.needsUpdate = true;
            child.visible = true;
            
            dispatch({ type: 'SET_HEAD_TITLE', payload: model.head });

            let legTxtImage: Texture;

            ajaxTextureLoader.load(legTexture, (lTextureImg: Texture) => {
              legTxtImage = lTextureImg;

              legTxtImage.anisotropy = renderer.capabilities.getMaxAnisotropy();
              legTxtImage.encoding = sRGBEncoding;

              const legMaterial: MeshLambertMaterial = new MeshLambertMaterial({
                map: legTxtImage,
                reflectivity: 0.225,
              });

              legs.traverse((child: any) => {
                if (
                  child.isMesh &&
                  child.name.toLowerCase() === model.leg.toLowerCase()
                ) {
                  child.material = legMaterial;
                  child.material.needsUpdate = true;
                  child.visible = true;
                  
                  dispatch({ type: 'SET_LEG_TITLE', payload: model.leg });

                  updatedObject.castShadow = true;

                  group.name = `Group - ${model.titleID}`;

                  group.add(HeadIcon);
                  group.add(BedIcon);
                  group.add(LegIcon);

                  group.add(updatedObject);

                  const { id } = updatedObject;

                  dispatch({ type: 'SET_OBJECT_ID', payload: id });
                  dispatch({ type: 'SET_LOADED', payload: true });
                  
                  animate();
                  resolve(group);
                }
              });
            }, (event: ProgressEvent<EventTarget>) => onProgress(event, ToLoadEnum.LEG_TEXTURE), (err) => console.log(err));
          }
        });
      }, (event: ProgressEvent<EventTarget>) => onProgress(event, ToLoadEnum.HEAD_TEXTURE), (err) => console.log(err));
    }

    Loader.load(model.path, onLoaded, (event: ProgressEvent<EventTarget>) => onProgress(event, ToLoadEnum.MODEL), onError);
  });
}
