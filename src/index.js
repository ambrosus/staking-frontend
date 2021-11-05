import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root'),
);

reportWebVitals();
