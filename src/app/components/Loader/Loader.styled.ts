import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background-color: #fff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  z-index: 1;
`;

export const StyledCircle = styled.circle<{
  circumference: number;
}>`
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: #525151;
  stroke-width: 4;
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ offset }) => offset};
`;
