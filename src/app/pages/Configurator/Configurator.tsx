import React, { memo, useMemo, useEffect } from 'react';
import { Group } from 'three';
import {
  useAddToScene,
  useAnimate,
  useHideModels,
  useIsInScene,
  useLoadModel,
  useIsLoading,
  useScreeshot,
  useSetUpModel,
  useStore,
  useModelState
} from '../../hooks';
import { ObjectOptions, ModelStateActionType } from '../../@types';
import Canvas from '../../components/Canvas';

import { StyledContainer } from './Configurator.styled';
import Navigation from '../../components/Navigation';

import data from '../../../assets/data.json';

function Configurator(): JSX.Element {
  const animate = useAnimate();
  const setup = useSetUpModel();
  const [isLoading, loading] = useIsLoading();
  const [{ allSet }, toggleAllSet] = useModelState();
  const [{ bedIdx, headIdx, matIdx, legMatIdx, tuftIdx }, _dispatch] = useStore();
  const [{ data: object3D }, loadModel] = useLoadModel();

  const url: string = data.model[bedIdx];
  
  // Object settings
  const objectOptions: ObjectOptions = useMemo(() => ({
    name: data.bed[bedIdx].title.toLowerCase(),
    base: { 
      textureMap: bedIdx > 0
        ? data.textures.bed[bedIdx][matIdx].textureMap as string
        : data.textures.bed[bedIdx][matIdx].textureMap[legMatIdx] as string
    },
    head: {
      name: data.head[headIdx || 0].title.toLowerCase(),
      position: data.position[bedIdx].head,
      textureMap: headIdx !== 3
        ? data.textures.head[headIdx || 0][bedIdx][matIdx].textureMap as string
        : data.textures.head[headIdx || 0][bedIdx][matIdx].textureMap[legMatIdx],
    },
    leg: {
      name: bedIdx < 1 ? data.leg[0].toLowerCase() : data.leg[1].toLowerCase(),
      position: data.position[bedIdx].leg,
      textureMap: data.textures.leg[bedIdx][legMatIdx].textureMap
    },
    position: data.position[bedIdx].bed,
    scale: data.scale,
  }), [bedIdx, headIdx, matIdx, tuftIdx, legMatIdx]);

  const isInScene: boolean = useIsInScene(data.bed[bedIdx].title.toLowerCase());

  // Load model if not in scene
  useEffect(() => {
    if (isInScene) {
      return;
    }

    loading(true);
    loadModel(url);
  }, [isInScene, url]);

  // Add model to scene when loaded
  useEffect(() => {
    if (!object3D) {
      return;
    }
    
    useAddToScene(object3D as Group, data.bed[bedIdx].title);
  }, [object3D]);

  // Setup model base on options
  useEffect(() => {
    if (!isInScene) {
      return;
    }

    console.log('Model setup');

    useHideModels();
    setup(objectOptions);
  }, [bedIdx, headIdx, matIdx, legMatIdx, tuftIdx, isInScene]);

  // Animate changes
  useEffect(() => {
    if (!allSet) {
      return;
    }

    loading(false);
    toggleAllSet({ type: ModelStateActionType.ALL_SET, payload: false });
    
    if (!isLoading) {
      animate();
    }
  }, [allSet, isLoading]);

  /* function getBedTextureUrl(): string {
    const whenIsTuft: string = tuftIdx > 0
      ? data.textures.bed[bedIdx][matIdx].textureTuftMap[tuftIdx][matIdx] as string
      : data.textures.bed[bedIdx][matIdx].textureMap as string;

    const texture: string = bedIdx > 0
    ? (
        tuftIdx > 0
          ? data.textures.bed[bedIdx][matIdx].textureTuftMap[tuftIdx][matIdx] as string
          : data.textures.bed[bedIdx][matIdx].textureMap as string
      )
    : (
      tuftIdx > 0
       ? ''
       : data.textures.bed[bedIdx][matIdx].textureMap[legMatIdx] as string
    );

    return '';
  } */

  return (
    <StyledContainer id="appWrapper">
      <Navigation data={data} />
      <Canvas loading={isLoading} />
    </StyledContainer>
  );
}

export default memo(Configurator);
