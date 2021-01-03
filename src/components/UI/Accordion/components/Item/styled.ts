import styled from 'styled-components';

export const ItemWrapper = styled.li<{ show: boolean; }>`
  min-height: 52px;
  width: 100%;
  overflow-y: auto;
  // padding-bottom: 52px;
  position: relative;
  
  &:last-child {
    border-bottom: 0 none;

    & > button {
      border-bottom: 0 none;
    }
  }

  ${({ show }) => (
    show
      ?
      `
      border-bottom: 1px solid #000;
      flex-grow: 1;

      &:last-child {
        & > button {
          border-bottom: 1px solid #000;
        }
      }
      `
      : ''
  )}
`;

export const ItemBtn = styled.button`
  background-color: transparent;
  border: 0 none;
  border-radius: 0;
  padding: .75rem 0;
  outline: 0;

  &:hover {
    background-color: rgba(220, 220, 220, .25);
  }
`;

export const ItemContent = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  margin-top: 1rem;
`;

export const Button = styled.button<{ show: boolean }>`
  background-color: #fff;
  border: 0 none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  width: 100%;
  text-align: center;
  outline: none;
  position: sticky;
  top: -1px;
`;
