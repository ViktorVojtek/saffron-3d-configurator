import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect
} from 'react';
import Reducer, { Action } from './reducer';
import useStorage from '../useStorage';

export type State = {
  bedIdx: number;
  headIdx: number | undefined;
  matIdx: number;
  tuftIdx: number;
  legIdx: number;
  legMatIdx: number;
}

const initState: State = {
  bedIdx: 0,
  headIdx: undefined,
  matIdx: 0,
  tuftIdx: 0,
  legIdx: 0,
  legMatIdx: 0
}

const storageKey = 'saffronAppState';

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
  
  const storage = useStorage();
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    Reducer,
    JSON.parse(storage.getItem(storageKey) as string) || initState
  );

  useEffect(() => {
    storage.setItem(storageKey, JSON.stringify(state));
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
