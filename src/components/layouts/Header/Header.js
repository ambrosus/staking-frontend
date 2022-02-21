import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Logo from '../../../assets/svg/logo.svg';
import { MobileMenu } from './MobileMenu';
import LogoutIcon from '../../../assets/svg/logout.svg';
import { useAsync, useMedia } from '../../../hooks';
import appStore from '../../../store/app.store';
import { getToken } from '../../../api/index';
import { ReactSVG } from 'react-svg';
import greenLightIcon from 'assets/svg/green-light-icon.svg';
import Paragraph from 'components/Paragraph';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <HeaderLayout
        {...{
          toggleMenu,
          isOpen,
        }}
        data={HEADER_DATA}
      />
      <MobileMenu
        {...{
          isOpen,
          toggleMenu,
        }}
        data={HEADER_DATA}
      />
    </>
  );
};

const HeaderLayout = ({
  data = [{}],
  isOpen = false,
  toggleMenu = () => {},
}) => {
  const { account, deactivate } = useWeb3React();
  const isSmall = useMedia('(max-width: 899px)');
  const history = useHistory();

  const logout = () => {
    history.push('/');
    deactivate();
  };

  const {
    data: courseData,
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
      appStore.setTokenPrice(courseData?.data?.price_usd);
      appStore.setTokenChange(courseData?.data?.percent_change_24h);
    }
  }, [run, priceStatus]);

  return (
    <header className="header">
      <div className="header-container header__content">
        <Link to="/" className="header__logo-wrapper">
          <img src={Logo} alt="logo" className="header__logo" />
        </Link>
        {account && !isSmall && (
          <Paragraph size="xs-400" style={{ color: '#FFFFFF' }}>
            AMB Price{' '}
            <b>
              {' '}
              {courseData?.data?.price_usd ? (
                <span style={{ color: '#FFFFFF' }}>
                  {' '}
                  $&nbsp;{Number(courseData?.data?.price_usd).toFixed(4)}
                </span>
              ) : (
                <span>...</span>
              )}
            </b>
            &nbsp;&nbsp;
            <span
              style={{
                color:
                  courseData?.data?.percent_change_24h > 0
                    ? '#1ACD8C'
                    : '#9198BB',
              }}
            >
              {courseData?.data?.percent_change_24h}%
            </span>
          </Paragraph>
        )}
        {data.map((menuItem) => {
          if (menuItem.type === 'submenu') {
            return <Submenu name={menuItem.name} data={menuItem.data} />;
          }
          if (menuItem.type === 'link') {
            return (
              <a href={menuItem.link} className="header__link">
                {menuItem.name}
              </a>
            );
          }
          return null;
        })}

        {account
          ? !isSmall &&
            history.location !== '/' && (
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

                <button type="button" onClick={logout} className="logout">
                  <img
                    src={LogoutIcon}
                    alt="wallet icon"
                    className="logout__icon"
                  />
                  <span className="logout__text">LOG OUT</span>
                </button>
              </>
            )
          : null}

        <div
          role="presentation"
          className={`burger-icon ${isOpen ? 'burger-icon_open' : ''}`}
          onClick={toggleMenu}
        >
          <span className="burger-icon__first-line burger-icon__line" />
          <span className="burger-icon__second-line burger-icon__line" />
          <span className="burger-icon__third-line burger-icon__line" />
        </div>
      </div>
    </header>
  );
};

HeaderLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

const Submenu = ({ name = '', data = [{}] }) => (
  <div className="submenu">
    <p className="submenu__name">
      {name}
      <svg viewBox="0 0 15 8" className="submenu__arrow" fill="none">
        <path
          d="M14.2031 1L7.53644 7L0.869791 0.999999"
          stroke="currentColor"
        />
      </svg>
    </p>
    <div className="submenu__items" style={{ '--items-amount': data.length }}>
      {data.map(({ name: itemName, link }) => (
        <a href={link} key={link} className="submenu__item">
          {itemName}
        </a>
      ))}
    </div>
  </div>
);

Submenu.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

const HEADER_DATA = [
  {
    type: 'submenu',
    name: 'Use Ambrosus',
    data: [
      {
        name: 'About AMB',
        link: 'https://ambrosus.io/about',
      },
      {
        name: 'Staking',
        link: 'https://staking.ambrosus.io/',
      },
      {
        name: 'Wallet',
        link: 'https://ambrosus.io/wallet',
      },
      {
        name: 'Explorer',
        link: 'https://explorer.ambrosus.com/',
      },
      {
        name: 'Roadmap',
        link: 'https://roadmap.ambrosus.io/',
      },
    ],
  },
  {
    type: 'link',
    name: 'Projects',
    link: 'https://ambrosus.io/projects',
  },
  {
    type: 'submenu',
    name: 'Community',
    data: [
      {
        name: 'Community',
        link: 'https://ambrosus.io/community',
      },
      {
        name: 'AMB',
        link: 'https://ambrosus.io/amb',
      },
    ],
  },
  {
    type: 'link',
    name: 'About',
    link: 'https://ambrosus.io/about',
  },
];
