import React, {
  createContext,
  useContext,
  useEffect,
  Dispatch,
  ReactNode,
  useState
} from 'react';
import { PerspectiveCamera } from 'three';
import useRenderer from './useRenderer';
import useScene from './useScene';

const CameraContext = createContext<{
  camera?: PerspectiveCamera;
  dispatch: Dispatch<PerspectiveCamera>;
}>({
  camera: undefined,
  dispatch: () => null
});

type Props = {
  children: ReactNode;
};

export function CameraProvider(props: Props): JSX.Element {
  const { children } = props;

  const [renderer] = useRenderer();
  const [scene] = useScene();
  const [camera, dispatch] = useState<PerspectiveCamera>();

  useEffect(() => {
    if (camera) {
      return;
    }

    if (renderer && scene) {
      const { offsetHeight: width, offsetHeight: height } = renderer.domElement;

      const _camera = new PerspectiveCamera(40, width / height, 1, 1000);

      dispatch(_camera);
    }
  }, [camera, renderer, scene]);

  return (
    <CameraContext.Provider value={{ camera, dispatch }}>
      {children}
    </CameraContext.Provider>
  );
}

export default function useCamera(): [
  PerspectiveCamera | undefined,
  Dispatch<PerspectiveCamera>
] {
  const { camera, dispatch } = useContext(CameraContext);

  return [camera, dispatch];
}
