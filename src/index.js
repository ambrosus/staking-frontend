import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable-next-line */
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './Main';

ReactDOM.render(
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>,
  document.getElementById('root'),
);

reportWebVitals();
