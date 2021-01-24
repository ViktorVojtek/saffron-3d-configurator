import styled from 'styled-components';

export const ItemWrapper = styled.li<{ show: boolean; }>`
  // min-height: 52px;
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
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0 none;
  border-radius: 0;
  display: flex;
  padding: .75rem 0;
  outline: 0;
  flex: none;
  width: 99.9%;
  flex-direction: column-reverse;
  transition: all .3s;

  &:hover {
    background-color: rgb(115, 115, 115, .05); // rgba(220, 220, 220, .25);
  }
`;

export const ItemImg = styled.img`
  max-width: 45%;
  margin-right: .5rem;
`;

export const ItemContent = styled.div<{ horizontal?: boolean; show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-flow: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  // margin-top: 1rem;
  ${({ horizontal }) => horizontal ? 'height: calc(100% - 45px);' : ''}
`;

export const Button = styled.button<{ horizontal?: boolean; show: boolean }>`
  background-color: #fff;
  border: 0 none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  color: #35342D;
  width: 100%;
  text-align: center;
  outline: none;
  position: sticky;
  ${({ horizontal }) => (horizontal ? 'left' : 'top')}: -1px;
  font-family: "Josefin Sans", Sans-serif;
  text-transform: uppercase;
  transition: all .3s;

  &:hover {
    background-color: rgba(33, 28, 23, .65);
    color: #fff;
  }
`;
