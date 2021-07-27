import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useRenderer from './useRenderer';
import useCamera from './useCamera';
import { PerspectiveCamera, WebGLRenderer } from 'three';

const ControlsContext = createContext<{
  controls?: OrbitControls;
}>({
  controls: undefined
});

type Props = {
  children: ReactNode;
}

export function ControlsProvider(props: Props): JSX.Element {
  const { children } = props;

  const [controls, dispatch] = useState<OrbitControls>();
  const [renderer] = useRenderer();
  const [camera] = useCamera();

  useEffect(() => {
    if (controls) {
      return;
    }

    if (camera && renderer) {
      const _controls = new OrbitControls(
        camera as PerspectiveCamera,
        renderer.domElement as HTMLCanvasElement
      );

      dispatch(_controls);
    }
  }, [camera, controls, renderer]);

  return (
    <ControlsContext.Provider value={{ controls }}>
      {children}
    </ControlsContext.Provider>
  );
}

export default function useControls(): [OrbitControls | undefined] {
  const { controls } = useContext(ControlsContext);

  return [controls];
}
