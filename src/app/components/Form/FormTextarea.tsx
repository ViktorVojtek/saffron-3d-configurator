import React, { ComponentPropsWithoutRef } from 'react';
import { useField } from 'formik';
import ErrorMessage from '../ErrorMessage';
import { StyledContainer } from './Form.styled';
import { StyledTextarea } from './FormTextArea.styled';

type Props = ComponentPropsWithoutRef<'textarea'> & {
  label?: string;
};

export default function FormTextarea(props: Props) {
  const { label, ...rest } = props;
  const [field, meta] = useField({...rest, name: rest?.name as string});

  return (
    <StyledContainer error={!!meta.error}>
      {label && <label>{label}</label>}
      <StyledTextarea {...field} {...rest} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </StyledContainer>
  );
}
