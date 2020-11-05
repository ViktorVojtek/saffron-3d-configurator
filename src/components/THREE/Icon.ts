import { Color, Sprite, SpriteMaterial, LinearEncoding, Texture, TextureLoader } from 'three';
import { renderer } from '../../utils/constants';

export default (
  name: string,
  position: { x: number; y: number; z: number },
  callBack?: () => void
) => {
  const spriteMap: Texture = new TextureLoader().load(
    '../static/images/add.png'
  );

  spriteMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
  spriteMap.needsUpdate = true;

  const spriteMaterial: SpriteMaterial = new SpriteMaterial({ color: new Color(3, 3, 3), map: spriteMap });
  const sprite: Sprite = new Sprite(spriteMaterial);

  sprite.name = `Icon - ${name}`;
  
  const { x, y, z } = position;

  sprite.position.set(x, y, z);
  sprite.scale.set(0.2, 0.2, 0.2);
  sprite.visible = false;

  if (typeof callBack === 'function') {
    (sprite as any).callback = () => {
      if (sprite.visible) {
        callBack();
        // console.log('callback clicked');
      }
    };
  }

  return sprite;
};
