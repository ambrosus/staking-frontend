import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useEthers } from '@usedapp/core';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';

import P from '../P';
import storageService from '../../services/storage.service';
import { CONNECT_TEXT } from '../../utils/constants';

import walletIcon from '../../assets/svg/wallet.svg';
import appStore from '../../store/app.store';

export const MetamaskConnect = observer(() => {
  const { account } = useEthers();
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const logIn = async () => {
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

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
      <P style={{ paddingLeft: 30, paddingRight: 30 }} size="m-500">
        Go to stacking
      </P>
    </div>
  ) : (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
      onClick={logIn}
    >
      <ReactSVG src={walletIcon} wrapper="span" />
      <P style={{ paddingLeft: 30, paddingRight: 30 }} size="m-500">
        {CONNECT_TEXT}
      </P>
    </div>
  );
});

export default MetamaskConnect;
