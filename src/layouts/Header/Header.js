import React from 'react';
import { useEthers } from '@usedapp/core';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';

export const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const logOut = async () => {
    deactivate();
  };
  const logIn = async () => {
    activateBrowserWallet();
  };

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
