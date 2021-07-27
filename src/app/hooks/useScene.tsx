import React, {
  createContext,
  ReactNode,
  useContext
} from 'react';
import { useEffect } from 'react';
import { Scene } from 'three';
import { sceneName } from '../constants';

const SceneContext = createContext<{
  scene: Scene;
}>({
  scene: new Scene()
});

type Props = {
  children: ReactNode;
}

export function SceneProvider(props: Props): JSX.Element {
  const { children } = props;
  const { scene } = useContext(SceneContext);

  return (
    <SceneContext.Provider value={{ scene }}>
      {children}
    </SceneContext.Provider>
  );
}

export default function useScene(): [Scene] {
  const { scene } = useContext(SceneContext);

  return [scene];
}
