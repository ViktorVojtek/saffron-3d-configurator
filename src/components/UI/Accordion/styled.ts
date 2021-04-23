import styled from 'styled-components';

export const AccordionWrapper = styled.ul`
  height: auto;
  margin: 0;
  padding: 0;
  
  @media only screen and (min-width: 770px) {
    height: 100vh;
  }

  @media only screen and (max-width: 480px) {
    height: auto;
  }
`;
