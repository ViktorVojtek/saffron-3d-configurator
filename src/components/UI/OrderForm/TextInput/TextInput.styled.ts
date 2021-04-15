import styled from 'styled-components';
type Props = {
  valid?: boolean;
};

export const ErrorIconWrapper = styled.div`
  align-items: center;
  border: 1px solid #FF0000;
  color: #FF0000;
  display: flex;
  font-size: small;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const ErrorText = styled.p`
  color: #FF0000;
`;

export const TextWrapper = styled.p<Props>`
  align-items: center;
  border: 1px solid ${({ valid }) => (valid ? '#000' : '#FF0000')};
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  padding: 0 .25rem;
`;

export const Input = styled.input<Props>`
  border: 0;
  flex: .9;
  padding: 0.75rem 0.5rem;
  outline: none;

  &::placeholder {
    color: ${({ valid }) => (valid ? 'rgb(118, 118, 118)' : '#FF0000')}
  }
`;
