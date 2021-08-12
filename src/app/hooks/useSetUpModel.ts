import { useEffect, useState } from 'react';
import { Object3D } from 'three';
import setObjectHead from '../three/utils/setObjectHead';
import setObjectBase from '../three/utils/setObjectBase';
import setLegs from '../three/utils/setLegs';

import useAnimate from './useAnimate';
import useScene from './useScene';
import useModelState, { ModelAction } from './useModelState';

type Coords = {
  x: number;
  y: number;
  z: number;
};

type HeadOptions = {
  name: string;
  position: Coords;
  textureMap: string;
};

type LegOptions = HeadOptions;

export type ObjectOptions = {
  name: string;
  base: {
    textureMap: string;
  };
  head: HeadOptions;
  leg: LegOptions;
  position: Coords;
  scale: number;
  url: string;
}

export default function useSetupModel(): {
  setupModel: (options: ObjectOptions) => void
} {
  const [model, setModel] = useState<Object3D>();
  const [c, increment] = useState(0);

  const animate = useAnimate();
  const [scene] = useScene();
  const [{ ALL, TEXTURES }, setModelAction] = useModelState();

  useEffect(() => {
    if (c === 3) {
      setModelAction({ type: ModelAction.ALL, payload: 'done' });
      increment(0);
    }
  }, [c]);

  useEffect(() => {
    if(ALL === 'inprogress') {
      return;
    }

    if(model) {
      model.visible = true;
    }

    animate();
  }, [model, ALL]);

  function setup(options: ObjectOptions) {
    reset();
  
    const { name, base, head, leg, position, scale } = options;

    const object: Object3D = scene?.getObjectByName(name) as Object3D;

    setModel(object);

    const { x: scaleX, y: scaleY, z: scaleZ } = object.scale;

    // Set scale
    if(scaleX !== scale || scaleY !== scale || scaleZ !== scale) {
      object.scale.set(scale, scale, scale);
    }

    const { x: positionX, y: positionY, z: positionZ } = object.position;
    
    // Set position
    if( positionX !== position.x || positionY !== position.y || positionZ !== position.z ) {
      object.position.set(position.x, position.y, position.z);
    }

    function callback(): void {
      increment(c => c + 1);
    }

    // Set up Head
    setObjectHead(object, head, callback);

    // Set up Base
    const { textureMap } = base;

    setObjectBase(object, { textureMap }, callback);

    // Set up Legs
    setLegs(object, leg, callback);
  }

  function reset(): void {
    if (ALL === 'inprogress' || TEXTURES === 'loading') {
      return;
    }

    setModelAction({ type: ModelAction.ALL, payload: 'inprogress' });
    setModelAction({ type: ModelAction.TEXTURES, payload: 'loading' });
  }

  return { setupModel: setup };
}