import styled from 'styled-components';

export const StyledWrapper = styled.div<{ position?: 'absolute' | 'static'}>`
  // position: ${({ position }) => (position || 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAbsolute = styled.div`
  bottom: 1rem;
  right: 1rem;
  position: absolute;
  z-index: 99;
`;
