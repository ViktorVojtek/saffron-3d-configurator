import React, { ComponentPropsWithoutRef } from 'react';
import { useField } from 'formik';
import ErrorMessage from '../ErrorMessage';
import { StyledContainer } from './Form.styled';
import { StyledInput, StyledWrapper } from './FormInput.styled';

type Props = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  type: 'text' | 'email';
};

export default function FormInput(props: Props) {
  const { label, type, ...rest } = props;
  const [field, meta] = useField({...rest, name: rest?.name as string});

  return (
    <StyledWrapper>
      <StyledContainer error={!!meta.error}>
        {label && <label>{label}</label>}
        <StyledInput {...field} {...rest} />
      </StyledContainer>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </StyledWrapper>
  );
}
