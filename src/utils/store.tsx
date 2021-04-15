import * as React from 'react';
import { createContext, useContext, useReducer, Dispatch } from 'react';

export enum ToLoadEnum {
  MODEL = 'MODEL',
  HEAD_TEXTURE = 'HEAD_TEXTURE',
  BED_TEXTURE = 'BED_TEXTURE',
  LEG_TEXTURE = 'LEG_TEXTURE',
  TEXTURE = 'TEXTURES',
}

interface IState {
  currentModelName: string;
  dimensions: {
    width: number;
    height: number;
  };
  showMenu: boolean;
  menuItem: number;
  menuItems: any[];
  models: any[];
  matIdx: number | undefined;
  matTitle: string | undefined;
  objIdx: number | undefined;
  legIdx: number;
  legIsSet: boolean;
  legMatIdx: number;
  legTitle: string;
  legMatTitle: string;
  tuft: any;
  tufts: boolean;
  tuftIdx: number | undefined;
  tuftTitle: string;
  headTitle: string;
  headIdx: number | undefined;
  headIsSet: boolean;
  objectUUID: string;
  objectID: number;
  orderImages: any[];
  progress: number;
  showForm: boolean;
  loaded: boolean;
  loadingContent: ToLoadEnum;
}

const initialState: IState = {
  currentModelName: 'NOT_EXISTING_MODEL',
  dimensions: {
    width: 0,
    height: 0,
  },
  showMenu: false,
  menuItem: 0,
  menuItems: [],
  tufts: false,
  models: [],
  matIdx: 0,
  matTitle: 'Antracit',
  objIdx: 0,
  headIdx: undefined,
  legIdx: 0,
  legIsSet: false,
  legMatIdx: 0,
  legMatTitle: 'Prírodný dub',
  legTitle: 'Cube',
  tuft: {},
  tuftIdx: 0,
  tuftTitle: 'Biela',
  headTitle: '',
  headIsSet: false,
  objectUUID: '',
  objectID: 0,
  orderImages: [],
  progress: 0,
  showForm: false,
  loaded: false,
  loadingContent: ToLoadEnum.MODEL,
};

export const Context = createContext<{
  state: IState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_MODEL_NAME':
      return { ...state, currentModelName: action.payload };
    case 'SET_DIMENSIONS':
      return { ...state, dimensions: action.payload };
    case 'SET_MENU_ITEM':
      return { ...state, menuItem: action.payload };
    case 'SET_MENU_ITEMS':
      return { ...state, menuItems: action.payload };
    case 'TOGGLE_FORM':
      return { ...state, showForm: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, showMenu: action.payload };
    case 'SET_OBJ_IDX':
      return { ...state, objIdx: action.payload };
    case 'SET_HEAD_IDX':
      return { ...state, headIdx: action.payload };
    case 'SET_LEG_IDX':
      return { ...state, legIdx: action.payload };
    case 'SET_LEG_MAT_IDX':
      return { ...state, legMatIdx: action.payload };
    case 'SET_LEG_MAT_TITLE':
      return { ...state, legMatTitle: action.payload };
    case 'SET_LEG_TITLE':
      return { ...state, legTitle: action.payload };
    case 'SET_LEG_ISSET':
      return { ...state, legIsSet: true };
    case 'SET_HEAD_TITLE':
      return { ...state, headTitle: action.payload };
    case 'SET_HEAD_ISSET':
      return { ...state, headIsSet: true };
    case 'SET_MAT_IDX':
      return { ...state, matIdx: action.payload };
    case 'SET_MAT_TITLE':
      return { ...state, matTitle: action.payload };
    case 'SET_OBJECT_UUID':
      return { ...state, objectUUID: action.payload };
    case 'SET_OBJECT_ID':
      return { ...state, objectID: action.payload };
    case 'SET_ORDER_IMAGES':
      return { ...state, orderImages: action.payload };
    case 'SET_MODELS':
      return { ...state, models: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_LOADED':
      return { ...state, loaded: action.payload };
    case 'SET_LOADED_CONTENT':
      return { ...state, loadingContent: action.payload };
    case 'SET_TUFT_IDX':
      return { ...state, tuftIdx: action.payload };
    case 'SET_TUFTS':
      return { ...state, tufts: action.payload };
    case 'SET_TUFT_TITLE':
      return { ...state, tuftTitle: action.payload };
    default:
      return { ...state };
  }
};

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
