import styled from 'styled-components';

type Props = {
  textAlign?: 'left' | 'right'| 'center';
  color?: 'black' | 'white' | 'red';
  inline?: boolean;
}

const Text = styled.p<Props>`
  color: ${({ color }) => (color || '#000')};
  margin-top: 0;
  text-align: ${({ textAlign }) => (textAlign || 'left')};
  white-space: ${({ inline }) => (inline ? 'nowrap' : 'unset')};
`;

export default Text;
