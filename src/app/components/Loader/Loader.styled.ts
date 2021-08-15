import styled from 'styled-components';

export const StyledLoaderWrapper = styled.div`
  width: 100%;
  min-height: 250px;
`;

export const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCircleBackground = styled.circle`
  fill: #fff;
  stroke: ${({ theme }) => (theme.palette.common.grey)};
`;

export const StyledCircleProgress = styled.circle`
  fill: none;
  stroke: ${({ theme }) => (theme.palette.common.black)};
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const StyledCircleText = styled.text`
  font-size: 1em;
  font-weight: bold;
  fill: ${({ theme }) => (theme.palette.common.black)};
`;