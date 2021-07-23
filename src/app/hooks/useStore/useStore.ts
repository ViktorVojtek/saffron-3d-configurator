import { Dispatch, useContext } from 'react';
import { Action } from './reducer';
import { StoreContext, State } from './store';

export default function useStore(): [
  State,
  Dispatch<Action>
] {
  const {state, dispatch} = useContext(StoreContext);

  return [state, dispatch];
}
