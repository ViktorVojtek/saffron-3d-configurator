import * as React from 'react';
import { H4, Wrapper } from './styled';

export default function ({ title }: { title: string }): JSX.Element {
  return (
    <Wrapper>
      <H4>Typ postele: {title}</H4>
    </Wrapper>
  );
}
