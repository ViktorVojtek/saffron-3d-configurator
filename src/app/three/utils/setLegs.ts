import { Group, Mesh, Object3D, Texture } from 'three';
import AjaxTextureLoader from './ajaxTextureLoader';
import setMaterial from './setMaterial';
import setTexture from './setTexture';

type Options = {
  name: string;
  position: { x: number; y: number; z: number; };
  textureMap: string;
}

export default function setLegs(object: Object3D, options: Options, callback?: () => void): void {
  const legs: Group = object.getObjectByName('Legs') as Group;
  const name: string = options.name.toLowerCase();
  const TextureLoader = AjaxTextureLoader();

  let leg: Mesh;

  legs.traverse((child: Object3D) => {
    const item: Mesh = child as Mesh;

    if (item.isMesh) {
      if (item.name.toLowerCase() === name) {
        item.visible = true;

        item.castShadow = true;
        item.receiveShadow = true;

        leg = item;

        return;
      }

      item.visible = false;
    }
  });

  const { textureMap: url } = options;

  TextureLoader.load(url,
    function onLoadFinished(result: Texture) {
      const texture = setTexture(result);
      const material = setMaterial(texture);

      leg.material = material;
      leg.material.needsUpdate = true;
      
      if (typeof callback === 'function') {
        callback();
      }
    },
    function onProgress(progress) {
      // console.log(progress);
    },
    function onError(error) {
      console.log(error);
    }
  );
}
