import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import ReactNotifications from 'react-notifications-component';
import RenderRoutes from './components/RenderRoutes';
import { getLibrary } from './utils/helpers';
import { ethereum } from './config';
import './styles/Main.scss';
import appStore from 'store/app.store';

const Main = () => {
  const handleChainChanged = () => appStore.setRefresh();

  const handleAccountsChanged = () => appStore.setRefresh();

  const handleNetworkChanged = () => appStore.setRefresh();

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
        <ReactNotifications />
        <RenderRoutes />
      </Web3ReactProvider>
    </BrowserRouter>
  );
};

export default Main;
