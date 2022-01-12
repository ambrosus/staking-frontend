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
          localStorage.setItem('connector', 'walletconnect');
          await appConnector.activate();
          setTimeout(() => {
            if (connector instanceof WalletConnectConnector) {
              history.push('/staking');
            }
          }, 1000);
          appStore.setRefresh();
          return;
        } else {
          localStorage.setItem('connector', 'injected');
          window.location.replace(
            'https://metamask.app.link/dapp/pr-49.d2nndxolfp1vk8.amplifyapp.com/staking',
          );
        }
      }
      await activate(appConnector);
      setRefresh(!refresh);
    } catch (e) {
      if (e) {
        // await walletconnect.close();
        // walletconnect.walletConnectProvider = null;
        // localStorage.removeItem('connector');
      }
    }

    return false;
  };
  const logOut = async () => {
    deactivate();
    localStorage.removeItem('connector');
    if (window.localStorage.getItem('connector') === 'walletconnect') {
      await walletconnect.close();
      walletconnect.walletConnectProvider = null;
    }
    history.push(MAIN_PAGE);
  };

  useEffect(() => {
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
              setTimeout(() => {
                if (connector) {
                  history.push('/staking');
                  appStore.setRefresh();
                }
              }, 1000);
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
