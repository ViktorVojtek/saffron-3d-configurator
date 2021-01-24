import styled from 'styled-components';

export const MenuWrapper = styled.div<{ show: boolean }>`
  background-color: rgba(255, 255, 255, .75);
  border-right: 1px solid #000;
  float: left;
  height: 100%;
  // margin: 0;
  // padding: 0;
  // position: absolute;
  // top: 0;
  // transform: translateX(${({ show }) => show ? '0' : '-100%'});
  transition: transform .3s;
  width: 40%;
  // z-index: 5;

  @media only screen and (max-width: 580px) {
    position: absolute;
    background-color: #fff;
    transform: translateX(${({ show }) => (show ? '0' : '-100%')});
    width: 100%;
    z-index: 1;
  }
`;

export const MenuToggleBtn = styled.button<{ show: boolean }>`
  position: absolute;
  width: 50px;
  padding: .75rem 0;
  // height: 53px;
  background-color: transparent;
  border: 0 none;
  // border: 1px solid #000;
  // border-left: 0 none;
  // border-radius: 0 6px 6px 0;
  outline: none;
  z-index: -1;

  &:after {
    content: '${({ show }) => show ? '\\2715' : '\\2630'}'; // '\\00d7' : '\\203a'
    width: 20px;
    height: 20px;
  }

  @media only screen and (max-width: 580px) {
    right: ${({show}) => (show ? '0' : '-50px')};
    top: -1px;
    z-index: 10;
  }
`;