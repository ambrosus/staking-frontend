/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Currency } from '@ambrosus/react';
import Web3 from 'web3';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';
import storageService from '../../services/storage.service';
import appStore from '../../store/app.store';
import { ambMounthUSD } from '../../utils/constants';

export const Header = observer(() => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [percentChange24h, setPercentChange24h] = useState(0);
  const [account, setAccount] = useState(null);
  const {
    account: acc,
    activateBrowserWallet,
    deactivate,
    activate,
  } = useEthers();
  const history = useHistory();
  const web3 = new Web3(window.web3.currentProvider);
  useEffect(async () => {
    await activateBrowserWallet();
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      await window.ethereum.enable();
      web3.eth.getAccounts().then((accounts) => {
        if (accounts) {
          setAccount(accounts[0]);
          appStore.setAuth(true);
        } else {
          setAccount(acc);
          appStore.setAuth(true);
        }
      });
    }
    fetch('https://token.ambrosus.io')
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          const priceInUsd = ambMounthUSD(1, data?.data?.price_usd);
          if (priceInUsd) {
            setUsdPrice(priceInUsd);
          }
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
    await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

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
      <div
        style={{
          minWidth: 1040,
          maxWidth: 1040,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="amb-curse">
          <P size="xs-400" style={{ color: '#333333' }}>
            AMB Price{' '}
            <b>
              {' '}
              {usdPrice ? (
                <span style={{ color: '#333333' }}>
                  {' '}
                  $&nbsp;{Number(usdPrice).toFixed(4)}
                </span>
              ) : (
                <span>...</span>
              )}
            </b>
            &nbsp;&nbsp;
            <span
              style={{ color: percentChange24h > 0 ? '#1ACD8C' : '#9198BB' }}
            >
              {percentChange24h && percentChange24h}%
            </span>
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
      </div>
      <div className="login">
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
