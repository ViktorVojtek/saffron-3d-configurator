import { Mesh, Object3D, Texture } from 'three';
import AjaxTextureLoader from './ajaxTextureLoader';
import setMaterial from './setMaterial';
import setTexture from './setTexture';

type Options = {
  name: string;
  position: { x: number; y: number; z: number; };
  textureMap: string;
}

export default function setObjectHead(
  object: Object3D,
  options: Options,
  callback?: () => void
): void {
  const heads = object.getObjectByName('Heads');

  if (!heads) {
    return;
  }

  const name: string = options.name.toLowerCase();
  const TextureLoader = AjaxTextureLoader();

  let head: Mesh;

  heads.traverse((child) => {
    const item: Mesh = child as Mesh;

    if (item.isMesh) {
      if (item.name.toLowerCase() === name) {
        item.visible = true;
        head = item;

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

      head.material = material;
      head.material.needsUpdate = true;

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