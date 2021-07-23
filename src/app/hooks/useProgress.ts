import { useState, useEffect } from 'react';

export default function useProgress(xhr: ProgressEvent<EventTarget>, objectToLoad?: any): number {
  const [perc, setPerc] = useState(0);
  
  useEffect(() => {
    const { loaded, total } = xhr;
    const percentage: number = +Math.round((loaded / total) * 100).toFixed(0);

    if (perc === 100) {
      return;
    }

    setPerc(percentage);
  }, [xhr]);
  
  return perc;
}
