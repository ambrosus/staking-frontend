import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import RenderRoutes from './components/RenderRoutes';
import './styles/Main.scss';
import getLibrary from './utils/helpers';
import { NetworkContextName } from './config';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Main = observer(() => (
  <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <RenderRoutes />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </BrowserRouter>
));

export default Main;
