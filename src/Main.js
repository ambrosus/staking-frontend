import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import RenderRoutes from './components/RenderRoutes';
import { getLibrary } from './utils/helpers';
import { ethereum, NetworkContextName } from './config';
import './styles/Main.scss';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Main = () => {
  const handleChainChanged = () => window.location.reload();
  const handleAccountsChanged = () => window.location.reload();
  const handleNetworkChanged = () => window.location.reload();

  useEffect(() => {
    if (ethereum) {
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);
    }
    return () => {
      if (ethereum && ethereum.removeListener) {
        ethereum.removeListener('chainChanged', handleChainChanged);
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('networkChanged', handleNetworkChanged);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <RenderRoutes />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </BrowserRouter>
  );
};

export default Main;
