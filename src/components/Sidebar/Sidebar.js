import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import appStore from '../../store/app.store';
import { useLogIn, useMedia } from '../../hooks';
import { MAIN_PAGE, STAKING_PAGE } from '../../config';
import Paragraph from '../Paragraph';

import arrowIcon from '../../assets/svg/arrow.svg';
import ambLogo from '../../assets/svg/header-logo.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import loginIcon from '../../assets/svg/login.svg';

const Sidebar = () => {
  const { logIn } = useLogIn();
  const [open, setOpen] = useState(false);
  const { account, deactivate } = useWeb3React();
  const isSmall = useMedia('(max-width: 699px)');
  const history = useHistory();

  const handleOnOpen = () => {
    setOpen(() => !open);
  };

  const logOut = async () => {
    deactivate();
    history.push(MAIN_PAGE);
  };

  return (
    <>
      <Menu
        noOverlay
        disableOverlayClick
        right
        onOpen={handleOnOpen}
        isOpen={open}
      >
        <div className="header-sidebar">
          <div className="logo">
            <ReactSVG src={ambLogo} />
          </div>
          <div className="close-sidebar">
            <ReactSVG src={arrowIcon} onClick={() => handleOnOpen()} />
          </div>
        </div>
        <div className="sidebar-options">
          {account && isSmall && (
            <>
              <div className="wallet-connect">
                <ReactSVG src={greenLightIcon} wrapper="span" />
                <Paragraph size="xs-400">
                  {account
                    ? ` ${account.substr(0, 9)}...${account.slice(33)}`
                    : '...'}
                </Paragraph>
              </div>
              <div className="login">
                <div
                  role="presentation"
                  className="header__btn"
                  onClick={logOut}
                >
                  <ReactSVG
                    src={loginIcon}
                    wrapper="span"
                    style={{ color: '#fff', marginTop: -5 }}
                  />
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
        <a className="menu-item" target="_blank" href="https://ambrosus.io/">
          <span className="after">— 01</span>
          <p>Main</p>
        </a>
        <a
          className="menu-item"
          target="_blank"
          href="https://explorer.ambrosus.io/"
        >
          <span className="after">— 02</span>
          <p>Explorer</p>
        </a>
        <Link className="menu-item" to={STAKING_PAGE} onClick={logIn}>
          <span className="after">— 03</span>
          <p>Staking</p>
        </Link>
        <a className="menu-item" href="https://amb.to/" target="_blank">
          <span className="after">— 04</span>
          <p>amb.to</p>
        </a>
        {account && isSmall && (
          <div className="menu-item-info">
            <Paragraph size="xs-400" style={{ color: '#FFFFFF' }}>
              AMB Price{' '}
              <b>
                {' '}
                {appStore.tokenPrice ? (
                  <span style={{ color: '#FFFFFF' }}>
                    {' '}
                    $&nbsp;{Number(appStore.tokenPrice).toFixed(4)}
                  </span>
                ) : (
                  <span>...</span>
                )}
              </b>
              &nbsp;&nbsp;
              <span
                style={{
                  color: appStore.tokenChange > 0 ? '#1ACD8C' : '#9198BB',
                }}
              >
                {appStore.tokenChange}%
              </span>
            </Paragraph>
          </div>
        )}
      </Menu>
    </>
  );
};
export default Sidebar;
