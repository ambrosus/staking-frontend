/*eslint-disable*/
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import { useEthers } from '@usedapp/core';

import walletIcon from '../../assets/svg/wallet.svg';
import P from '../P';
import { CONNECT_TEXT } from '../../utils/constants';
import appStore from '../../store/app.store';
import { observer } from 'mobx-react-lite';

export const MetamaskConnect = observer(() => {
  const { activateBrowserWallet, account } = useEthers();
  const logOut = async () => {};
  const logIn = async () => {
    activateBrowserWallet();
    appStore.setAuth(true);
  };
  const history = useHistory();

  return account ? (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
      onClick={() => appStore.auth && history.push('/stacking')}
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
