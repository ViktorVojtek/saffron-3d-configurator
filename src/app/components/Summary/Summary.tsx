import React from 'react';
import { Trans } from '@lingui/macro';
import Text from '../../components/styled/Text';
import { useLocale, useStore } from '../../hooks';
import * as data from '../../../assets/data.json';

export default function Summary() {
  const locale = useLocale();
  const [{ bedIdx, headIdx, legIdx, legMatIdx, matIdx, tuftIdx }] = useStore();

  if (!data) {
    return null;
  }

  return (
    <>
      <h3>
        <Trans>Ordered Product</Trans>
      </h3>
      <Text>
        <Trans>Bed type: {data.bed[bedIdx].title}</Trans>
      </Text>
      <Text>
        <Trans>Bed material type: {data.textures.thumbnail.material[matIdx].title}</Trans>
      </Text>
      <Text>
        <Trans>Head type: {typeof headIdx === 'number' ? data.head[headIdx ].title : data.headDefault[bedIdx].title}</Trans>
      </Text>
      <Text>
        <Trans>Stitching color type: {data.textures.thumbnail.tuft[tuftIdx].title}</Trans>
      </Text>
      <Text>
        <Trans>Leg type: {data.leg[legIdx].title}</Trans>
      </Text>
      <Text>
        <Trans>Leg material type: {data.textures.thumbnail.leg[legMatIdx].title[locale]}</Trans>
      </Text>
    </>
  );
}
