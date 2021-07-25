import React, { ComponentPropsWithoutRef } from 'react';
import { StyledCloseButton } from './Button.styled';

type Props = ComponentPropsWithoutRef<'button'>;

export default function ButtonClose(props: Props): JSX.Element {
  return (
    <StyledCloseButton {...props} />
  );
}
