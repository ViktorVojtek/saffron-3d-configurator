import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { StyledButton } from './Button.styled';

type Props = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
}

export default function Button(props: Props) {
  const { children, ...rest } = props;

  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
};
