import * as React from 'react';
import { useStore } from '../../../utils/store';
import { BtnWrapper } from './styled';

export default function ({
  direction = 'left',
}: {
  direction?: string;
}): JSX.Element {
  const {
    state: {
      dimensions: { width },
      models,
      objIdx,
    },
    dispatch,
  } = useStore();

  const handleObject = () => {
    if (direction === 'left' && objIdx > 0) {
      dispatch({ type: 'SET_OBJ_IDX', payload: objIdx - 1 });
    }
    if (direction !== 'left' && objIdx < models.length - 1) {
      dispatch({ type: 'SET_OBJ_IDX', payload: objIdx + 1 });
    }
  };

  return (
    <BtnWrapper
      left={direction === 'left'}
      onClick={handleObject}
      width={width || 0}
      dangerouslySetInnerHTML={{
        __html: direction === 'left' ? '&#8249;' : '&#8250;',
      }}
    />
  );
}
