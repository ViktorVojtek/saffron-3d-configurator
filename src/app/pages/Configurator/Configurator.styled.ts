import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100% - 4px);

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    overflow-y: auto;
  }
`;

type Props = {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
}

export const StyledAbsoluteView = styled.div<Props>`
  position: absolute;
  ${({ top }) => (top ? `top: ${top};` : '')}
  ${({ left }) => (left ? `left: ${left};` : '')}
  ${({ right }) => (right ? `right: ${right};` : '')}
  ${({ bottom }) => (bottom ? `bottom: ${bottom};` : '')}
`;

export const StyledRelativeView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // border: 1px solid red;
`;
