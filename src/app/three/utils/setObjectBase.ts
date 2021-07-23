import { Mesh, Object3D, Texture } from 'three';
import AjaxTextureLoader from './ajaxTextureLoader';
import setTexture from './setTexture';
import setMaterial from './setMaterial';

type Options = {
  textureMap: string;
}

export default function setObjectBase(object: Object3D, options: Options, callback?: () => void): void {
  const base: Mesh = object.getObjectByName('Bed') as Mesh;
  const TextureLoader = AjaxTextureLoader();

  const { textureMap: url } = options;

  TextureLoader.load(url,
    function onLoadFinished(result: Texture) {
      const texture = setTexture(result);
      const material = setMaterial(texture);

      base.material = material;
      base.material.needsUpdate = true;

      base.castShadow = true;
      base.receiveShadow = true;

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