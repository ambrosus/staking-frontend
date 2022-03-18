/*eslint-disable*/
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Logo from '../../../assets/svg/header-logo.svg';
import { MobileMenu } from './MobileMenu';
import LogoutIcon from '../../../assets/svg/logout.svg';
import { useMedia } from '../../../hooks';
import { ReactSVG } from 'react-svg';
import greenLightIcon from 'assets/svg/green-light-icon.svg';
import Paragraph from 'components/Paragraph';
import { ReactComponent as MetamaskIcon } from '../../../assets/svg/metamask-menu-icon.svg';
import { ethereum } from 'config';
import { changeNetwork } from 'utils/helpers';

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
  const location = useLocation();
  const [isMainPage, setIsMainPage] = useState(location.pathname !== '/');

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsMainPage(location.pathname !== '/');
    }
  }, [history, location.pathname]);

  const logout = () => {
    history.push('/');
    deactivate();
  };

  return (
    <header className="header">
      <div className="header-container header__content">
        <Link to="/" className="header__logo-wrapper">
          <img src={Logo} alt="logo" className="header__logo" />
        </Link>
        {data.map((menuItem) => {
          if (menuItem.type === 'submenu') {
            return (
              <div key={menuItem.link + menuItem.name}>
                <Submenu name={menuItem.name} data={menuItem.data} />
              </div>
            );
          }
          if (menuItem.type === 'link') {
            return (
              <a
                key={menuItem.link + menuItem.name}
                href={menuItem.link}
                className="header__link"
              >
                {menuItem.name}
              </a>
            );
          }
          return null;
        })}

        {account
          ? !isSmall &&
            isMainPage && (
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

const Submenu = ({ name = '', data = [{}] }) => {
  const { chainId } = useWeb3React();

  return (
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
      <div
        className="submenu__items"
        style={{
          '--items-amount':
            name === 'COMMUNITY' ? data.length + 2 : data.length,
        }}
      >
        {name === 'COMMUNITY' && ethereum && (
          <div
            className="connect-metamask-btn submenu__item"
            role="presentation"
            onClick={() => {
              changeNetwork();
            }}
          >
            <div>
              <MetamaskIcon />
            </div>{' '}
            <p>Add Ambrosus Network to Metamask</p>
          </div>
        )}
        {data.map(({ name: itemName, link }) => (
          <a href={link} key={link + itemName} className="submenu__item">
            {itemName}
          </a>
        ))}
      </div>
    </div>
  );
};

Submenu.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

const HEADER_DATA = [
  {
    type: 'submenu',
    name: 'ABOUT',
    data: [
      {
        name: 'About AMB',
        link: 'https://ambrosus.io/about',
      },
      {
        name: 'Roadmap',
        link: 'https://roadmap.ambrosus.io/',
      },
    ],
  },
  {
    type: 'link',
    name: 'BUSINESS',
    link: 'https://ambrosus.io/business',
  },
  {
    type: 'submenu',
    name: 'COMMUNITY',
    data: [
      {
        name: 'GET INVOLVED',
        link: 'https://ambrosus.io/community/',
      },
      {
        name: 'USE AMB',
        link: 'https://ambrosus.io/amb/',
      },
      {
        name: 'WALLET',
        link: 'https://ambrosus.io/wallet/',
      },
      {
        name: 'STAKING',
        link: 'https://staking.ambrosus.io/',
      },
      {
        name: 'FORUM',
        link: 'https://gov.ambrosus.io/',
      },
    ],
  },
  {
    type: 'link',
    name: 'DEVELOPERS',
    link: 'https://ambrosus.io/developers',
  },
  {
    type: 'link',
    name: 'EXPLORER',
    link: 'https://explorer.ambrosus.io/',
  },
];
