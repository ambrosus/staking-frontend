import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useLocation } from 'react-router-dom';
import P from '../P';
import useLogIn from '../../hooks/useLogIn';
import { STAKING_PAGE } from '../../config';

const Sidebar = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const { logIn } = useLogIn();
  return (
    <Menu {...props}>
      <a target="_blank" href="https://ambrosus.io/">
        <P
          style={{
            color: pathname === STAKING_PAGE ? '#4A38AE' : '#FFFFFF',
          }}
          size="xs-500"
        >
          Main
        </P>
      </a>
      <a target="_blank" href="https://explorer.ambrosus.io/">
        <P size="xs-500">Explorer</P>
      </a>
      <Link to="/staking" onClick={logIn}>
        <P
          style={{
            color: pathname === STAKING_PAGE ? '#4A38AE' : '#9198BB',
          }}
          size="xs-500"
        >
          Staking
        </P>
      </Link>
      <a href="https://amb.to/" target="_blank">
        <P size="xs-500">amb.to</P>
      </a>
    </Menu>
  );
};
export default Sidebar;
