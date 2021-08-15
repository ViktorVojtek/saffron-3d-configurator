import { useEffect, useState } from 'react';

type Orientation = 'landscape' | 'portrait';

function getOrientation(): Orientation {
  if (!screen?.orientation) {
    switch(window.orientation) {
      case 0:
        return 'portrait';
      case 180:
        return 'portrait';
      case -90:
        return 'landscape';
      case 90:
        return 'landscape';
      default:
        return 'portrait';
    }
  }
  
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
