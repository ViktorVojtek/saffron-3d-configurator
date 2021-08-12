import React from 'react';
import {
  StyledCircleBackground,
  StyledCircleProgress,
  StyledCircleText,
  StyledWrapper
} from './Loader.styled';

type Props = {
  percentage: number;
  sqSize?: number;
  strokeWidth?: number;
};

export default function Loader(props: Props) {
  const { percentage, sqSize = 100, strokeWidth } = props;

  const radius = ((sqSize as number) - (strokeWidth as number)) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - dashArray * percentage / 100;

  return (
    <StyledWrapper>
      <svg
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}>
        <StyledCircleBackground
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`} />
        <StyledCircleProgress
          className="circle-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <StyledCircleText
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${percentage}%`}
        </StyledCircleText>
      </svg>
    </StyledWrapper>
  );
}

Loader.defaultProps = {
  sqSize: 100,
  percentage: 25,
  strokeWidth: 8
};
