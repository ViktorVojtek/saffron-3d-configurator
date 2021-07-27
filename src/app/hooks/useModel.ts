import { Dispatch, useState, useEffect } from 'react';
import { FBXLoader } from '../three/constants';
import useAddToScene from './useAddToScene';
import useHideModels from './useHideModels';
import useLoading from './useLoading';
import useScene from './useScene';
import useSetupModel from './useSetupModel';
import useModelState, { ModelAction } from './useModelState';
import useAnimate from './useAnimate';

export default function useLoadModel(): [
  {
    isLoading: boolean;
    progress: number;
  },
  Dispatch<any>
] {
  const [data, setData] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const animate = useAnimate();
  const { addToScene } = useAddToScene();
  const { hideModels } = useHideModels();
  const [isLoading, setLoading] = useLoading();
  const [scene] = useScene();
  const { setupModel } = useSetupModel();
  const [{ ALL }, setModelAction] = useModelState();

  // Reset loading indicator
  useEffect(() => {
    if (ALL === 'inprogress') {
      return;
    }

    setLoading(false);
  }, [ALL]);
 
  // Manage model setup
  useEffect(() => {
    if (!data) {
      return;
    }

    const inScene: boolean = !!scene?.getObjectByName(data.name);

    if (inScene) {
      hideModels();
      setupModel(data);
    } else {
      fetchData(data.url);
    }
  }, [data]);

  // fetch 3D model
  async function fetchData(url: string): Promise<void> {
    const Loader = new FBXLoader();

    setModelAction({ type: ModelAction.MODEL, payload: 'loading' });
    setLoading(true);

    Loader.load(url as string,
      function onLoadDone(object) {
        hideModels();
        addToScene(object, data.name);
        setupModel(data);

        setModelAction({ type: ModelAction.MODEL, payload: 'done' });
        setLoading(false);
      },
      function onProgress(event: ProgressEvent<EventTarget>) {
        const { loaded, total } = event;
        const percent = Math.round((loaded / total) * 100);
        
        if (percent === 100) {
          setProgress(0);
        }
        
        setProgress(percent);
      },
      function onError(error: ErrorEvent) {
        throw new Error(error?.message);
      }
    );
  }
 
  return [{ isLoading, progress }, setData];
}

