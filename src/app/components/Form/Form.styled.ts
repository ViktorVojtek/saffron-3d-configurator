import styled from 'styled-components'

type Props = {
  error?: boolean;
}

export const StyledButtonWrapper = styled.div`
  margin: .5rem 0;
`;

export const StyledContainer = styled.div<Props>`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: row;
  border: ${({ error }) => (`1px solid ${error ? 'red' : 'rgb(59, 59, 59)'}`)};
  border-radius: 0.375rem;
  display: flex;
  margin-bottom: .5rem;
  overflow: hidden;
`;
