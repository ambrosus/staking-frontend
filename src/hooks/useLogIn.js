import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { injected, MAIN_PAGE, walletconnect } from 'config';
import useMobileDetect from './useMobileDetect';
import { debugLog } from 'utils/helpers';
import appStore from 'store/app.store';

const useLogIn = () => {
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const { activate, connector, deactivate } = useWeb3React();
  const { isDesktop } = useMobileDetect();

  const logIn = async (appConnector) => {
    debugLog('logIn');
    await walletconnect.close();
    walletconnect.walletConnectProvider = null;
    try {
      /*eslint-disable*/
      if (!isDesktop) {
        if (appConnector instanceof WalletConnectConnector) {
          await appConnector.activate();
          window.location.replace('/staking');
          localStorage.setItem('connector', 'walletconnect');
          return;
        } else {
          window.location.replace(
            'https://metamask.app.link/dapp/pr-53.d2nndxolfp1vk8.amplifyapp.com/staking',
          );
          localStorage.setItem('connector', 'injected');
        }
      }
      setRefresh(!refresh);
    } catch (e) {
      if (e) {
        await walletconnect.close();
        walletconnect.walletConnectProvider = null;
        localStorage.removeItem('connector');
        history.push(MAIN_PAGE);
      }
    }

    return false;
  };
  const logOut = async () => {
    deactivate();
    localStorage.removeItem('connector');
    if (window.localStorage.getItem('walletconnect')) {
      await walletconnect.close();
      walletconnect.walletConnectProvider = null;
    }
    history.push(MAIN_PAGE);
  };

  useEffect(() => {
    if (!refresh) {
      return;
    }
    console.log('useEffect use login');
    if (refresh) {
      if (isDesktop) {
        if (connector !== undefined) {
          if (connector instanceof WalletConnectConnector) {
            walletconnect.activate();
            localStorage.setItem('connector', 'walletconnect');
            window.location.replace('/staking');
            appStore.setRefresh();
          } else {
            injected.activate().then(() => {
              history.push('/staking');
              appStore.setRefresh();
            });
            appStore.setRefresh();
            localStorage.setItem('connector', 'injected');
          }
        }
      }
    }
  }, [refresh]);

  return { logIn, logOut };
};

export default useLogIn;
