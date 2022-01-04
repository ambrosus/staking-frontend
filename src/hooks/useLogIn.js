// TODO add WalletConnectConnector
// /*eslint-disable*/
// import { useHistory } from 'react-router';
//
// import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
// import {
//   NoEthereumProviderError,
//   UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from '@web3-react/injected-connector';
// import {
//   UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
//   WalletConnectConnector,
// } from '@web3-react/walletconnect-connector';
// import { ethereum, STAKING_PAGE } from '../config';
// import useMobileDetect from './useMobileDetect';
// import { debugLog } from '../utils/helpers';
// import appStore from 'store/app.store';
//
// const useLogIn = () => {
//   const history = useHistory();
//   const context = useWeb3React();
//   const { activate, error, connector } = context;
//   const { isDesktop } = useMobileDetect();
//   function getErrorMessage(err) {
//     let message;
//     if (err instanceof NoEthereumProviderError) {
//       message =
//         'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
//     }
//     if (err instanceof UnsupportedChainIdError) {
//       message = "You're connected to an unsupported network.";
//     }
//     if (
//       err instanceof UserRejectedRequestErrorInjected ||
//       err instanceof UserRejectedRequestErrorWalletConnect
//     ) {
//       message =
//         'Please authorize this website to access your Ethereum account.';
//     } else {
//       message =
//         'An unknown error occurred. Check the console for more details.';
//     }
//     return message;
//   }
//
//   const logIn = async (appConnector) => {
//     debugLog('logIn');
//     await activate(appConnector).then(() => {
//       setTimeout(() => {
//         if (isDesktop) {
//           if (connector !== undefined) {
//             if (connector instanceof WalletConnectConnector) {
//               console.log(
//                 'connector instanceof WalletConnectConnector',
//                 connector,
//               );
//               appStore.setSigner(connector.walletConnectProvider);
//             } else {
//               appStore.setSigner(window.ethereum);
//             }
//             if (connector === appConnector) {
//               history.push(STAKING_PAGE);
//             }
//           }
//         } else {
//           window.location.replace(
//             'https://metamask.app.link/dapp/pr-43.d2nndxolfp1vk8.amplifyapp.com/staking',
//           );
//         }
//       }, 1000);
//     });
//
//     if (error) {
//       alert(getErrorMessage(error));
//     }
//     return false;
//   };
//
//   return { logIn };
// };
//
// export default useLogIn;
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';

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
        'https://metamask.app.link/dapp/pr-47.d2nndxolfp1vk8.amplifyapp.com/staking',
      );
    }
    return false;
  };
  return { logIn };
};

export default useLogIn;
