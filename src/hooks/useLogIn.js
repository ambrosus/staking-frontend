import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { injected, MAIN_PAGE, walletconnect } from 'config';
import useMobileDetect from './useMobileDetect';
import { debugLog } from 'utils/helpers';

const useLogIn = () => {
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const { activate, active, connector, deactivate } = useWeb3React();
  const { isDesktop } = useMobileDetect();

  const logIn = async (appConnector) => {
    debugLog('logIn');
    try {
      /*eslint-disable*/
      if (!isDesktop) {
        if (appConnector instanceof WalletConnectConnector) {
          await appConnector.activate();
          setTimeout(() => {
            if (connector instanceof WalletConnectConnector) {
              history.push('/staking');
            }
          }, 1000);
          return;
        } else {
          window.location.replace(
            'https://metamask.app.link/dapp/pr-49.d2nndxolfp1vk8.amplifyapp.com/staking',
          );
        }
      }
      await activate(appConnector);
      setRefresh(!refresh);
    } catch (e) {
      if (e) {
        await walletconnect.close();
        walletconnect.walletConnectProvider = null;
        deactivate();
        localStorage.removeItem('connector');
        window.location.reload();
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
    if (refresh) {
      if (isDesktop) {
        if (connector !== undefined) {
          if (connector instanceof WalletConnectConnector) {
            walletconnect.activate();
            localStorage.setItem('connector', 'walletconnect');
            if (active) history.push('/staking');
          } else {
            injected.activate();
            localStorage.setItem('connector', 'injected');
            if (active) history.push('/staking');
          }
        }
      }
    }
  }, [refresh, active]);

  return { logIn, logOut };
};

export default useLogIn;
