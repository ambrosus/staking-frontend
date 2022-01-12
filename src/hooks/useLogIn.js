import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { injected, MAIN_PAGE, STAKING_PAGE, walletconnect } from 'config';
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
    try {
      localStorage.removeItem('connector');
      localStorage.removeItem('walletconnect');
      /*eslint-disable*/
      if (!isDesktop) {
        console.log('jsafbsaljkfnaslnfosa');
        if (appConnector instanceof WalletConnectConnector) {
          history.push(STAKING_PAGE);
          appStore.setRefresh();
          localStorage.setItem('connector', 'walletconnect');
          return;
        } else {
          localStorage.setItem('connector', 'injected');
          if (window.location.pathname === '/') {
            console.log('deep LINK');
            window.location.replace(
              'https://metamask.app.link/dapp/dev.d2nndxolfp1vk8.amplifyapp.com/staking',
            );
          }
          appStore.setRefresh();
        }
      } else {
        await activate(appConnector);
      }
      setRefresh(!refresh);
    } catch (e) {
      if (e) {
        // await walletconnect.close();
        // await injected.deactivate();
        // localStorage.removeItem('connector');
      }
    }

    return false;
  };
  const logOut = async () => {
    localStorage.removeItem('connector');
    localStorage.removeItem('walletconnect');
    if (localStorage.getItem('connector') === 'walletconnect') {
      await walletconnect.close();
      walletconnect.walletConnectProvider = null;
    } else {
      deactivate();
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
            history.push(STAKING_PAGE);
            appStore.setRefresh();
          } else {
            injected.activate().then(() => {
              if (connector) {
                history.push(STAKING_PAGE);
                appStore.setRefresh();
              }
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
