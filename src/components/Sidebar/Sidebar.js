import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useLogIn } from '../../hooks';
import { MAIN_PAGE, STAKING_PAGE } from '../../config';

import arrowIcon from '../../assets/svg/arrow.svg';
import ambLogo from '../../assets/svg/header-logo.svg';
/*eslint-disable*/
const Sidebar = () => {
  const { logIn } = useLogIn();
  const [open, setOpen] = useState(false);
  const handleOnOpen = () => {
    setOpen(!open);
  };
  console.log(open);
  return (
    <Menu right stack onOpen={handleOnOpen} isOpen={open}>
      <div className="header-sidebar">
        <div className="logo">
          <ReactSVG src={ambLogo} onClick={() => history.push(MAIN_PAGE)} />
        </div>
        <div className="close-sidebar">
          <ReactSVG src={arrowIcon} onClick={handleOnOpen} />
        </div>
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
    </Menu>
  );
};
export default Sidebar;
