import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './Main';
import { PrismicProvider } from '@prismicio/react'
import { client } from 'prismic'

ReactDOM.render(
    <PrismicProvider client={client}>
    <ErrorBoundary>
    <Main />
  </ErrorBoundary>
    </PrismicProvider>
    ,
  document.getElementById('root'),
);

reportWebVitals();
