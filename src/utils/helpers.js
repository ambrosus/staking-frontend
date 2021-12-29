import { toast } from 'react-toastify';
import { utils, providers } from 'ethers';
import {
  bounce,
  ENABLE_DEBUG_LOG,
  ethereum,
  network,
  SupportedChainId,
} from '../config';

import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

const NETWORK_POLLING_INTERVALS = {
  [SupportedChainId.MAINNET]: 1000,
  [SupportedChainId.ROPSTEN]: 1000,
  [SupportedChainId.RINKEBY]: 1000,
  [SupportedChainId.GOERLI]: 1000,
  [SupportedChainId.KOVAN]: 1000,
  [SupportedChainId.AMBROSUS]: 1000,
};

export const getLibrary = (provider = undefined) => {
  const library = new providers.Web3Provider(
    provider,
    /* eslint-disable-next-line no-nested-ternary */
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? Number(provider.chainId)
      : 'any',
  );
  library.pollingInterval = 15000;
  library.detectNetwork().then((net) => {
    const networkPollingInterval = NETWORK_POLLING_INTERVALS[net.chainId];
    if (networkPollingInterval) {
      library.pollingInterval = networkPollingInterval;
    }
  });
  return library;
};

export const notificationMassage = (type, alertText) => {
  if (type === 'SUCCESS') {
    toast.success(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else if (type === 'PENDING') {
    toast.info(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else {
    toast.error(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  }
};

export const formatThousand = (num) => {
  // eslint-disable-next-line no-param-reassign
  num = Number(num);
  if (Math.abs(num) >= 1e9) {
    return `${Math.abs(num / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(num) >= 1e6) {
    return `${Math.abs(num / 1e6).toFixed(2)}M`;
  }
  if (Math.abs(num) > 1e3) {
    return `${Math.abs(num / 1e3).toFixed(2)}K`;
  }
  return num.toFixed(2);
};

/* eslint-disable-next-line no-console */
export const debugLog = (...logs) => ENABLE_DEBUG_LOG && console.log(...logs);

export const changeNetwork = async () => {
  await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `${utils.hexlify(+process.env.REACT_APP_CHAIN_ID)}`,
        chainName: `${network ? 'Ambrosus (Test net)' : 'Ambrosus (Main net)'}`,
        nativeCurrency: {
          name: 'AMB',
          symbol: 'AMB',
          decimals: 18,
        },
        rpcUrls: [`${process.env.REACT_APP_RPC_URL}`],
        blockExplorerUrls: [`${process.env.REACT_APP_BLOCK_EXPLORER_URL}`],
      },
    ],
  });
};
