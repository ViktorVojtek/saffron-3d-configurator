import * as React from 'react';
import { H4 } from './styled';

export default function ({ title }: { title: string }): JSX.Element {
  return <H4>{title}</H4>;
}
