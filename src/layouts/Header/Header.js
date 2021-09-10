import React from 'react';
import { useEthers } from '@usedapp/core';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';

export const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const history = useHistory();
  const logOut = async () => {
    deactivate();
    history.push('/');
  };
  const logIn = async () => {
    activateBrowserWallet();
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
        <Link to="/">
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </Link>
      </div>
      <div className="amb-curse">
        <P size="xs-400" style={{ color: '#9198BB' }}>
          AMB Price <b>$ 0.0402 </b>-8.30%
        </P>
      </div>
      {menu}
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
  );
};
export default Header;
