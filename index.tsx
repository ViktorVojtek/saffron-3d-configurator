import ReactDOM from 'react-dom';
import React from 'react';
import App from './src/app/Application';

ReactDOM.render(<App />, document.querySelector('#app-container'));

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
