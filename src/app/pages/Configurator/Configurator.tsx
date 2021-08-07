import React, { memo, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Col, Row } from 'react-awesome-styled-grid';
import { t, Trans } from '@lingui/macro';
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
import LoaderBase from '../../components/Loader';
import Navigation from '../../components/Navigation';
import Text from '../../components/styled/Text';
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
          `https://saffron.enli.technology/static/models/saffron/Aurelia/textures/bed/aurelia_c${matIdx+1}_w${legMatIdx+1}_n${tuftIdx+1}.png`
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

  function handleOnClick(): void {
    const path = '/summary';

    takeScreenshots();

    history.push(path);
  }

  function Loader(): JSX.Element {
    return (
      <LoaderBase progress={progress}>
        <Text inline textAlign="center">
          <Trans>Loading {MODEL !== 'done' ? t`Model` : (TEXTURES !== 'done' ? t`Textures` : '')}</Trans>
        </Text>
      </LoaderBase>
    );
  }

  if (
    isLoading &&
    scene.children.length < 3 &&
    TEXTURES !== 'done' &&
    MODEL !== 'done'
  ) {
    return <Loader />;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={4} md={3} lg={4} order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
            <Navigation data={data} />
          </Col>
          <Col lg={8} order={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <StyledRelativeView>
              {isLoading && <Loader />}
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
    </>
  );
}

export default memo(Configurator);
