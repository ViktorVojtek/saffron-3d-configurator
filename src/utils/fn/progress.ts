import { useStore, ToLoadEnum } from '../store';

export const onProgress: (xhr: ProgressEvent<EventTarget>, objectToLoad?: ToLoadEnum) => void = function (
  xhr,
  objectToLoad
) {
  const { dispatch } = useStore();
  
  const percentage: number = +Math.round(
    (xhr.loaded / xhr.total) * 100
  ).toFixed(0);

  if (percentage === 100) {
    dispatch({ type: 'SET_PROGRESS', payload: 0 });
  } else {
    dispatch({ type: 'SET_PROGRESS', payload: percentage });
    dispatch({ type: 'SET_LOADED_CONTENT', payload: objectToLoad });
  }
};