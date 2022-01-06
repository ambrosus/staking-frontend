import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import appStore from '../store/app.store';
import { injected, walletconnect } from '../config';
import useMobileDetect from './useMobileDetect';
import { debugLog } from '../utils/helpers';

const useLogIn = () => {
  const history = useHistory();
  const [isConnected, setIsConnected] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { activate, error, connector } = useWeb3React();
  const { isDesktop } = useMobileDetect();

  function getErrorMessage(err) {
    let message;
    if (err instanceof NoEthereumProviderError) {
      message =
        'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    }
    if (err instanceof UnsupportedChainIdError) {
      message = "You're connected to an unsupported network.";
    }
    if (
      err instanceof UserRejectedRequestErrorInjected ||
      err instanceof UserRejectedRequestErrorWalletConnect
    ) {
      message =
        'Please authorize this website to access your Ethereum account.';
    } else {
      message =
        'An unknown error occurred. Check the console for more details.';
    }
    return message;
  }

  const logIn = async (appConnector) => {
    debugLog('logIn');
    if (!isDesktop && appConnector instanceof WalletConnectConnector) {
      /* TODO WalletConnect from mobile */
    } else {
      window.location.replace(
        'https://metamask.app.link/dapp/pr-49.d2nndxolfp1vk8.amplifyapp.com/staking',
      );
    }
    await activate(appConnector).catch((e) => {
      console.log(e);
    });
    await appConnector.activate();
    setRefresh(!refresh);
    if (error) {
      alert(getErrorMessage(error));
    }
    return false;
  };

  useEffect(() => {
    if (refresh) {
      if (isDesktop) {
        if (connector !== undefined) {
          if (connector instanceof WalletConnectConnector) {
            walletconnect.activate();
            appStore.setSigner(connector.walletConnectProvider);
            localStorage.setItem('connector', 'walletconnect');
            setIsConnected(true);
          } else {
            injected.activate();
            appStore.setSigner(window.ethereum);
            localStorage.setItem('connector', 'injected');
            setIsConnected(true);
          }
        }
      }
    }
    if (!isConnected) {
      return;
    }
    if (isConnected) {
      history.push('/staking');
    }
  }, [refresh, isConnected]);

  return { logIn };
};

export default useLogIn;
