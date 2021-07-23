import { sRGBEncoding, Texture } from "three";
import { renderer } from "../constants";

export default function setTexture(texture: Texture): Texture {
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.encoding = sRGBEncoding;

  return texture;
}
