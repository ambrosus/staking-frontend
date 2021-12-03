import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';

import Paragraph from '../../Paragraph';
import appStore from '../../../store/app.store';
import { ethereum, MAIN_PAGE, menuLinks, STAKING_PAGE } from '../../../config';
import { ambPriceInUsd, priceInPercent24h } from '../../../api';

import headerLogoSvg from '../../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../../assets/svg/login.svg';
import greenLightIcon from '../../../assets/svg/green-light-icon.svg';

export const Header = observer(() => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [percentChange24h, setPercentChange24h] = useState(0);
  const { account, deactivate } = useWeb3React();
  const history = useHistory();

  const getAmbCourse = async () => {
    const priceInUsd = await ambPriceInUsd();
    if (priceInUsd) {
      setUsdPrice(priceInUsd);
      appStore.setTokenPrice(priceInUsd);
    }
    const percent = await priceInPercent24h();
    if (percent) {
      setPercentChange24h(percent);
    }
  };

  useEffect(() => {
    if (ethereum?.isMetaMask) {
      getAmbCourse();
    }
  }, []);

  const logOut = async () => {
    deactivate();
    history.push(MAIN_PAGE);
  };

  const menu = (
    <div className="menu">
      {menuLinks.map((link) =>
        link.route ? (
          <Link to={link.href} className="menu__bold" key={link.href}>
            <Paragraph
              style={{ color: '#4A38AE', fontWeight: '600' }}
              className="active"
              size="xs-500"
            >
              {link.title}
            </Paragraph>
          </Link>
        ) : (
          <a target={link.target && '_blank'} href={link.href} key={link.href}>
            <Paragraph size="xs-500">{link.title}</Paragraph>
          </a>
        ),
      )}
    </div>
  );
  return (
    <div className="header">
      <div className="header__logo">
        <Link to={STAKING_PAGE}>
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </Link>
      </div>
      <div className="header__items">
        <div className="amb-curse">
          <Paragraph size="xs-400" style={{ color: '#333333' }}>
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
          </Paragraph>
        </div>
        {menu}
        {account && (
          <div className="wallet-connect">
            {account && <ReactSVG src={greenLightIcon} wrapper="span" />}
            {account && (
              <Paragraph size="xs-400">
                {account
                  ? ` ${account.substr(0, 9)}...${account.slice(32)}`
                  : '...'}
              </Paragraph>
            )}
          </div>
        )}
      </div>
      <div className="login">
        <div role="presentation" className="header__btn" onClick={logOut}>
          <ReactSVG src={loginIcon} wrapper="span" />
          <Paragraph size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
            Log Out
          </Paragraph>
        </div>
      </div>
    </div>
  );
});
export default Header;
