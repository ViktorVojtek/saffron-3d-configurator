import styled from 'styled-components';

export const StyledWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex: 1;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledSubmitWrapper = styled.div`
  margin: 1rem 0;
`;
