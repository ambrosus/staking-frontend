/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Currency } from '@ambrosus/react';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';
import storageService from '../../services/storage.service';
import appStore from '../../store/app.store';
import { ambMounthUSD } from '../../utils/constants';

export const Header = observer(() => {
  const { account, activateBrowserWallet, deactivate, activate } = useEthers();
  const [usdPrice, setUsdPrice] = useState(0);
  const [percentChange24h, setPercentChange24h] = useState(0);
  const history = useHistory();
  useEffect(async () => {
    await activateBrowserWallet();
    fetch('https://token.ambrosus.io')
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          setUsdPrice(data.data.price_usd);
          setPercentChange24h(data.data.percent_change_24h);
        }
      });
  }, []);

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
        <P size="xs-400" style={{ color: '#333333' }}>
          AMB Price{' '}
          <b>
            {' '}
            {usdPrice ? (
              <span>
                {' '}
                $&nbsp;
                <Currency
                  style={{ color: '#333333' }}
                  symbol=" "
                  value={ambMounthUSD(1, usdPrice)}
                  fixed={4}
                />
              </span>
            ) : (
              <span>...</span>
            )}
          </b>
          &nbsp;&nbsp;
          <span style={{ color: '#1ACD8C' }}>
            {percentChange24h && percentChange24h}%
          </span>
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
