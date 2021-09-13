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
  const { activateBrowserWallet, activate, account } = useEthers();
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const logIn = async () => {
    activateBrowserWallet();
  };

  useEffect(() => {
    setTimeout(async () => {
      if (account) {
        history.push('/');
        storageService.set('auth', true);
        appStore.setAuth(true);
        setAuth(account);
      } else {
        storageService.set('auth', false);
        if (!account) {
          await activate();
        } else {
          setAuth(account);
          history.push('/');
          appStore.setAuth(true);
          storageService.set('auth', true);
        }
      }
    }, 500);
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
