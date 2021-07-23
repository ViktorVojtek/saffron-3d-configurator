import React, { useRef } from 'react';
import useRadians from '../../hooks/useRadians';
import { StyledCircle, StyledWrapper } from './Loader.styled';

type Props = {
  progress: number;
}

export default function Loader(props: Props): JSX.Element {
  const { progress } = props;
  const circleRef = useRef(null);
  const radians: [number, number] = useRadians(progress, circleRef);

  // console.log(progress);
  // console.log(radians);

  return (
    <StyledWrapper>
      <svg width='100' height='100'>
        <StyledCircle
          ref={circleRef}
          fill='transparent'
          r='40'
          cx='50'
          cy='50'
          circumference={radians[0]}
          offset={radians[1]}
        />
      </svg>
      <p>Loading</p>
    </StyledWrapper>
  );
}
