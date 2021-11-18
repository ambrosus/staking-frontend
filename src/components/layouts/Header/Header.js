import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';

import P from '../../P';
import appStore from '../../../store/app.store';
import { ethereum, menuLinks } from '../../../utils/constants';
import { ambPriceInUsd, priceInPercent24h } from '../../../API/API';

import headerLogoSvg from '../../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../../assets/svg/login.svg';
import greenLightIcon from '../../../assets/svg/green-light-icon.svg';
import { connectorsByName } from '../../../utils/connectors';
/*eslint-disable*/

export const Header = observer(() => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [percentChange24h, setPercentChange24h] = useState(0);
  const { account, activate, active, deactivate } = useWeb3React();
  const history = useHistory();
  const getAmbCourse = async () => {
    const priceInUsd = await ambPriceInUsd(1);
    if (priceInUsd) {
      setUsdPrice(priceInUsd);
      appStore.setTokenPrice(priceInUsd);
    }
    const percent = await priceInPercent24h(1);
    if (percent) {
      setPercentChange24h(percent);
    }
  };

  useEffect(async () => {
    let mounted = true;
    if (mounted) {
      if (ethereum && ethereum.isMetaMask) {
        await activate(connectorsByName['Injected']);
        getAmbCourse();
      }
    }
    return () => {
      mounted = false;
      getAmbCourse();
    };
  }, [active]);

  const logOut = async () => {
    deactivate();
    history.push('/');
  };

  const menu = (
    <div className="menu">
      {menuLinks.map((link) =>
        link.route ? (
          <Link to={link.href} className="menu__bold" key={link.href}>
            <P
              style={{ color: '#4A38AE', fontWeight: '600' }}
              className="active"
              size="xs-500"
            >
              {link.title}
            </P>
          </Link>
        ) : (
          <a target={link.taget && '_blank'} href={link.href} key={link.href}>
            <P size="xs-500">{link.title}</P>
          </a>
        ),
      )}
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
              {percentChange24h}%
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
        <div role="presentation" className="header__btn" onClick={logOut}>
          <ReactSVG src={loginIcon} wrapper="span" />
          <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
            Log Out
          </P>
        </div>
      </div>
    </div>
  );
});
export default Header;
