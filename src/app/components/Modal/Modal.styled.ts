import styled from 'styled-components';

export const StyledWrapper = styled.div<{ visible?: boolean }>`
  background: rgba(0, 0, 0, 0.52);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const StyledContainer = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  min-width: 200px;
  padding: .25rem .5rem;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledBody = styled.div``;

export const StyledHead = styled.div``;
