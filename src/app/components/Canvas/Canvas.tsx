import React, { useEffect, useRef } from 'react';
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  sRGBEncoding,
} from 'three';
import { cameraPosition, cameraTarget } from '../../constants';
import {
  useAnimate,
  useCamera,
  useControls,
  useRenderer,
  useResize,
  useScene
} from '../../hooks';
import Lights from '../../three/objects/Lights';
import Ground from '../../three/objects/Ground';

import { StyledWrapper } from './Canvas.styled';

export default function Canvas(): JSX.Element {
  const canvasWrapper = useRef<HTMLDivElement>(null);

  const animate = useAnimate();
  const [camera] = useCamera();
  const [controls] = useControls();
  const [renderer] = useRenderer();
  const [scene] = useScene();

  useResize();

  // Setup webgl base
  useEffect(() => {
    if (!canvasWrapper.current ||
      !camera ||
      !controls ||
      !renderer ||
      !scene) {
      return;
    }

    const { start: { x, y, z } } = cameraPosition;

    camera.position.set(x, y, z);
    camera.lookAt(scene.position);

    controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    controls.update();
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 5.5;
    controls.maxDistance = 15;

    if (!scene.getObjectByName('Lights') && !scene.getObjectByName('Ground')) {
      scene.add(Lights());
      scene.add(Ground());
    }

    const { offsetWidth: width } = canvasWrapper.current.closest('#canvasWrapper') as HTMLElement;
      const { offsetHeight } = canvasWrapper.current.closest('#canvas') as HTMLElement;
      const height: number = offsetHeight || Math.round(window.innerHeight);

    renderer.clearDepth();
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.gammaFactor = 2.45;
    renderer.outputEncoding = sRGBEncoding;
    renderer.physicallyCorrectLights = true;

    renderer.setSize(width, height, true);
    renderer.compile(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const canvas = renderer.domElement;

    canvasWrapper?.current.append(canvas);
    animate();

    controls?.addEventListener('change', animate);

    return () => {
      controls?.removeEventListener('change', animate);
    };
  }, [camera, controls, renderer, scene]);

  return <StyledWrapper ref={canvasWrapper} />;
}
