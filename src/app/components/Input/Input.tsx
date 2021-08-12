/* import React, {
  ComponentPropsWithoutRef,
  FormEvent,
  useContext,
  // useState
} from 'react'; */

export default function Input() {
  return null;
}

/* import { FormContext, FormData, FormDataItem } from '../Form';
import ErrorMessage from '../ErrorMessage';
import { StyledContainer, StyledInput, StyledTextarea, StyledWrapper } from './Input.styled';

type Props = ComponentPropsWithoutRef<any> & {
  errorMessage?: string;
  label?: boolean;
  multiline?: boolean;
  name: string;
};

export default function Input(props: Props) {
  const { errorMessage, label, multiline, name, ...rest } = props;

  const formContext = useContext(FormContext);

  const isEmail = name.indexOf('email') > -1;

  function handleOnBlur() {
    if (!errorMessage) {
      return;
    }

    if (!formContext) {
      throw new Error('Input is not a child of Form component');
    }

    const { dispatch } = formContext;
  
    if (!formContext.data[name].value) {
      dispatch({
        ...formContext.data,
        [name]: {
          ...formContext.data[name],
          error: true
        }
      });
    } else {
      if (isEmail && !isEmailAddress(formContext.data[name].value)) {
        dispatch({
          ...formContext.data,
          [name]: {
            ...formContext.data[name],
            error: true
          }
        });
      } else {
        dispatch({
          ...formContext.data,
          [name]: {
            ...formContext.data[name],
            error: false
          }
        });
      }
    }
  }

  function handleOnChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!formContext) {
      throw new Error('Input is not a child of Form component');
    }
  
    formContext.dispatch({
      ...formContext.data,
      [name]: {
        ...formContext.data[name],
        value: (e.target as HTMLInputElement).value
      }
    });
  }

  const data = formContext?.data;
  const { error } = formContext?.data[name] as FormDataItem;

  return (
    <StyledWrapper>
      {
        label ? (
            <label htmlFor={name}>
              <p>{capitalise(name)}</p>
              <StyledContainer>
                {multiline ? (
                  <StyledTextarea
                    name={name}
                    value={(data as FormData)[name].value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    {...rest}
                  />
                ) : (
                  <StyledInput
                    name={name}
                    value={(data as FormData)[name].value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    {...rest}
                  />
                )}
              </StyledContainer>
            </label>
        ) : (
          <StyledContainer>
            {multiline ? (
              <StyledTextarea
                name={name}
                value={(data as FormData)[name].value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                {...rest}
              />
            ) : (
              <StyledInput
                name={name}
                value={(data as FormData)[name].value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                {...rest}
              />
            )}
          </StyledContainer>
        )
      }
      {error && errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledWrapper>
  );
}

Input.defaultProps = {
  label: false,
  multiline: false
};

function capitalise(str: string): string {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ');
}

function isEmailAddress(str: string): boolean {
  return !!str.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
} */