import React, { ComponentPropsWithoutRef } from 'react';
import { useField } from 'formik';
import ErrorMessage from '../ErrorMessage';
import { StyledWrapper } from './FormCheckbox.styled';

type Props = ComponentPropsWithoutRef<'input'> & {
  label: string;
};

export default function FormCheckbox(props: Props) {
  const { label, type, ...rest } = props;
  const [field, meta] = useField({...rest, name: rest?.name as string});

  return (
    <StyledWrapper>
      <label htmlFor={rest.name}>
        <input type="checkbox" {...field} {...rest} />
        {label}
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage>
          <p>
            {meta.error}
          </p>
        </ErrorMessage>
      ) : null}
    </StyledWrapper>
  );
}
