import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { connectorsByName, ethereum, STAKING_PAGE } from '../config';

const useLogIn = (connect) => {
  const history = useHistory();
  const { activate, active } = useWeb3React();

  const logIn = async () => {
    if (connect === 'CONNECT_WALLET') {
      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      await activate(connectorsByName.Injected);
    }
    if (active) {
      history.push(STAKING_PAGE);
    }
    if (!ethereum?.isMetaMask) {
      return alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    return false;
  };

  return { logIn };
};

export default useLogIn;
