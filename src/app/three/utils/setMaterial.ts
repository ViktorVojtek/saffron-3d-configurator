import { MeshStandardMaterial, Texture } from 'three';

type MaterialOptions = {
  metalnessMap?: Texture;
  normalMap?: Texture;
  roughness: number;
}

export default function setMaterial(texture: Texture, options?: MaterialOptions ): MeshStandardMaterial {
  const material: MeshStandardMaterial = new MeshStandardMaterial(options);

  material.map = texture;

  if (options?.metalnessMap) {
    material.metalnessMap = options.metalnessMap;
  }

  if (options?.normalMap) {
    material.normalMap = options.normalMap;
  }

  return material;
}
