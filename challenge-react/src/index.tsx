import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Reset } from 'styled-reset';
import App from './App';
import store from './store';

render(
  <Provider store={store}>
    <Reset />
    <App />
  </Provider>,
  document.getElementById('root')
);
