import React, { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';
import storageService from '../../services/storage.service';
import appStore from '../../store/app.store';

export const Header = observer(() => {
  const { account, activateBrowserWallet, deactivate, activate } = useEthers();
  const history = useHistory();
  useEffect(async () => {
    await activateBrowserWallet();
  }, [account]);

  const logOut = async () => {
    deactivate();

    storageService.set('auth', false);
    appStore.setAuth(false);
    if (!storageService.get('auth')) {
      history.push('/');
    }
  };
  const logIn = async () => {
    activateBrowserWallet();
    await activate();
    if (account) {
      storageService.set('auth', true);
      appStore.setAuth(true);
    }
  };

  const menu = (
    <div className="menu">
      <a target="_blank" href="https://ambrosus.io/">
        <P size="xs-500">Main</P>
      </a>
      <a target="_blank" href="https://explorer.ambrosus.io/">
        <P size="xs-500">Explorer</P>
      </a>
      <Link to="/stacking">
        <P style={{ color: '#4A38AE' }} size="xs-500">
          Staking
        </P>
      </Link>
      <a href="https://amb.to/" target="_blank">
        <P size="xs-500">amb.to</P>
      </a>
    </div>
  );
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/stacking">
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </Link>
      </div>
      <div className="amb-curse">
        <P size="xs-400" style={{ color: '#9198BB' }}>
          AMB Price <b>$ 0.0402 </b>-8.30%
        </P>
      </div>
      {menu}
      <div className="login">
        {account && (
          <div className="wallet-connect">
            {account && <ReactSVG src={greenLightIcon} wrapper="span" />}
            {account && (
              <P size="xs-400">
                {account
                  ? ` ${account.substr(0, 9)}...${account.substr(0, 9)}`
                  : '...'}
              </P>
            )}
          </div>
        )}

        {account ? (
          <div role="presentation" className="header__btn" onClick={logOut}>
            <ReactSVG src={loginIcon} wrapper="span" />
            <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
              Log Out
            </P>
          </div>
        ) : (
          <div role="presentation" className="header__btn" onClick={logIn}>
            <ReactSVG src={loginIcon} wrapper="span" />
            <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
              Log in
            </P>
          </div>
        )}
      </div>
    </div>
  );
});
export default Header;
