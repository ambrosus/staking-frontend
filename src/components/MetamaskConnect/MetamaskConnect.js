import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';

import P from '../P';
import storageService from '../../services/storage.service';
import { CONNECT_TEXT } from '../../utils/constants';
import appStore from '../../store/app.store';

import walletIcon from '../../assets/svg/wallet.svg';
import useLogIn from '../../utils/useLogIn';

export const MetamaskConnect = observer(() => {
  const history = useHistory();
  const { logIn } = useLogIn();
  useEffect(() => {
    if (storageService.get('auth') === true) {
      history.push('/stacking');
    }
  }, [sessionStorage, appStore.auth]);

  return appStore.auth ? (
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
