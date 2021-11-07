import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { providers } from 'ethers';

import P from '../../P';
import storageService from '../../../services/storage.service';
import appStore from '../../../store/app.store';
import {
  ambMounthUSD,
  ethereum,
  priceInPercent24h,
} from '../../../utils/constants';

import headerLogoSvg from '../../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../../assets/svg/login.svg';
import greenLightIcon from '../../../assets/svg/green-light-icon.svg';

export const Header = observer(() => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [percentChange24h, setPercentChange24h] = useState(0);
  const [account, setAccount] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const getAmbCourse = async () => {
    const priceInUsd = await ambMounthUSD(1);
    if (priceInUsd) {
      setUsdPrice(priceInUsd);
    }
    const percent = await priceInPercent24h(1);
    if (percent) {
      setPercentChange24h(percent);
      // data.data.percent_change_24h
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAmbCourse();
      if (storageService.get('auth') === true) {
        if (typeof ethereum !== 'undefined') {
          ethereum.on('disconnect', () => {
            storageService.set('auth', false);
            appStore.setAuth(false);
            if (!storageService.get('auth')) {
              history.push('/');
            }
          });
          const provider = new providers.Web3Provider(ethereum);
          provider
            .listAccounts()
            .then((accounts) => {
              const defaultAccount = accounts[0];
              if (defaultAccount) {
                setAccount(defaultAccount);
                storageService.set('auth', true);
              } else {
                storageService.set('auth', false);
                appStore.setAuth(false);
                if (!storageService.get('auth')) {
                  history.push('/');
                }
              }
            })
            .catch((e) => {
              if (e) {
                storageService.set('auth', false);
                appStore.setAuth(false);
                if (!storageService.get('auth')) {
                  history.push('/');
                }
              }
            });
        }
      } else {
        storageService.set('auth', false);
        appStore.setAuth(false);
        if (!storageService.get('auth')) {
          history.push('/');
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [ethereum]);

  const logOut = async () => {
    storageService.set('auth', false);
    appStore.setAuth(false);
    if (!storageService.get('auth')) {
      history.push('/');
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
      <Link to="/staking">
        <P
          style={{
            color: location.pathname === '/staking' ? '#4A38AE' : '#FFFFFF',
          }}
          size="xs-500"
        >
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
        <Link to="/staking">
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </Link>
      </div>
      <div className="header__items">
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
                  ? ` ${account.substr(0, 9)}...${account.slice(32)}`
                  : '...'}
              </P>
            )}
          </div>
        )}
      </div>
      <div className="login">
        {account && (
          <div role="presentation" className="header__btn" onClick={logOut}>
            <ReactSVG src={loginIcon} wrapper="span" />
            <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
              Log Out
            </P>
          </div>
        )}
      </div>
    </div>
  );
});
export default Header;
