import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import appStore from '../store/app.store';
import { connectorsByName, STAKING_PAGE } from '../config';
import useMobileDetect from './useMobileDetect';
import { debugLog } from '../utils/helpers';

const useLogIn = () => {
  const history = useHistory();
  const { activate } = useWeb3React();
  const { isDesktop } = useMobileDetect();

  const logIn = async () => {
    debugLog('logIn');
    await activate(connectorsByName.Injected);
    if (isDesktop) {
      history.push(STAKING_PAGE);
    } else {
      window.location.replace(
        'https://metamask.app.link/dapp/staking.ambrosus.io/staking',
      );
    }
    appStore.setRefresh();
    return false;
  };
  return { logIn };
};

export default useLogIn;
