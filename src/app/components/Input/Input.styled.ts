import styled from 'styled-components';

type Props = {
  error?: boolean;
  transparent?: boolean;
}

export const StyledWrapper = styled.div``;

export const StyledContainer = styled.div<Props>`
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  border-radius: 0.375rem;
  background-color: ${({ transparent }) => transparent ? 'transparent' : 'grey'};
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 0.75rem 0.5rem;
`;

export const StyledTextarea = styled.textarea`
  flex: 1;
  padding: 0.75rem 0.5rem;
`;
