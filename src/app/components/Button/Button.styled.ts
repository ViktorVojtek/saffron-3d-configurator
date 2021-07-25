import styled from 'styled-components';

export const StyledButtonBase = styled.button`
  background: transparent;
  border: 0;
`;

export const StyledButton = styled(StyledButtonBase)`
  background-color: #000;
  border: 0;
  border-radius: 0.25rem;
  color: #fff;
  padding: 0.75rem 1rem;
`;

export const StyledCloseButton = styled(StyledButtonBase)`
  border-radius: 999px;
  border: 1px solid #000;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;

  &:after {
    content: '\\d7';
  }
`;
