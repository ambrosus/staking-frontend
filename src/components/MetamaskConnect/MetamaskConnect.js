import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';
import { ethers } from 'ethers';

import P from '../P';
import storageService from '../../services/storage.service';
import { CONNECT_TEXT } from '../../utils/constants';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert/InstallMetamaskAlert';
import appStore from '../../store/app.store';

import walletIcon from '../../assets/svg/wallet.svg';
import FromPhoneDeviseEnter from '../../pages/Home/components/FromPhoneDeviseEnter';

export const MetamaskConnect = observer(() => {
  const [auth, setAuth] = useState(false);
  const [account, setAccount] = useState(null);
  const history = useHistory();
  const { ethereum } = window;

  useEffect(() => {
    if (storageService.get('auth') === true) {
      history.push('/stacking');
    }
  }, [sessionStorage, account, auth, appStore.auth]);
  const logIn = async () => {
    if (ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 0);
    }

    async function handleEthereum() {
      if (ethereum && ethereum.isMetaMask) {
        await ethereum.enable();
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
              history.push('/stacking');
              storageService.set('auth', true);
              appStore.setAuth(true);
              const provider = new ethers.providers.Web3Provider(ethereum);
              try {
                await ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      chainId: `${ethers.utils.hexlify(
                        +process.env.REACT_APP_CHAIN_ID,
                      )}`,
                    },
                  ],
                });
              } catch (switchError) {
                if (switchError.code === 4902) {
                  try {
                    await ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: `${ethers.utils.hexlify(
                            +process.env.REACT_APP_CHAIN_ID,
                          )}`,
                          chainName: 'Ambrosus Test',
                          nativeCurrency: {
                            name: 'AMB',
                            symbol: 'AMB',
                            decimals: 18,
                          },
                          rpcUrls: [`${process.env.REACT_APP_RPC_URL}`],
                          blockExplorerUrls: [
                            `${process.env.REACT_APP_BLOCK_EXPLORER_URL}`,
                          ],
                        },
                      ],
                    });
                  } catch (addError) {
                    console.log(addError);
                  }
                }
                console.log(switchError);
              }
              provider.on('network', (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                  console.log('oldNetwork', oldNetwork);
                  window.location.reload();
                }
              });

              provider
                .listAccounts()
                .then((accounts) => {
                  const defaultAccount = accounts[0];
                  if (defaultAccount) {
                    setAccount(defaultAccount);
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
              setAuth(account);
            }
          })
          .catch((e) => {
            if (e) {
              storageService.set('auth', false);
              appStore.setAuth(false);
              setAuth(null);
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

  return auth ? (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
      onClick={() => {
        storageService.set('auth', true);
      }}
    >
      <ReactSVG src={walletIcon} wrapper="span" />
      <P size="m-500">&nbsp;&nbsp;Go to stacking</P>
    </div>
  ) : (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
      onClick={logIn}
    >
      <ReactSVG src={walletIcon} wrapper="span" />
      <P style={{ paddingLeft: 20 }} size="m-500">
        {CONNECT_TEXT}
      </P>
    </div>
  );
});

export default MetamaskConnect;
