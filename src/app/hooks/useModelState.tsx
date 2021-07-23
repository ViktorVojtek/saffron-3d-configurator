import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState
} from 'react';
import { useReducer } from 'react';

type ModelState = {
  allSet: boolean;
  headSet: boolean;
  baseSet: boolean;
  legSet: boolean;
};

const initModelState = {
  allSet: false,
  headSet: false,
  baseSet: false,
  legSet: false,
};

export const ModelStateContext = createContext<{
  modelState: ModelState;
  dispatch: Dispatch<ModelStateAction>;
}>({
  modelState: initModelState,
  dispatch: () => null,
});

type ModelStateProviderProps = {
  children: ReactNode;
}

export enum ModelStateActionType {
  ALL_SET = 'ALL_SET',
  HEAD_SET = 'HEAD_SET',
  BASE_SET = 'BASE_SET',
  LEG_SET = 'LEG_SET'
}

type ModelStateAction = {
  type: ModelStateActionType;
  payload: boolean;
};

function Reducer(state: ModelState, action: ModelStateAction): ModelState {
  switch(action.type) {
    case ModelStateActionType.ALL_SET:
      return {
        ...state,
        headSet: action.payload,
        baseSet: action.payload,
        legSet: action.payload,
        allSet: action.payload
      };
    case ModelStateActionType.HEAD_SET:
      return { ...state, headSet: action.payload };
    case ModelStateActionType.BASE_SET:
      return { ...state, baseSet: action.payload };
    case ModelStateActionType.LEG_SET:
      return { ...state, legSet: action.payload };
    default:
      return state;
  }
}

export const ModelStateProvider = (props: ModelStateProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(Reducer, initModelState);

  return (
    <ModelStateContext.Provider value={{ modelState: state, dispatch }}>
      {children}
    </ModelStateContext.Provider>
  );
}

export default function useNavigation(): [
  ModelState,
  Dispatch<ModelStateAction>
] {
  const { modelState, dispatch } = useContext(ModelStateContext);

  return [modelState, dispatch];
}
