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
    localStorage.removeItem('connector');
    localStorage.removeItem('walletconnect');
    try {
      if (!isDesktop) {
        if (appConnector instanceof WalletConnectConnector) {
          history.push(STAKING_PAGE);
          appStore.setRefresh();
          localStorage.setItem('connector', 'walletconnect');
          return;
          /* eslint-disable-next-line */
        } else {
          localStorage.setItem('connector', 'injected');
          if (window.location.pathname === '/') {
            window.location.href =
              'https://metamask.app.link/dapp/staking.ambrosus.io/staking';
          }
          appStore.setRefresh();
        }
      } else {
        await activate(appConnector);
      }
      setRefresh(!refresh);
    } catch (e) {
      if (e) {
        await walletconnect.close();
        await injected.deactivate();
        localStorage.removeItem('connector');
        history.push(MAIN_PAGE);
      }
    }
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
    window.location.replace(MAIN_PAGE);
  };

  useEffect(() => {
    if (!refresh) {
      return;
    }
    if (refresh) {
      if (isDesktop) {
        if (connector !== undefined) {
          if (connector instanceof WalletConnectConnector) {
            try {
              walletconnect.activate();
              localStorage.setItem('connector', 'walletconnect');
              history.push(STAKING_PAGE);
              appStore.setRefresh();
            } catch (e) {
              if (e) {
                history.push(MAIN_PAGE);
                localStorage.removeItem('connector');
              }
            }
          } else {
            try {
              injected.activate();
            } catch (e) {
              if (e) {
                history.push(MAIN_PAGE);
                localStorage.removeItem('connector');
              }
            }
            localStorage.setItem('connector', 'injected');
            history.push(STAKING_PAGE);
            appStore.setRefresh();
          }
        }
      }
    }
  }, [refresh]);

  return { logIn, logOut };
};

export default useLogIn;
