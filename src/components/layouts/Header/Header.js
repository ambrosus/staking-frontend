import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import Paragraph from '../../Paragraph';
import appStore from '../../../store/app.store';
import { MAIN_PAGE, menuLinks } from '../../../config';
import { getToken } from '../../../api';

import headerLogoSvg from '../../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../../assets/svg/login.svg';
import greenLightIcon from '../../../assets/svg/green-light-icon.svg';
import { useAsync } from '../../../hooks';

export const Header = observer(() => {
  const { account, deactivate } = useWeb3React();
  const history = useHistory();
  const {
    data,
    status: priceStatus,
    run,
  } = useAsync({
    status: appStore.tokenPrice !== undefined ? 'pending' : 'idle',
    data: null,
  });

  React.useEffect(() => {
    if (priceStatus === 'idle') {
      run(getToken());
    }
    if (priceStatus === 'resolved') {
      appStore.setTokenPrice(data?.data?.price_usd);
    }
  }, [run, priceStatus]);

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
        <Link to={MAIN_PAGE}>
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </Link>
      </div>
      <div className="header__items">
        <div className="amb-curse">
          <Paragraph size="xs-400" style={{ color: '#333333' }}>
            AMB Price{' '}
            <b>
              {' '}
              {data?.data?.price_usd ? (
                <span style={{ color: '#333333' }}>
                  {' '}
                  $&nbsp;{Number(data?.data?.price_usd).toFixed(4)}
                </span>
              ) : (
                <span>...</span>
              )}
            </b>
            &nbsp;&nbsp;
            <span
              style={{
                color:
                  data?.data?.percent_change_24h > 0 ? '#1ACD8C' : '#9198BB',
              }}
            >
              {data?.data?.percent_change_24h}%
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
