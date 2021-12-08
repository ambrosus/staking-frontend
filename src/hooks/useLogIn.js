import { useHistory } from 'react-router';
/*eslint-disable*/
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { connectorsByName, ethereum, STAKING_PAGE } from '../config';
import { useMedia } from '../hooks/index';

const useLogIn = () => {
  const history = useHistory();
  const { activate } = useWeb3React();
  const isSmall = useMedia('(max-width: 699px)');

  const logIn = async () => {
    await activate(connectorsByName.Injected);
    if (isSmall) {
      window.location.replace(
        'https://metamask.app.link/dapp/dev.d2nndxolfp1vk8.amplifyapp.com/',
      );
    } else {
      if (!ethereum && !ethereum?.isMetaMask) {
        return alertStore.addNotification({
          content: InstallMetamaskAlert,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
    }
    history.push(STAKING_PAGE);
    return false;
  };
  return { logIn };
};

export default useLogIn;
