import styled from 'styled-components';

interface ICenterProps {
  second?: boolean;
  show: boolean;
}

export const MenuCenter = styled.div<ICenterProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  bottom: 5rem;
  pointer-events: none;
`;

interface IMenuWrapperProps {
  show: boolean;
}

export const MenuBtnsWrapper = styled.div`
  display: flex;
  position: absolute;
  padding-bottom: .5rem;
  top: -35px;
  width: 100%;
`;

export const MenuCloseBtn = styled.button`
  background-color: rgba(0, 0, 0, 0.75);
  border: 2px solid #dedede;
  border-radius: 50%;
  color: #fff;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: 10px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IMBC {
  disabled?: boolean;
}
export const MenuButtonComponent = styled.button<IMBC>`
  margin-right: .5rem;
  background-color: ${({ disabled }) => disabled ? 'rgba(0, 0, 0, 0.75)' : '#000'};
  color: ${({ disabled }) => disabled ? '#dedede' : '#fff'};
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 0 none;
`;

export const MenuWrapper = styled.div`
  display: ${({ show }: IMenuWrapperProps) => (show ? 'block' : 'none')};
  background: transparent;
  // border-radius: 0.25rem;
  position: relative;
  padding: 0.4rem 0.75rem;
  margin: 0 auto;
  // width: fit-content;
  width: 65%;
  // overflow-x: scroll;
  // overflow-y: hidden;
  pointer-events: all;
  // white-space: nowrap;
`;

interface IMWN {
  bed?: boolean;
}
// ${({ bed }: IMWN) => bed && 'justify-content: center;'}
// ${({ bed }: IMWN) => (bed ? 'flex' : 'block')};

export const MenuWrapperNarrow = styled.div<IMWN>`
  background: rgba(0, 0, 0, 0.75);
  border-radius: 0.25rem;
  display: block;
  position: relative;
  padding: 0.4rem 0.75rem;
  margin: 0 auto;
  width: fit-content;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  pointer-events: all;
  white-space: nowrap;
`;

interface IMWF {
  center?: boolean;
}
export const MenuWrapperFlex = styled.div<IMWF>`
  display: flex;
  ${({ center }) => center && 'justify-content: center;'}
`;

export const MenuWrapCont = styled.div`
  position: relative;
  margin: 0 auto;
`;

interface IMenuItemProps {
  img: string;
  colorItem?: boolean;
  width?: number;
}

export const MenuItem = styled.div<IMenuItemProps>`
  background: ${({ colorItem, img }) =>
    colorItem ? `#${img}` : `url(${img}) center center no-repeat`};
  background-position-x: 0;
  background-size: 100%;
  border: 2px solid #fff;
  border-radius: 0.25rem;
  display: block;
  margin: 0 auto;
  width: ${({ width }) => width ? Math.round(width / 9) : 50}px;
  height: ${({ width }) => width ? Math.round(width / 9) : 50}px;
  pointer-events: all;
`;

export const MenuItemWrap = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
`;

interface IMenuTitle {
  left?: boolean;
}

export const MenuTitle = styled.strong`
  color: #fff;
  font-family: sans-serif;
  font-size: 0.75rem;
  margin-top: 0.2rem;
  display: block;
  text-align: ${({ left }: IMenuTitle) => (left ? 'left' : 'center')};
`;

// ${({ bed }) => bed && 'position: absolute; left: 0.75rem;'}
export const MenuTitleP = styled.p<IMWN>`
  margin-top: 0;
  margin-bottom: 0.5rem;
  text-align: left !important;
`;