import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import Reducer, { Action } from './reducer';

export type State = {
  bedIdx: number;
  // baseIsSet: boolean;
  headIdx: number | undefined;
  // headIsSet: boolean;
  matIdx: number;
  tuftIdx: number;
  legIdx: number;
  legMatIdx: number;
}

const initState: State = {
  bedIdx: 0,
  // baseIsSet: false,
  headIdx: undefined,
  // headIsSet: false,
  matIdx: 0,
  tuftIdx: 0,
  legIdx: 0,
  legMatIdx: 0
}

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => null,
});

type StoreProviderProps = {
  children: ReactNode
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(Reducer, initState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
