import React,{
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react';
import { Box3, MathUtils, Matrix4, Object3D, Vector3 } from 'three';
import {
  camera,
  cameraPosition,
  controls,
  renderer,
  scene
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
  const storage = window.localStorage;
  const { children } = props;
  const [ screenshots, dispatch ] = useState<(string | undefined)[]>(JSON.parse(storage.getItem('screenshots') as string) || []);

  useEffect(() => {
    storage.setItem('screenshots', JSON.stringify(screenshots));
  }, [screenshots]);

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
  // const [canvas, setCanvas] = useState(null);
  const { screenshots, dispatch } = useContext(ScreenshotsContext); 

  function handleTakeScreenshot(callback?: () => void): void {
    const mime = 'image/png';
    const images: string[] = [];
    const localStorage = window.localStorage;

    // TODO: Crop image from renderer context
    // ctx.drawImage(img,149,4,105,105,0,0,105,105);
    // https://discourse.threejs.org/t/screenshot-a-object-to-its-height-and-width/14312/4

    /* let object: Object3D | undefined = undefined;

    scene.traverse((child: any) => {
      if (child.visible && child.isMesh && child.name.toLowerCase() === 'bed') {
        object = child.parent;

        return;
      }
    });

    const box = new Box3().setFromObject(object as unknown as Object3D);
    const size = box?.getSize(new Vector3());
    
    const distance = camera.position.distanceTo((object as unknown as Object3D).position);
    const distance2 = camera.position.z - (object as unknown as Object3D).position.z - (size.z / 2);
    console.log('distance: ', distance);
    console.log('distance2', distance2);

    const aspect  = renderer.domElement.width / renderer.domElement.height;
    console.log(aspect);
    const vFOV = MathUtils.degToRad(camera.fov);
    const iHeight = 2 * Math.tan( vFOV / 2 ) * distance;
    // const width = height * aspect;
    const ratio = distance / iHeight;

    const width = size.x / ratio * aspect;
    const height = size.y / ratio * aspect;

    // Calc position
    const vector = new Vector3();
    const viewProjectionMatrix = new Matrix4();
    const viewMatrix = new Matrix4();
    viewMatrix.copy( camera.matrixWorldInverse );
    viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );
    const widthHalf = renderer.domElement.width;
    const heightHalf = renderer.domElement.height;
    (object as unknown as Object3D).updateMatrixWorld();
    vector.setFromMatrixPosition((object as unknown as Object3D).matrixWorld);
    //vector.project(camera);
    vector.applyMatrix4(viewProjectionMatrix);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    var result = {
        x: vector.x - width / 2,
        y: vector.y - height / 2,
        w: width,
        h: height
    };

    console.log(result);

    const oldCanvas = renderer.domElement;
    const newCanvas = document.createElement('canvas');

    newCanvas.width = result.w;
    newCanvas.height = result.h;

    console.log(oldCanvas);

    const newContext = newCanvas.getContext('2d');

    console.log(newCanvas.getContext('2d')); */

    // newContext?.drawImage(oldCanvas, result.x, result.y, result.w, result.h, 0, 0, result.w, result.h);
  
    controls.enabled = false;
    camera.position.set(cameraPosition.change.x, cameraPosition.change.y, cameraPosition.change.z);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));

    // newCanvas.getContext('2d')?.drawImage(renderer.domElement, result.x, result.y, result.w, result.h, 0, 0, result.w, result.h);
    // newCanvas.getContext('2d')?.drawImage(renderer.domElement, 50, 50);
    // console.log(newCanvas.toDataURL("image/png"));
    // images.push(newCanvas.toDataURL(mime));
  
    controls.reset();
    camera.position.set(cameraPosition.start.x, cameraPosition.start.y, cameraPosition.start.z);
    controls.target.set(0, 0.9, 0);
    controls.update();
  
    images.push(renderer.domElement.toDataURL(mime));
    // images.push(newCanvas.toDataURL(mime));
  
    controls.enabled = true;

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
