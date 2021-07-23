import styled from "styled-components";

export const StyledWrapper = styled.div`
  flex: 2;
  position: relative;

  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;


export const StyledAbsolute = styled.div`
  bottom: 1rem;
  right: 1rem;
  position: absolute;
  z-index: 99;
`;
