import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { providers } from 'ethers';

import storageService from '../services/storage.service';
import appStore from '../store/app.store';
import InstallMetamaskAlert from '../pages/Home/components/InstallMetamaskAlert';
import FromPhoneDeviseEnter from '../pages/Home/components/FromPhoneDeviseEnter';
import { ethereum } from './constants';

const useLogIn = () => {
  const history = useHistory();

  const logIn = async () => {
    if (ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
    }

    async function handleEthereum() {
      if (ethereum && ethereum.isMetaMask) {
        await ethereum
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
              history.push('/staking');
              storageService.set('auth', true);
              appStore.setAuth(true);
              const provider = new providers.Web3Provider(ethereum);
              provider.on('network', (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                  window.location.reload();
                }
              });

              provider
                .listAccounts()
                .then((accounts) => {
                  const defaultAccount = accounts[0];
                  if (defaultAccount) {
                    appStore.setAuth(true);
                  } else {
                    storageService.set('auth', false);
                  }
                })
                .catch((error) => {
                  if (error) {
                    storageService.set('auth', false);
                  }
                });
            }
          })
          .catch((e) => {
            if (e) {
              storageService.set('auth', false);
              appStore.setAuth(false);
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
      if (
        navigator.userAgent.includes('iPhone') ||
        navigator.userAgent.includes('Android')
      ) {
        alertStore.addNotification({
          content: FromPhoneDeviseEnter,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
    }
  };
  return { logIn };
};

export default useLogIn;
