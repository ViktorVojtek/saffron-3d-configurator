import styled from 'styled-components';

type Props = {
  error?: boolean;
}

export const StyledWrapper = styled.div`
  margin-bottom: 1rem;
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

export const StyledInput = styled.input`
  border: 0 none;
  flex: 1;
  padding: 0.75rem 0.5rem;
  outline: none;
`;

export const StyledTextarea = styled.textarea`
  border: 0 none;
  flex: 1;
  padding: 0.75rem 0.5rem;
  outline: none;
`;
