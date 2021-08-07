import React,{
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react';
import {
  cameraPosition,
  cameraTarget,
} from '../three/constants';
import useCamera from './useCamera';
import useControls from './useControls';
import useRenderer from './useRenderer';
import useStorage from './useStorage';

const ScreenshotsContext = createContext<{
  screenshots: string[];
  dispatch: Dispatch<SetStateAction<string[]>>;
}>({
  screenshots: [],
  dispatch: () => null,
});

type Props = {
  children: ReactNode;
}

export function ScreenshotsProvider(props: Props) {
  const { children } = props;
  const storage = useStorage();
  const [screenshots, dispatch] = useState<string[]>(
    JSON.parse(storage.getItem('screenshots') as string) || []
  );

  useEffect(() => {
    storage.setItem('screenshots', JSON.stringify(screenshots));
  }, [screenshots]);

  return (
    <ScreenshotsContext.Provider value={{ screenshots, dispatch }}>
      {children}
    </ScreenshotsContext.Provider>
  );
}

export default function useTakeScreenshot(): {
  screenshots: (string | undefined)[];
  takeScreenshots: (callback?: () => void) => void;
  deleteScreenshots: () => void
} {
  const [camera] = useCamera();
  const [controls] = useControls();
  const [renderer] = useRenderer();
  const storage = useStorage();
  const { screenshots } = useContext(ScreenshotsContext);

  function handleTakeScreenshot(callback?: () => void): void {
    if (!controls) {
      return;
    }
  
    const mime = 'image/png';
    const images: string[] = [];

    // TODO: Crop image from renderer context
    // https://discourse.threejs.org/t/screenshot-a-object-to-its-height-and-width/14312/4
  
    controls.enabled = false;
    camera?.position.set(cameraPosition.change.x, cameraPosition.change.y, cameraPosition.change.z);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    camera?.position.set(cameraPosition.start.x, cameraPosition.start.y, cameraPosition.start.z);
    controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    controls.enabled = true;

    storage.setItem('screenshots', JSON.stringify(images));

    if (typeof callback === 'function') {
      callback();
    }
  }

  function handleDeleteScreenshots(): void {
    storage.removeItem('screenshots');
  }

  return {
    screenshots,
    takeScreenshots: handleTakeScreenshot,
    deleteScreenshots: handleDeleteScreenshots
  };
}
