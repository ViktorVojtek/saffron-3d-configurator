import * as React from 'react';
import { useState } from 'react';
import { animate } from '../../../utils';
import {
  appWrapperId,
  camera,
  composer,
  renderer,
} from '../../../utils/constants';
import { useStore } from '../../../utils/store';
import FSBtn from './styled';

export default (): JSX.Element => {
  const {
    dispatch,
    state: { dimensions },
  } = useStore();
  const [fullscreen, setFullscreen] = useState(false);

  const handleChangeFullscreen: () => void = () => {
    const grandAppParent = renderer.domElement.closest(`#${appWrapperId}`)
      .parentElement;
    const gAPDimensions = JSON.parse(
      grandAppParent.getAttribute('data-dimensions')
    );

    let width: number, height: number;

    if (!fullscreen === true) {
      grandAppParent.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
      `;
      renderer.domElement.style.cssText = `
        width: 100vw;
        height: 100vh;
      `;

      width = window.innerWidth;
      height = window.innerHeight;

      // grandAppParent.requestFullscreen();
    } else {
      grandAppParent.style.cssText = `
        position: static;
        width: ${gAPDimensions[0]}px;
        height: ${gAPDimensions[1]}px;
      `;
      renderer.domElement.style.cssText = `
        width: ${gAPDimensions[0]}px;
        height: ${gAPDimensions[1]}px;
      `;

      width = gAPDimensions[0];
      height = gAPDimensions[1];
    }

    renderer.setSize(width, height, true);
    composer.setSize(width, height);

    dispatch({ type: 'SET_DIMENSIONS', payload: { ...dimensions, width } });

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    animate();

    setFullscreen(!fullscreen);
  };

  return <FSBtn fullscreen={fullscreen} onClick={handleChangeFullscreen} />;
};
