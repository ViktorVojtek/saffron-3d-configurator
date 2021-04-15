import * as React from 'react';
import { useState, useEffect } from 'react';
import { animate } from '../../../utils';
import { appWrapperId, renderer } from '../../../utils/constants';
import FSBtn from './styled';

export default function FullScreenButton(): JSX.Element {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const changeFullScreen = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        animate();
      }
    };

    document.addEventListener('fullscreenchange', changeFullScreen, false);

    () =>
      document.removeEventListener('fullscreenchange', changeFullScreen, false);
  }, []);

  const handleTurnFullscreenOn: () => void = () => {
    if (!fullscreen) {
      const docElm = document.documentElement as any;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    }

    animate();
    setFullscreen(true);
  };

  return <FSBtn fullscreen={fullscreen} onClick={handleTurnFullscreenOn} />;
}
