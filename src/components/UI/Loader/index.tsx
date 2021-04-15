import * as React from 'react';
import { Circle, LoaderWrapper, LabelContent } from './styled';

const { useEffect, useRef, useState } = React;

const useRadians: (
  progress: number,
  ref: React.MutableRefObject<any>
) => number[] = (progress, ref) => {
  const [radians, setRadians] = useState([0, 250]);

  useEffect(() => {
    const radius = ref.current.r.baseVal.value;
    const circumference = Math.round(radius * 2 * Math.PI);
    const offset = Math.round(circumference - (progress / 100) * circumference);

    setRadians([circumference, offset]);
  }, [progress]);

  return radians;
};

export default function ({
  progress,
  show,
  label,
}: {
  progress: number;
  show: boolean;
  label?: string;
}): JSX.Element {
  const circleRef: React.MutableRefObject<any> = useRef(null);
  const radians: number[] = useRadians(progress, circleRef);

  const content =
    label === 'MODEL'
      ? 'Nahrávam 3D model'
      : label === 'HEAD_TEXTURE'
      ? 'Nahrávam textúru čela postele...'
      : label === 'BED_TEXTURE'
      ? 'Nahrávam textúru postele...'
      : label === 'LEG_TEXTURE'
      ? 'Nahrávam textúry nôh postele...'
      : 'Nahrávam textúry...';

  return (
    <LoaderWrapper show={radians[0] > radians[1] && show}>
      <svg width='100' height='100'>
        <Circle
          ref={circleRef}
          fill='transparent'
          r='40'
          cx='50'
          cy='50'
          circumference={radians[0]}
          offset={radians[1]}
        />
      </svg>
      <LabelContent>{content}</LabelContent>
    </LoaderWrapper>
  );
}
