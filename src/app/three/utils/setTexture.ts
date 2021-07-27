// import { useEffect, useState } from 'react';
import { sRGBEncoding, Texture } from 'three';
// import { renderer } from "../constants";
// import { useRenderer } from '../../hooks';

export default function setTexture(texture: Texture): Texture {
  // const [renderer] = useRenderer();

  texture.anisotropy = 8; // renderer?.capabilities.getMaxAnisotropy() as number;
  texture.encoding = sRGBEncoding;

  return texture;
}
