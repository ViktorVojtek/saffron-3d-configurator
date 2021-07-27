import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react';

type State = {
  ALL: 'inprogress' | 'done';
  MODEL: 'loading' | 'done';
  TEXTURES: 'loading' | 'done';
};

const initState: State = {
  ALL: 'inprogress',
  MODEL: 'loading',
  TEXTURES: 'loading'
};

export const ModelStateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => null,
});

export enum ModelAction {
  ALL = 'ALL',
  MODEL = 'MODEL',
  TEXTURES = 'TEXTURES'
}

type Action = {
  type: ModelAction;
  payload: 'inprogress' | 'loading' | 'done'; 
};

function Reducer(state: State, action: Action): State {
  const { payload, type } = action;

  switch(type) {
    case ModelAction.ALL:
      return {
        ...state,
        MODEL: payload === 'done' ? 'done' : 'loading',
        TEXTURES: payload === 'done' ? 'done' : 'loading',
        ALL: payload as 'inprogress' | 'done'
      };
    case ModelAction.MODEL:
      return { ...state, MODEL: payload as 'loading' | 'done' };
    case ModelAction.TEXTURES:
      return { ...state, TEXTURES: payload as 'loading' | 'done' };
    default:
      return state;
  }
}

type Props = {
  children: ReactNode;
}

export const ModelStateProvider = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(Reducer, initState);

  return (
    <ModelStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ModelStateContext.Provider>
  );
}

export default function useModelState(): [
  State,
  Dispatch<Action>
] {
  const { state, dispatch } = useContext(ModelStateContext);

  return [state, dispatch];
}
