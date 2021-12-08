import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { connectorsByName, ethereum, STAKING_PAGE } from '../config';
import useMobileDetect from './useMobileDetect';
import { debugLog } from '../utils/helpers';

const useLogIn = () => {
  const history = useHistory();
  const { activate } = useWeb3React();
  const { isMobile } = useMobileDetect();

  const logIn = async () => {
    debugLog('logIn');
    await activate(connectorsByName.Injected);
    if (isMobile()) {
      return window.location.replace(
        'https://metamask.app.link/dapp/dev.d2nndxolfp1vk8.amplifyapp.com/staking',
      );
    }
    if (!isMobile() && !ethereum?.isMetaMask) {
      return alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    history.push(STAKING_PAGE);
    return false;
  };
  return { logIn };
};

export default useLogIn;
