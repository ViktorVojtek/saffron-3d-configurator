import React, { useMemo } from 'react';
import StyledErrorMessage from './ErrorMessage.styled';

type Props = {
  message: string;
};

export default function ErrorMessage(props: Props): JSX.Element | null {
  const { message } = props;
  
  return (
    <StyledErrorMessage>
      {message}
    </StyledErrorMessage>
  );
}
