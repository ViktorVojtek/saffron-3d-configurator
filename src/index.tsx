import * as React from 'react';
import { render } from 'preact'; // 'react-dom';
import App from './App';
import { StoreProvider } from './utils/store';
import { containerId } from './utils/constants';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById(containerId)
);
