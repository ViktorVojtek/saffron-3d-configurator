import React, { ReactNode } from 'react';
import { StyledWrapper, StyledP } from './IconAlert.styled';

type Props = {
  children: ReactNode;
}

export default function IconAlert(props: Props): JSX.Element {
  const { children } = props;

  return (
    <StyledWrapper>
      <StyledP>{children}</StyledP>
    </StyledWrapper>
  );
}
