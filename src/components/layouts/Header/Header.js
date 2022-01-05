import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import Menu from '../../../pages/Home/components/Menu';
import Paragraph from '../../Paragraph';
import appStore from '../../../store/app.store';
import { MAIN_PAGE, walletconnect } from '../../../config';
import { getToken } from '../../../api';
import headerLogoSvg from '../../../assets/svg/header-logo.svg';
import loginIcon from '../../../assets/svg/login.svg';
import greenLightIcon from '../../../assets/svg/green-light-icon.svg';
import { useAsync, useMedia } from '../../../hooks';

export const Header = observer(() => {
  const { account, deactivate } = useWeb3React();
  const history = useHistory();
  const isSmall = useMedia('(max-width: 699px)');

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
      appStore.setTokenChange(data?.data?.percent_change_24h);
    }
  }, [run, priceStatus]);

  const logOut = async () => {
    deactivate();
    localStorage.removeItem('connector');
    if (window.localStorage.getItem('connector') === 'walletconnect') {
      await walletconnect.close();
      walletconnect.walletConnectProvider = null;
    }
    history.push(MAIN_PAGE);
  };

  return (
    <div className="home__top">
      <div className="home__top--header">
        <Link to="/" style={{ marginRight: isSmall && 'auto' }}>
          <div className="logo">
            <ReactSVG src={headerLogoSvg} wrapper="span" />
          </div>
        </Link>
        {account && !isSmall && (
          <Paragraph size="xs-400" style={{ color: '#FFFFFF' }}>
            AMB Price{' '}
            <b>
              {' '}
              {data?.data?.price_usd ? (
                <span style={{ color: '#FFFFFF' }}>
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
        )}
        <Menu />
        {account && !isSmall && (
          <>
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
            <div className="login">
              <div role="presentation" className="header__btn" onClick={logOut}>
                <ReactSVG src={loginIcon} wrapper="span" />
                <Paragraph
                  size="xs-500"
                  style={{ color: '#fff', paddingLeft: 5 }}
                >
                  Log Out
                </Paragraph>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
export default Header;
