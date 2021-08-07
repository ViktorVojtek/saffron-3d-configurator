import { State } from './store';

export type ActionType = 'BED_IDX' | 'HEAD_IDX' | 'MAT_IDX' | 'TUFT_IDX' | 'LEG_IDX' | 'LEG_MAT_IDX';

export type Action = {
  payload: number;
  type: ActionType;
}

export default function Reducer(state: State, action: Action): State {
  const { payload, type } = action;

  switch (type) {
    case 'BED_IDX':
      return { ...state, bedIdx: payload };
    case 'HEAD_IDX':
      return { ...state, headIdx: payload };
    case 'MAT_IDX':
      return { ...state, matIdx: payload };
    case 'TUFT_IDX':
      return { ...state, tuftIdx: payload };
    case 'LEG_IDX':
      return { ...state, legIdx: payload };
    case 'LEG_MAT_IDX':
      return { ...state, legMatIdx: payload };
    default:
      return state;
  }
}