import styled from 'styled-components';

export const AppWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const CanvasWrapper = styled.div`
  width: 59.89%;
  float: right;

  @media only screen and (max-width: 580px) {
    margin-top: 40%;
    width: 100%;
    float: none;
  }
`;

export const OrderBtn = styled.button`
  padding: 0.75rem 1rem;
  background-color: #000;
  border: 0 none;
  border-radius: 0.25rem;
  color: #fff;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  outline: none;
`;

export const EditBtn = styled.button`
  padding: 0.75rem 1rem;
  background-color: #000;
  border: 0 none;
  border-radius: 0.25rem;
  color: #fff;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  outline: none;
`;
