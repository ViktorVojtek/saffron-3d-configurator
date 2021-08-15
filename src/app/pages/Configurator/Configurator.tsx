import React, { memo, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, Row } from 'react-awesome-styled-grid';
import { Trans } from '@lingui/macro';
import { ObjectOptions } from '../../@types';
import {
  useLoadModel,
  useLoading,
  useScene,
  useStore,
  useModelState,
  useTakeScreeshot,
} from '../../hooks';
import Button from '../../components/Button';
import Canvas from '../../components/Canvas';
import Loader, { StyledLoaderWrapper } from '../../components/Loader';
import Navigation from '../../components/Navigation';
import { StyledAbsoluteView, StyledRelativeView } from './Configurator.styled';

import data from '../../../assets/data.json';

function Configurator(): JSX.Element {
  const history = useHistory();
  const [isLoading] = useLoading();
  const [{ progress }, loadModel] = useLoadModel();
  const { takeScreenshots } = useTakeScreeshot();
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
      textureMap: bedIdx > 0
        ? (
          tuftIdx > 0
            ? (data.textures.bed[bedIdx][matIdx] as any).textureTuftMap[tuftIdx] as string
            : data.textures.bed[bedIdx][matIdx].textureMap as string
        )
        : (
          `https://saffron.enli.technology/static/models/saffron/Aurelia/textures/bed/aurelia_c${matIdx+1}_w${legMatIdx+1}.png` // _n${tuftIdx+1}
        )
    },
    head: {
      name: typeof headIdx === 'number'
        ? data.head[headIdx].title.toLowerCase()
        : data.headDefault[bedIdx].title,
      position: data.position[bedIdx].head,
      textureMap: headIdx !== undefined ? (
        headIdx !== 3
          ? data.textures.head[headIdx][bedIdx][matIdx].textureMap as string
          : data.textures.head[headIdx][bedIdx][matIdx].textureMap[legMatIdx]
      ) : (
        data.headDefault[bedIdx].value !== 3
          ? data.textures.head[data.headDefault[bedIdx].value][bedIdx][matIdx].textureMap as string
          : data.textures.head[data.headDefault[bedIdx].value][bedIdx][matIdx].textureMap[legMatIdx]
      )
    },
    leg: {
      name: data.leg[legIdx].title.toLowerCase(),
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

  function handleOnClick(): void {
    const path = '/summary';

    takeScreenshots();

    history.push(path);
  }

  if (
    isLoading &&
    scene.children.length < 3 &&
    TEXTURES !== 'done' &&
    MODEL !== 'done'
  ) {
    return (
      <StyledLoaderWrapper>
        <Container fluid>
          <Row>
            <Col align="center" justify="center">
              <Loader percentage={progress} />
            </Col>
          </Row>
        </Container>
      </StyledLoaderWrapper>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col
          md={3}
          lg={4}
          order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
        >
          <Navigation data={data} />
        </Col>
        <Col
          md={5}
          lg={8}
          order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
        >
          <StyledRelativeView id="canvas-r-wrap">
            {isLoading && <Loader percentage={progress} />}
            <Canvas />
            <StyledAbsoluteView bottom="1rem" right="1rem">
              <Button onClick={handleOnClick}>
                <Trans>Summary</Trans>
              </Button>
            </StyledAbsoluteView>
          </StyledRelativeView>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Configurator);
