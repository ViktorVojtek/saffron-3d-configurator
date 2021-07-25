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
  const { payload, type } = action;

  switch (type) {
    case ActionEnumType.BED_IDX:
      return { ...state, bedIdx: payload };
    case ActionEnumType.HEAD_IDX:
      return { ...state, headIdx: payload };
    case ActionEnumType.MAT_IDX:
      return { ...state, matIdx: payload };
    case ActionEnumType.TUFT_IDX:
      return { ...state, tuftIdx: payload };
    case ActionEnumType.LEG_IDX:
      return { ...state, legIdx: payload };
    case ActionEnumType.LEG_MAT_IDX:
      return { ...state, legMatIdx: payload };
    default:
      return state;
  }
}