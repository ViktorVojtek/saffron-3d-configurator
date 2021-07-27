import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  #canvas {
    font-family: Sans-Serif;

    width: 100%;
    height: 100%;

    @media screen and (max-width: 768px) {
      width: auto;
      height: auto;
    }
  }
`;

export default GlobalStyle;
