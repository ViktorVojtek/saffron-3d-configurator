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

export const StyledRelativeView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
