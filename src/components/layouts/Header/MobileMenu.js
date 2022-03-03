import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import greenLightIcon from 'assets/svg/green-light-icon.svg';
import Paragraph from 'components/Paragraph';
import loginIcon from 'assets/svg/login.svg';
import { useWeb3React } from '@web3-react/core';
import { useAsync, useLogIn, useMedia } from 'hooks';
import appStore from 'store/app.store';
import { getToken } from 'api';
import { ethereum } from 'config';
import { changeNetwork } from 'utils/helpers';
import { ReactComponent as MetamaskIcon } from 'assets/svg/metamask-menu-icon.svg';

export const MobileMenu = ({
  data = [{}],
  isOpen = false,
  toggleMenu = () => {},
}) => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(-1);
  const { account } = useWeb3React();
  const isSmall = useMedia('(max-width: 899px)');
  const { logOut } = useLogIn();

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

  useEffect(() => {
    if (isOpen) document.querySelector('body').style.overflow = 'hidden';
    else document.querySelector('body').style.overflow = '';
  }, [isOpen]);

  const toggleSubmenu = (index) =>
    setOpenSubmenuIndex(index === openSubmenuIndex ? -1 : index);

  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu_open' : ''}`}>
      {data.map((menuItem, i) => {
        if (menuItem.type === 'submenu') {
          return (
            <MobileSubmenu
              name={menuItem.name}
              data={menuItem.data}
              index={i}
              toggleSubmenu={() => toggleSubmenu(i)}
              isOpen={openSubmenuIndex === i}
            />
          );
        }
        if (menuItem.type === 'link') {
          return (
            <a
              href={menuItem.link}
              className="mobile-menu__link"
              data-number={`—\u00A00${i + 1}`}
              onClick={toggleMenu}
            >
              {menuItem.name}
            </a>
          );
        }
        return null;
      })}
      {account && isSmall && (
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
  );
};

MobileMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

const MobileSubmenu = ({
  name = '',
  data = [{}],
  index = 0,
  toggleSubmenu = () => {},
  toggleMenu = () => {},
  isOpen = false,
}) => (
  <div
    className={`mobile-submenu ${isOpen ? 'mobile-submenu_open' : ''}`}
    style={{
      zIndex: 21,
      position: 'relative',
    }}
  >
    <button
      type="button"
      className="mobile-submenu__name"
      data-number={`—\u00A00${index + 1}`}
      onClick={toggleSubmenu}
    >
      {name}
      <svg viewBox="0 0 15 8" className="mobile-submenu__arrow" fill="none">
        <path
          d="M14.2031 1L7.53644 7L0.869791 0.999999"
          stroke="currentColor"
        />
      </svg>
    </button>
    <div
      className="mobile-submenu__items"
      style={{
        margin: 0,
        padding: 0,
        right: -40,
        width: 310,
        '--items-amount':
          name === 'COMMUNITY' ? data.length + 1 + 0.5 : data.length,
      }}
    >
      {name === 'COMMUNITY' && isOpen && (
        <div
          className="connect-metamask-btn"
          style={{
            userSelect: 'none',
            width: 304,
            overflow: 'hidden',
            transition: 'all 1s',
            position: 'absolute',
            top: 20,
            zIndex: 2222,
            right: 0,
            height: 70,
            margin: 0,
            padding: 0,
            minWidth: 304,
          }}
          role="presentation"
          onClick={() => {
            if (ethereum) {
              changeNetwork();
            }
          }}
        >
          <div>
            <MetamaskIcon width={32} height={30} />
          </div>{' '}
          <p
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: ' 0.22em',
            }}
          >
            Add to Metamask
          </p>
        </div>
      )}
      {data.map(({ name: itemName, link }) => (
        <a href={link} className="mobile-submenu__item" onClick={toggleMenu}>
          {itemName}
        </a>
      ))}
    </div>
  </div>
);

MobileSubmenu.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  toggleSubmenu: PropTypes.func,
  toggleMenu: PropTypes.func,
  isOpen: PropTypes.bool,
};
