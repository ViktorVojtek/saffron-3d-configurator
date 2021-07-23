import styled from 'styled-components';

type Props = {
  color?: 'black' | 'white' | 'red';
}

const Text = styled.p<Props>`
  color: ${({ color }) => (color || '#000')};
  margin-top: 0;
`;

export default Text;
