import styled from 'styled-components';

export const ItemWrapper = styled.li<{ show: boolean; }>`
  // min-height: 52px;
  width: 100%;
  // overflow-y: auto;
  // padding-bottom: 52px;
  position: relative;
  overflow: hidden;
  
  &:first-child {
    border-top: 1px solid #000;
  }
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
      background-color: rgb(115, 115, 115, .05);
      border-bottom: 1px solid #000;
      height: 67%;
      // flex-grow: 1;

      &:last-child {
        & > button {
          border-bottom: 1px solid #000;
        }
      }

      @media only screen and (max-width: 770px) {
        height: 55%;
      }
      `
      : ''
  )}
`;

export const ItemBtn = styled.button<{ second?: boolean; }>`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  display: flex;
  // padding: .75rem 0 0 0;
  outline: 0;
  // flex: none;
  width: ${({ second }) => (second ? '35%' : '100%')};
  flex-direction: column-reverse;
  font-size: 1.05rem;
  transition: all .3s;
  flex-shrink: 0;
  scroll-snap-align: center;
  scroll-behavior: smooth;
  white-space: normal;
  color: #000;

  &:first-child {
    padding-left: 1rem;
  }
  &:last-child {
    padding-right: 1rem;
  }

  &:hover {
    background-color: #fff;
    color: #000;
  }

  @media only screen and (max-width: 770px) {
    width: 100%; // 50%;
    margin: 0 auto;
  }
`;

export const CheckMark = styled.div<{ selected: boolean }>`
  align-items: center;
  box-sizing: border-box;
  border: ${({ selected }) => selected ? '4px solid #4C33FF' : '4px solid transparent'};
  margin: 0 0.5rem;
  padding: 0 0.75rem 1rem 0.75rem;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    border: ${({ selected }) => selected ? '4px solid #4C33FF' : '4px solid rgba(76, 51, 255, 0.35)'};
    
    &:before {
      content: '\\2713';
      color: #fff;
      width: 15%;
      height: 15%;
      position: absolute;
      right: 0;
      top: 0;
      background-color: rgba(76, 51, 255, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ${({ selected }) => (
    selected && `
    &:before {
      content: '\\2713';
      color: #fff;
      width: 15%;
      height: 15%;
      position: absolute;
      right: 0;
      top: 0;
      background-color: #4C33FF;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover::before  {
      // background-color: rgba(76, 51, 255, 0.35)!important;
    }
    `
  )}
  
  @media only screen and (max-width: 770px) {
    display: inline-block;
    padding: 0 0.75rem 0.5rem 0.75rem;
  }
`;

export const ItemSpanTitle = styled.h5`
  @media only screen and (max-width: 770px) {
    clear: both;
    display: inline-block;
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export const ItemImg = styled.img<{ single?: boolean; }>`
  max-width: 90%;
  // margin: 0.75rem 0.75rem 0.75rem 0;
  margin: 0.75rem auto;

  @media only screen and (max-width: 770px) {
    margin: 0 auto;
    width: ${({ single }) => (single ? '30%' : '40%')};
    float: ${({ single }) => (single ? 'none' : 'left')};
  }
`;

export const ItemSpanDesc = styled.span`
  text-align: left;
  padding-left: 0.5rem;

  @media only screen and (max-width: 770px) {
    width: 55%;
    float: right;
    font-size: .75rem;
  }
`;

export const ItemColor = styled.div<{ color: string }>`
  background-color: ${({ color }) => `#${color}`};
  width: 50%;
  padding-top: 40%;
  margin: 20% 0.75rem 0.75rem 0;
  box-sizing: border-box;

  @media only screen and (max-width: 770px) {
    margin: 10% auto 0 auto;
    width: 40%;
    padding-top: 40%;
  }
`;

export const CarouselNav = styled.div`
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  height: 1px;
`;

export const CarouselNavBtn = styled.button<{ left?: boolean }>`
  pointer-events: all;
  border: 0;
  background: rgba(4, 4, 4, 0.25);
  color: #fff;
  outline: none;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  
  &:hover {
    background: rgba(4, 4, 4, 0.85);
  }
  ${({ left }) => left ? 'left: 0.5rem;' : 'right: 0.5rem;'}
`;

export const ContainerForSecond = styled.div<{ show?: boolean; second?: boolean; moreHeight?: boolean; }>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  height: 88%;
  position: relative;
  ${({ second }) => second && 'overflow-y: auto; flex-direction: column;'}

  @media only screen and (max-width: 770px) {
    height: ${({ moreHeight }) => (moreHeight ? '100%' : 'auto')};
  }
`;

export const CarouselWrapper = styled.div<{ second?: boolean; show?: boolean; moreHeight?: boolean; }>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  height: 88%;
  position: relative;
  // ${({ second }) => (second && 'margin-top: 0.5rem;')}

  @media only screen and (max-width: 770px) {
    height: ${({ moreHeight }) => (moreHeight ? '100%' : 'auto')};
    margin-top: 0;
  }
`;

export const ItemContent = styled.div<{ horizontal?: boolean; show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  // flex-flow: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  // margin-top: 1rem;
  // ${({ horizontal }) => horizontal ? 'height: calc(100% - 45px);' : ''}
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
`;

export const Button = styled.button<{ horizontal?: boolean; show: boolean }>`
  background-color: ${({ show }) => show ? 'rgba(33, 28, 23, .65)' : '#fff'};
  border: 0 none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  color: ${({ show }) => show ? '#fff' : '#35342D'};
  width: 100%;
  text-align: center;
  outline: none;
  position: static; // sticky;
  ${({ horizontal }) => (horizontal ? 'left' : 'top')}: -1px;
  font-family: "Josefin Sans", Sans-serif;
  font-size: 1.15rem;
  text-transform: uppercase;
  transition: all .3s;
  padding: 1.5rem;
  margin: 0;

  &:hover {
    background-color: rgba(33, 28, 23, .65);
    color: #fff;
  }

  @media only screen and (max-width: 770px) {
    padding: .75rem 0;
    font-size: 1rem;
  }
`;
