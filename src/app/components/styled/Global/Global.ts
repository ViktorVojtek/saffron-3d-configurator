import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  #canvas {
    font-family: Sans-Serif;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;
    overflow-y: auto;
  }
`;

export default GlobalStyle;
