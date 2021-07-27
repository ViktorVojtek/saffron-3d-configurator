import styled from 'styled-components';

export const StyledWrapper = styled.div<{ border?: boolean }>`
  border-right: ${({ border }) => (border ? '1px solid #000' : '0 none')};
  // min-width: 400px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    // min-width: auto;
  }
`;

export const StyledUl = styled.ul`
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = { active?: boolean }

export const StyledLi = styled.li<Props>`
  height: ${({ active }) => active ? 'calc((100% - 281px) + 56px)' : 'auto'};

  &:last-child button {
    border-bottom: 1px solid transparent;
  }
  ${({ active }) => (active && `
    & + li {
      border-top: 1px solid #000;
    }
  `)}
`;

export const StyledButton = styled.button<Props>`
  background-color: ${({ active }) => active ? 'rgba(33, 28, 23, 0.65)' : '#fff'};
  border: 0 none;
  border-bottom: 1px solid ${({ active }) => active ? 'transparent' : '#000'};
  color: ${({ active }) => active ? '#fff' : '#000'};
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  height: 55px;
`;

export const StyledAccordionItem = styled.div<Props>`
  display: ${({ active }) => active ? 'block' : 'none'};
  width: 100%;
  height: 100%;
`;
