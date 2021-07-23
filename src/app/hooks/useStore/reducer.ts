import useStorage from '../useStorage';
import { State } from './store';

export enum ActionEnumType {
  BED_IDX = 'BED_IDX',
  HEAD_IDX = 'HEAD_IDX',
  MAT_IDX = 'MAT_IDX',
  TUFT_IDX = 'TUFT_IDX',
  LEG_IDX = 'LEG_IDX',
  LEG_MAT_IDX = 'LEG_MAT_IDX'
}

export type Action = {
  payload: number;
  type: ActionEnumType
}

export default function Reducer(state: State, action: Action): State {
  const storage = useStorage();
  const { payload, type } = action;

  switch (type) {
    case ActionEnumType.BED_IDX:
      storage.setItem('bedIdx', `${payload}`);

      return { ...state, bedIdx: payload };
    case ActionEnumType.HEAD_IDX:
      storage.setItem('headIdx', `${payload}`);

      return { ...state, headIdx: payload };
    case ActionEnumType.MAT_IDX:
      storage.setItem('matIdx', `${payload}`);
  
      return { ...state, matIdx: payload };
    case ActionEnumType.TUFT_IDX:
      storage.setItem('tuftIdx', `${payload}`);
  
      return { ...state, tuftIdx: payload };
    case ActionEnumType.LEG_IDX:
      storage.setItem('legIdx', `${payload}`);
  
      return { ...state, legIdx: payload };
    case ActionEnumType.LEG_MAT_IDX:
      storage.setItem('legMatIdx', `${payload}`);

      return { ...state, legMatIdx: payload };
    default:
      return state;
  }
}