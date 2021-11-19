import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { ethereum, STAKING_PAGE } from '../utils/constants';
import { connectorsByName } from '../utils/connectors';

const useLogIn = () => {
  const history = useHistory();
  const { activate, active } = useWeb3React();
  const logIn = async () => {
    if (!active) {
      await activate(connectorsByName.Injected);
    } else {
      history.push(STAKING_PAGE);
    }
    if (!ethereum && !ethereum.isMetaMask) {
      alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
  };
  return { logIn };
};

export default useLogIn;
