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
  camera,
  cameraPosition,
  controls,
  renderer
} from '../three/constants';

const ScreenshotsContext = createContext<{
  screenshots: (string | undefined)[];
  dispatch: Dispatch<SetStateAction<(string | undefined)[]>>;
}>({
  screenshots: [],
  dispatch: () => null,
});

type Props = {
  children: ReactNode;
}

export function ScreenshotsProvider(props: Props) {
  const localStorage = window.localStorage;
  const { children } = props;
  const [ screenshots, dispatch ] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const storedScreenshots = JSON.parse(localStorage.getItem('screenshots') as string);
    
    if (!storedScreenshots) {
      return;
    }

    dispatch(storedScreenshots);
  }, [localStorage]);

  return (
    <ScreenshotsContext.Provider value={{ screenshots, dispatch }}>
      {children}
    </ScreenshotsContext.Provider>
  );
}

export default function useScreenshot(): {
  screenshots: (string | undefined)[];
  takeScreenshots: (callback?: () => void) => void;
  deleteScreenshots: () => void
} {
  const { screenshots, dispatch } = useContext(ScreenshotsContext); 

  function handleTakeScreenshot(callback?: () => void): void {
    const mime = 'image/png';
    const images: string[] = [];
    const localStorage = window.localStorage;

    // TODO: Crop image from renderer context
    // ctx.drawImage(img,149,4,105,105,0,0,105,105);
    // https://discourse.threejs.org/t/screenshot-a-object-to-its-height-and-width/14312/4
  
    const ctx = renderer.domElement.getContext('2d');
  
    controls.enabled = false;
    camera.position.set(cameraPosition.change.x, cameraPosition.change.y, cameraPosition.change.z);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    controls.reset();
    camera.position.set(cameraPosition.start.x, cameraPosition.start.y, cameraPosition.start.z);
    controls.target.set(0, 0.9, 0);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
  
    controls.enabled = true;

    
    console.log(ctx);
    localStorage.setItem('screenshots', JSON.stringify(images));
    dispatch(images);

    if (typeof callback === 'function') {
      callback();
    }
  }

  function handleDeleteScreenshots(): void {
    localStorage.removeItem('screenshots');
    dispatch([]);
  }

  return {
    screenshots,
    takeScreenshots: handleTakeScreenshot,
    deleteScreenshots: handleDeleteScreenshots
  };
}
