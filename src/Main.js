/*eslint-disable*/
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import RenderRoutes from './components/RenderRoutes';
import { getLibrary } from './utils/helpers';
import { ethereum } from './config';
import './styles/Main.scss';

const Main = () => {
  const handleChainChanged = () => window.location.reload();
  const handleAccountsChanged = () => window.location.reload();
  const handleNetworkChanged = () => window.location.reload();

  useEffect(() => {
    if (ethereum) {
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);
    } else {
      // todo: handle error
    }
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', handleChainChanged);
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('networkChanged', handleNetworkChanged);
      } else {
        // todo: handle error
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RenderRoutes />
      </Web3ReactProvider>
    </BrowserRouter>
  );
};

export default Main;
