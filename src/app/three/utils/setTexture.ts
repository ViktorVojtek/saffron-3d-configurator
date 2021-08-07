import { sRGBEncoding, Texture } from 'three';

export default function setTexture(texture: Texture): Texture {
  texture.anisotropy = 8;
  texture.encoding = sRGBEncoding;

  return texture;
}
