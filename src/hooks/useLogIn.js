/*eslint-disable*/
import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';

import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import { ethereum } from '../utils/constants';
import { connectorsByName } from '../utils/connectors';

const useLogIn = () => {
  const history = useHistory();
  const { activate, active, connector } = useWeb3React();

  const logIn = async () => {
    if (ethereum && ethereum.isMetaMask) {
      return await ethereum
        .request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(async (e) => {
          if (e) {
            await activate(!active && connectorsByName['Injected']);
            history.push('/staking');
          }
        })
        .catch((e) => {
          if (e) {
            history.push('/');
          }
        });
    } else {
      alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    console.log(active);
  };
  return { logIn };
};

export default useLogIn;
