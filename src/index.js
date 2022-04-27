import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './Main';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-WSD9HSM',
};

TagManager.initialize(tagManagerArgs);
ReactDOM.render(
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>,
  document.getElementById('root'),
);

reportWebVitals();
