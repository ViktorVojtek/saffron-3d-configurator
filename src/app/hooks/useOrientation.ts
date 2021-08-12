import { useEffect, useState } from 'react';

type Orientation = 'landscape' | 'portrait';

function getOrientation(): Orientation {
  return screen?.orientation.type.toLowerCase()
    .indexOf('landscape') > -1 ? 'landscape' : 'portrait';
}

export default function useDeviceOrientation(): 'landscape' | 'portrait' {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    function handleOrientationChange() {
      setOrientation(getOrientation());
    }

    window.addEventListener('orientationchange', handleOrientationChange, true);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange, true);
    };
  }, []);

  return orientation;
}
