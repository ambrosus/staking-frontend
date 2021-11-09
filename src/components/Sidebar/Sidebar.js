import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import P from '../P';

const Sidebar = (props) => (
  <Menu {...props}>
    <a target="_blank" href="https://ambrosus.io/">
      <P size="xs-500">Main</P>
    </a>
    <a target="_blank" href="https://explorer.ambrosus.io/">
      <P size="xs-500">Explorer</P>
    </a>
    <Link to="/staking">
      <P style={{ color: 'white' }} size="xs-500">
        Staking
      </P>
    </Link>
    <a href="https://amb.to/" target="_blank">
      <P size="xs-500">amb.to</P>
    </a>
  </Menu>
);
export default Sidebar;
