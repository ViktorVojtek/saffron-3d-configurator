import * as React from 'react';
import { useState, useEffect } from 'react';
import { animate } from '../../../utils';
import { appWrapperId, renderer } from '../../../utils/constants';
import FSBtn from './styled';

export default (): JSX.Element => {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const changeFullScreen = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        animate();
      }
    };

    renderer.domElement
      .closest(`#${appWrapperId}`)
      .addEventListener('fullscreenchange', changeFullScreen, false);

    () =>
      renderer.domElement
        .closest(`#${appWrapperId}`)
        .removeEventListener('fullscreenchange', changeFullScreen);
  }, []);

  const handleTurnFullscreenOn: () => void = () => {
    if (!fullscreen) {
      renderer.domElement.closest(`#${appWrapperId}`).requestFullscreen();
    }

    animate();
    setFullscreen(true);
  };

  return <FSBtn fullscreen={fullscreen} onClick={handleTurnFullscreenOn} />;
};
