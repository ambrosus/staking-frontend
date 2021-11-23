import React from 'react';
import { observer } from 'mobx-react-lite';
import { Web3Provider } from '@ethersproject/providers';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import RenderRoutes from './components/RenderRoutes';
import './styles/Main.scss';

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};
const Main = observer(() => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <RenderRoutes />
    </BrowserRouter>
  </Web3ReactProvider>
));

export default Main;
