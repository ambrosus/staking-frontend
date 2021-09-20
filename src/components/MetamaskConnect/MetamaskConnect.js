import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useEthers } from '@usedapp/core';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';
import { store as alertStore } from 'react-notifications-component';

import P from '../P';
import storageService from '../../services/storage.service';
import { CONNECT_TEXT } from '../../utils/constants';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert/InstallMetamaskAlert';
import appStore from '../../store/app.store';

import walletIcon from '../../assets/svg/wallet.svg';
import FromPhoneDeviseEnter from '../../pages/Home/components/FromPhoneDeviseEnter';

export const MetamaskConnect = observer(() => {
  const { account } = useEthers();
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const logIn = async () => {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 1000);
    }

    async function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        await window.ethereum.enable();

        await window.ethereum
          .request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {},
              },
            ],
          })
          .then((e) => {
            if (e) {
              history.push('/stacking');
              storageService.set('auth', true);
              appStore.setAuth(true);
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
      } else {
        alertStore.addNotification({
          content: InstallMetamaskAlert,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
    }
  };
  useEffect(() => {
    if (storageService.get('auth') === true) {
      history.push('/stacking');
    }
  }, [sessionStorage, account, auth, appStore.auth]);
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
