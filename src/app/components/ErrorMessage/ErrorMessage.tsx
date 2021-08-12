import React, { ReactNode } from 'react';
import StyledErrorMessage from './ErrorMessage.styled';

type Props = {
  children: ReactNode;
};

export default function ErrorMessage(props: Props): JSX.Element | null {
  const { children } = props;
  
  return (
    <StyledErrorMessage>
      {children}
    </StyledErrorMessage>
  );
}
