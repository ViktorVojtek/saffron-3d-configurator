import styled from 'styled-components';

interface IBtnWrapperProps {
  left?: boolean;
  width?: number;
}
export const BtnWrapper = styled.button<IBtnWrapperProps>`
  border: 3px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  width: ${({ width }) => width ? `${Math.round(width * 0.05)}px` : '3vw'};
  height: ${({ width }) => width ? `${Math.round(width * 0.05)}px` : '3vw'};
  min-width: 40px;
  min-height: 40px;
  color: #fff;
  ${({ left }) => (left ? 'left: 10px;' : 'right: 10px;')}
  top: 45%;
  outline: none;
`;