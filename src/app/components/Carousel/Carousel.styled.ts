import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;
  height: calc(100% - 56px);
`;

export const StyledControllWrapper = styled.div`
  position: absolute;
  top: 50%;
  transforma: translateY(-50%);
  width: 100%;
`;

export const StyledControllButton = styled.button<{ left?: boolean }>`
  border-radius: 999px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  ${({ left }) => left ? 'left: 10px;' : 'right: 10px;'}
  width: 30px;
  height: 30px;
`;

export const StyledContainer = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  width: 100%;
`;

export const StyledItemWrapper = styled.div`
  flex: 0 0 100%;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledItem = styled.div<{ selected: boolean }>`
  border: 4px solid transparent;
  box-sizing: content-box;
  height: 70%;
  margin: 10%;
  flex: 0 0 80%;
  transition: all 0.3s ease 0s;
  scroll-snap-align: center;
  scroll-behavior: smooth;
  position: relative;

  &:hover {
    border-color: rgba(33, 28, 23, 0.35);

    &:before {
      background-color: rgba(33, 28, 23, 0.35);
      color: rgba(33, 28, 23, 0.65);
    }
  }
  ${({ selected }) => selected && (`
    border-color: rgba(33, 28, 23, 0.65);

    &:before {
      content: '\\2713';
      color: #fff;
      display: flex;
      align-items: center;
      background-color: rgba(33, 28, 23, 0.65);
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
    }
  `)}
`;

export const StyledImage = styled.img`
  display: block;
  margin: 10% auto 0 auto;
  max-width: 80%;
  max-height: 80%;

  @media screen and (max-width: 768px) {
    max-width: 50%;
    max-height: 50%;
  }
`;

export const StyledH3 = styled.h3`
  text-align: center;
`;

export const StyledP = styled.p`
  text-align: justify;
  padding: 1rem;
`;
