import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100% - 4px);

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    height: 100vh;
    overflow-y: auto;
  }
`;
