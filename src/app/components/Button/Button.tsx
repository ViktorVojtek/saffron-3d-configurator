import React, { ComponentPropsWithoutRef, ReactNode, useContext } from 'react';
// import { useFormContext } from 'react-hook-form';
import { FormContext, FormData, FormDataItem } from '../Form';
import { StyledButton } from './Button.styled';

type Props = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  submit?: boolean;
}

export default function Button(props: Props) {
  const { children, submit, ...rest } = props;
  const formContext = useContext(FormContext);
  // const useUseFormContext = useFormContext();

  // const isSubmitting = useUseFormContext?.formState?.isSubmitting;
  // const isLoading = submit && isSubmitting;

  function handleOnClick(evt:any): void {
    if (rest?.type === 'submit') {
      handleOnSubmit();

      return;
    }

    if(typeof rest?.onClick !== 'function') {
      return;
    }

    rest?.onClick(evt);
  }

  function handleOnSubmit(): void {
    if (!formContext) {
      throw new Error('Form context is not defined. Are you using Form component?');
    }

    formContext?.submit();
  }

  function isDisabled(): boolean {
    if (!formContext) {
      return false;
    }

    const allEmpty = Object.values(
      formContext?.data
    ).every((item) => !!item.value === false);

    if (allEmpty) {
      return true;
    }
  
    return Object.values(
      formContext?.data
    )?.find(({ error }: FormDataItem) => !!error)?.error === true;
  }

  // console.log(formContext);

  const disabled = isDisabled();

  return (
    <StyledButton
      disabled={disabled}
      onClick={handleOnClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
