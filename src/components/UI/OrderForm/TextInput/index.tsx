import * as React from 'react';
import {
  ErrorIconWrapper,
  ErrorText,
  Input,
  TextWrapper,
} from './TextInput.styled';
import { isEmail } from '../../../../utils/fn/isEmail';

const { useState, createRef } = React;

type State = {
  valid: boolean;
};
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  errorText?: string;
  validate?: boolean;
};

const initialState: State = {
  valid: true,
};

export default function TextInput(props: Props): JSX.Element {
  const { errorText, name, placeholder, type, validate } = props;
  const InputRef = createRef<HTMLInputElement>();

  const [state, setState] = useState<State>(initialState);

  const handleOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const text = event.currentTarget.value;

    if (!!text === false) {
      setState({
        ...state,
        valid: false,
      });
      console.log('State valid set to false');
    } else if (type && type === 'email') {
      const emailValue = InputRef?.current?.value;

      if (!isEmail(emailValue)) {
        setState({
          ...state,
          valid: false,
        });
      } else {
        if (!state.valid) {
          setState({
            ...state,
            valid: true,
          });
        }
      }
    } else {
      if (!state.valid) {
        setState({
          ...state,
          valid: true,
        });
      }
    }
  };

  const { valid } = state;

  return (
    <React.Fragment>
      <TextWrapper valid={valid}>
        <Input
          ref={InputRef}
          type={type || 'text'}
          onBlur={(event) => validate && handleOnBlur(event)}
          placeholder={placeholder}
          valid={valid}
        />
        {!valid && <ErrorIconWrapper>!</ErrorIconWrapper>}
      </TextWrapper>
      {!valid && (
        <ErrorText>
          <small>{errorText || `${name} not valid!`}</small>
        </ErrorText>
      )}
    </React.Fragment>
  );
}
