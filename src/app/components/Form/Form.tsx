import React, {
  Dispatch,
  ReactNode,
  createContext,
  useState
} from 'react';

export type FormDataItem = {
  value: string;
  error: boolean;
};

export type FormData = {
  [key: string]: FormDataItem;
}

export const FormContext = createContext<{
  data: FormData;
  dispatch: Dispatch<any>;
  submit: Function;
} | undefined>(undefined);

type Props = {
  children: ReactNode;
  initData?: any;
  onSubmit: Function;
};

export default function Form(props: Props) {
  const { initData, onSubmit, children } = props;

  const [data, dispatch] = useState(initData || {});

  const handleSubmit = onSubmit;

  const context = {
    data,
    dispatch,
    submit: handleSubmit,
  };

  // console.log('FORM CONTEXT', context);

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={(evt) => evt.preventDefault()}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
