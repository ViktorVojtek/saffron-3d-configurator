import React, { useMemo } from 'react';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import StyledErrorMessage from './ErrorMessage.styled';

type Props = {
  name: string;
};

export default function ErrorMessage(props: Props): JSX.Element | null {
  const { name } = props;
  const { formState: { errors } } = useFormContext();

  const error = useMemo(() => get(errors, name), [errors, name]);
  const hasError = !!error;

  if (hasError) {
    return (
      <StyledErrorMessage>
        {error.message}
      </StyledErrorMessage>
    );
  }

  return null;
}
