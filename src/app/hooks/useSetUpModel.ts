import { useEffect, useState } from 'react';
import { Object3D } from 'three';
import setObjectHead from '../three/utils/setObjectHead';
import { scene } from '../three/constants';
import setObjectBase from '../three/utils/setObjectBase';
import setLegs from '../three/utils/setLegs';
import useModelState, { ModelStateActionType } from './useModelState';

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
}

export default function useSetUpModel(): (options: ObjectOptions) => void {
  const [{ allSet, baseSet, headSet, legSet }, dispatchModelState] = useModelState();
  const [model, setModel] = useState<Object3D>();

  useEffect(() => {
    if (baseSet && headSet && legSet) {
      dispatchModelState({ type: ModelStateActionType.ALL_SET, payload: true });
    }
  }, [baseSet, headSet, legSet]);

  useEffect(() => {
    if(!allSet) {
      return;
    }

    if(model) {
      model.visible = true;
    }
  }, [model, allSet]);

  function setup(options: ObjectOptions) {
    reset();
  
    const { name, base, head, leg, position, scale } = options;
    const object: Object3D = scene.getObjectByName(name) as Object3D;

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

    // Set up Head
    function setHeadCallback(): void {
      dispatchModelState({ type: ModelStateActionType.HEAD_SET, payload: true });
    }

    setObjectHead(object, head, setHeadCallback);

    // Set up Base
    function setBedCallback(): void {
      dispatchModelState({ type: ModelStateActionType.BASE_SET, payload: true });
    }

    const { textureMap } = base;

    setObjectBase(object, { textureMap }, setBedCallback);

    // Set up Legs
    function setLegCallback(): void {
      dispatchModelState({ type: ModelStateActionType.LEG_SET, payload: true });
    }

    setLegs(object, leg, setLegCallback);
  }

  function reset(): void {
    if (!allSet) {
      return;
    }

    dispatchModelState({ type: ModelStateActionType.ALL_SET, payload: false });
  }

  return setup;
}