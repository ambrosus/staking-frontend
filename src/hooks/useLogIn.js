import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { connectorsByName, ethereum, STAKING_PAGE } from '../config';

const useLogIn = () => {
  const history = useHistory();
  const { activate } = useWeb3React();

  const logIn = async () => {
    if (ethereum.isMetaMask === undefined) {
      return alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    await activate(connectorsByName.Injected);
    return history.push(STAKING_PAGE);
  };

  return { logIn };
};

export default useLogIn;
