import React, { memo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Object3D,
  sRGBEncoding,
} from 'three';
import {
  scene,
  camera,
  cameraPosition,
  cameraTarget,
  controls,
  renderer,
} from '../../constants';
import { useAnimate, useScreeshot } from '../../hooks';
import { onDocumentMouseDown, onDocumentTouchDown, onWindowResize } from '../../three/utils';
import Lights from '../../three/objects/Lights';
import Ground from '../../three/objects/Ground';
import Button from '../Button';
import Loader from '../Loader';
import { StyledAbsolute, StyledWrapper } from './Canvas.styled';
import { Trans } from '@lingui/macro';

type Props = {
  loading: boolean;
};

function Canvas(props: Props): JSX.Element {
  const wrapper = useRef(null);
  const { loading } = props;
  const history = useHistory();
  const animate = useAnimate();
  const { takeScreenshots } = useScreeshot();

  useEffect(() => {
    let canvas: HTMLCanvasElement | undefined = undefined;

    if (!wrapper) {
      return;
    }

    function setUpScene(): void {
      console.log('Init scene');

      // Camera setup
      const { start: { x, y, z } } = cameraPosition;
  
      camera.position.set(x, y, z);
      camera.lookAt(scene.position);
  
      // Controls setup
      // console.log(controls);
      controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
      controls.update();
      controls.maxPolarAngle = Math.PI / 2.05;
      controls.minDistance = 5.5;
      controls.maxDistance = 15;
  
      // Renderer setup
      renderer.clearDepth();
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      // renderer.setClearColor(0xffffff, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      renderer.toneMapping = ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1; // 0.95; // 0.375;
      renderer.outputEncoding = sRGBEncoding;
      renderer.gammaFactor = 2.75; //2.75;
      renderer.physicallyCorrectLights = true;
  
      if (!scene.getObjectByName('Lights') && !scene.getObjectByName('Ground')) {
        // Setup scene enviroment
        const lights: Object3D = Lights();
        const ground: Object3D = Ground();
        
        scene.add(lights);
        scene.add(ground);
      }
  
      const { offsetHeight: height, offsetWidth: width } = wrapper?.current as unknown as HTMLCanvasElement; // window;
  
      renderer.setSize(width, height, true);
      renderer.compile(scene, camera);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
  
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      canvas = renderer.domElement;
  
      (wrapper?.current as unknown as HTMLDivElement).appendChild(canvas);

      animate();
    }

    setUpScene();

    // Listeners setup
    controls.addEventListener('change', animate);
    renderer?.domElement?.addEventListener('click', onDocumentMouseDown, false);
    renderer?.domElement?.addEventListener('touchstart', onDocumentTouchDown, false);
    window.addEventListener('resize', onWindowResize, false);

    return () => {
      controls.removeEventListener('change', animate);
      renderer?.domElement?.removeEventListener('click', onDocumentMouseDown, false);
      renderer?.domElement?.removeEventListener('touchstart', onDocumentTouchDown, false);
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    animate();
  }, [loading]);

  function handleOnClick(): void {
    const path = '/summary';

    takeScreenshots();
    history.push(path);
  }

  return (
    <>
      <StyledWrapper ref={wrapper}>
        <StyledAbsolute>
          <Button onClick={handleOnClick} type="button">
            <Trans>Summary</Trans>
          </Button>
        </StyledAbsolute>
      </StyledWrapper>
      {loading && <Loader progress={99} />}
    </>
  );
}

export default memo(Canvas);
