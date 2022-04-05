import { toast } from 'react-toastify';
import { utils, providers } from 'ethers';
import {
  bounce,
  ENABLE_DEBUG_LOG,
  ethereum,
  network,
  SupportedChainId,
} from 'config';

import avatarIcon from 'assets/svg/avatar.svg';
import avatarIcon2 from 'assets/svg/avatar2.svg';

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

export const poolIcon = (index) => {
  switch (index) {
    case index % 2:
      return avatarIcon2;
    case index:
      return avatarIcon;
    default:
      return avatarIcon;
  }
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
export const formatThousandNoLocale = (num) => {
  // eslint-disable-next-line no-param-reassign
  num = Number(num);
  if (Math.abs(num) >= 1e9) {
    return `${Math.abs(num / 1e9).toFixed(0)}B`;
  }
  if (Math.abs(num) >= 1e6) {
    return `${Math.abs(num / 1e6).toFixed(0)}M`;
  }
  if (Math.abs(num) > 1e3) {
    return `${Math.abs(num / 1e3).toFixed(0)}K`;
  }
  return num.toFixed(2);
};
/* eslint-disable-next-line no-console */
export const debugLog = (...logs) => ENABLE_DEBUG_LOG && console.log(...logs);

export const changeNetwork = async () => {
  if (ethereum) {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `${utils.hexlify(+process.env.REACT_APP_CHAIN_ID)}`,
          chainName: `${
            network ? 'Ambrosus (Main net)' : 'Ambrosus (Test net)'
          }`,
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
  } else {
    window.location.href =
      'https://metamask.app.link/dapp/pr-93.dm4e4sbc9589h.amplifyapp.com/stakin';
  }
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (timestamp, showDate = false, showTime = false) => {
  const date = new Date(timestamp);
  const dayName = days[date.getDay()];
  const day = `0${date.getDate()}`.slice(-2);
  const month = date.getMonth();
  // const year = date.getFullYear();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  if (showTime) {
    return `${
      showDate ? `${dayName}, ${day} ${months[month]}` : ''
    }${hours}:${minutes}:${seconds}`;
  }
  return `${showDate ? `${day} ${months[month]}` : ''}`;
};
