import React, { useContext, useMemo, ReactNode, ComponentPropsWithoutRef } from 'react';
import { get } from 'lodash';
import { useFormContext, useController } from 'react-hook-form';
import IconAlert from '../Icon/IconAlert';
import ErrorMessage from '../ErrorMessage';
import { StyledContainer, StyledInput, StyledTextarea, StyledWrapper } from './Input.styled';
import { FormContext } from '../Form/Form';
import Text from '../styled/Text';


type InputProps = ComponentPropsWithoutRef<any> & {
  name: string;
  defaultValue?: string;
  rules?: Object;
  label?: ReactNode;
  next?: string;
  multiline?: boolean;
  rows?: number;
  transparent?: boolean;
  hideError?: boolean;
};

export default function Input(props: InputProps) {
  const { name, rules, defaultValue, label, next, multiline, transparent, hideError, ...rest } = props;
  const { control, formState: { errors } } = useFormContext();
  const formContext = useContext(FormContext);
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  const error = useMemo(() => get(errors, name), [errors, name]);
  const showError = !hideError && !!error;

  function handleSubmit(): void {
    if(rest?.type !== 'submit') {
      return;
    }

    if(!formContext) {
      throw new Error('Form context is not defined. Are you using Form component?');
    }

    formContext.submit();
  }

  return (
    <StyledWrapper>
      {label && (
        <Text>
          {label}
        </Text>
      )}
      <div>
        <StyledContainer
          transparent={transparent}
          error={showError}
        >
          {multiline ? (
            <StyledTextarea
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onSubmit={handleSubmit}
              {...rest}
            />
          ) : (
            <StyledInput
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onSubmit={handleSubmit}
              {...rest}
            />
          )}
          {showError && (
            <IconAlert>!</IconAlert>
          )}
        </StyledContainer>
        {showError && (
          <ErrorMessage name={name} />
        )}
      </div>
    </StyledWrapper>
  );
}

Input.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  label: undefined,
  next: undefined,
  multiline: false,
  rows: 5,
  transparent: false,
  hideError: false,
};
