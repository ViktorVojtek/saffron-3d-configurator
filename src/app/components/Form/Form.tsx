import React, { ReactNode, createContext } from 'react';
import { UseFormReturn, FormProvider } from 'react-hook-form';

export const FormContext = createContext<{ submit: Function; } | undefined>(undefined);

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void> | void;
};

export default function Form(props: Props) {
  const { methods, onSubmit, children } = props;

  const handleSubmit = methods.handleSubmit(onSubmit);

  const context = {
    submit: handleSubmit,
  };

  return (
    <FormContext.Provider value={context}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </FormContext.Provider>
  );
}
