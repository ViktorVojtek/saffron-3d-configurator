import React, { memo, useMemo, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import {Grid, Col, Row} from 'react-styled-flexboxgrid';
import { t, Trans } from '@lingui/macro';
import { ObjectOptions } from '../../@types';
import {
  useLoadModel,
  useLoading,
  useScene,
  useStore,
  useModelState,
} from '../../hooks';
import Canvas from '../../components/Canvas';
import LoaderBase from '../../components/Loader';
import Navigation from '../../components/Navigation';
import Text from '../../components/styled/Text';
import { StyledRelativeView } from './Configurator.styled';

import data from '../../../assets/data.json';

function Configurator(): JSX.Element {
  const [isLoading] = useLoading();
  const [{ progress }, loadModel] = useLoadModel();
  const [{ MODEL, TEXTURES }] = useModelState();
  const [scene] = useScene();
  const [{
    bedIdx,
    headIdx,
    legIdx,
    legMatIdx,
    matIdx,
    tuftIdx
  }] = useStore();
  
  // Object settings
  const object: ObjectOptions = useMemo(() => ({
    name: data.bed[bedIdx].title.toLowerCase(),
    base: { 
      textureMap: !!bedIdx
        ? (
          !!tuftIdx
            ? (data.textures.bed[bedIdx][matIdx] as any).textureTuftMap[tuftIdx] as string
            : data.textures.bed[bedIdx][matIdx].textureMap as string
        )
        : (
          data.textures.bed[bedIdx][matIdx].textureMap[legMatIdx] as string
        )
    },
    head: {
      name: data.head[headIdx || 0].title.toLowerCase(),
      position: data.position[bedIdx].head,
      textureMap: headIdx !== 3
        ? data.textures.head[headIdx || 0][bedIdx][matIdx].textureMap as string
        : data.textures.head[headIdx || 0][bedIdx][matIdx].textureMap[legMatIdx],
    },
    leg: {
      name: !bedIdx
        ? data.leg[legIdx].title.toLowerCase()
        : data.leg[legIdx < 1 ? 1 : legIdx].title.toLowerCase(),
      position: data.position[bedIdx].leg,
      textureMap: data.textures.leg[bedIdx][legMatIdx].textureMap
    },
    position: data.position[bedIdx].bed,
    scale: data.scale,
    url: data.model[bedIdx]
  }), [bedIdx, headIdx, matIdx, tuftIdx, legIdx, legMatIdx]);

  useEffect(() => {
    loadModel(object);
  }, [bedIdx, headIdx, matIdx, tuftIdx, legIdx, legMatIdx, object]);

  function Loader(): JSX.Element {
    return (
      <LoaderBase progress={progress}>
        <Text>
          <Trans>Loading {MODEL !== 'done' ? t`Model` : (TEXTURES !== 'done' ? t`Textures` : '')}</Trans>
        </Text>
      </LoaderBase>
    );
  }

  if (isLoading && scene.children.length < 3) {
    return <Loader />;
  }

  if (isMobileOnly) {
    return (
      <Grid fluid id="appWrapper">
        <Col>
          <Row id="canvasWrapper">
            <StyledRelativeView>
              {
                isLoading && <Loader />
              }
              <Canvas />
            </StyledRelativeView>
          </Row>
          <Row>
            <Navigation data={data} />
          </Row>
        </Col>
      </Grid>
    );
  }

  return (
    <Grid fluid id="appWrapper">
      <Row reverse={isMobileOnly}>
        <Col xs={12} md={4} reverse={isMobileOnly}>
          <Navigation data={data} />
        </Col>
        <Col xs={12} md={8} reverse={isMobileOnly} id="canvasWrapper">
          <StyledRelativeView>
            {isLoading && <Loader />}
            <Canvas />
          </StyledRelativeView>
        </Col>
      </Row>
    </Grid>
  );
}

export default memo(Configurator);
