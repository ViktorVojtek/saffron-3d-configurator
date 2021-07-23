import { useState, useEffect } from 'react';
import { Group, Object3D } from 'three';
import { FBXLoader } from '../three/constants';

type HookResult = {
  data: Object3D | Group | null;
  isLoading: boolean;
  progress: number;
  isError: boolean;
}

type LoadModel = [HookResult, React.Dispatch<React.SetStateAction<string>>];

export default function useLoadModel(): LoadModel {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>('');
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    async function fetchData() {
      const Loader = new FBXLoader();

      setIsError(false);
      setIsLoading(true);

      Loader.load(url as string,
        function onLoadDone(object) {
          setData(object);
          setIsLoading(false);
        },
        function onProgress(event: ProgressEvent<EventTarget>) {
          const { loaded, total } = event;
          const percent = Math.round((loaded / total) * 100);

          if(data) {
            setData(null);
          }
          
          setProgress(percent);
        },
        function onError(error) {
          setIsError(true);
        }
      );
    };
 
    if (url) {
      fetchData();
    }
  }, [url]);
 
  return [{ data, isLoading, progress, isError }, setUrl];
}

