import styled from 'styled-components';

export const MenuWrapper = styled.div<{ show: boolean }>`
  background-color: rgba(255, 255, 255, .75);
  border-right: 1px solid #000;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  transform: translateX(${({ show }) => show ? '0' : '-100%'});
  transition: transform 1s;
  width: 33%;
  z-index: 5;
`;

export const MenuToggleBtn = styled.button<{ show: boolean }>`
  position: absolute;
  width: 50px;
  height: 53px;
  background-color: #fff;
  border: 1px solid #000;
  border-left: 0 none;
  border-radius: 0 6px 6px 0;
  outline: none;
  right: -50px;
  top: -1px;
  z-index: 10;

  &:after {
    content: '${({ show }) => show ? '\\00d7' : '\\203a'}';
    width: 20px;
    height: 20px;
  }
`;