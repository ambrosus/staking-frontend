import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import P from '../../components/P';
import MetamaskConnect from '../../components/MetamaskConnect';
import StackItem from '../Stacking/StackingItem';
import { pools } from '../../utils/constants';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import CollapsedList from '../../components/CollapsedList';

const Home = () => {
  const menu = (
    <div className="menu">
      <a target="_blank" href="https://ambrosus.io/">
        <P size="xs-500">Main</P>
      </a>
      <a target="_blank" href="https://explorer.ambrosus.io/">
        <P size="xs-500">Explorer</P>
      </a>
      <Link to="/stacking">
        <P style={{ color: 'white' }} size="xs-500">
          Staking
        </P>
      </Link>
      <a href="https://amb.to/" target="_blank">
        <P size="xs-500">amb.to</P>
      </a>
    </div>
  );

  return (
    <div className="home">
      <ReactNotifications />
      <div className="home__top">
        <div className="home__top--header">
          <div className="home__top--logo">
            <ReactSVG src={headerLogoSvg} wrapper="span" />
          </div>
          {menu}
          <MetamaskConnect />
        </div>
        <div className="home__top--info">
          <div className="info-image"></div>
          <div className="info-text">
            <P size="xxxl-500" style={{ paddingBottom: 10 }}>
              Maximize your AMB Rewards.
            </P>
            <P size="l-500-white">
              You don&apos;t want to raise Node? Fine, steak your AMB and get up
              to 55% APY
            </P>
          </div>
        </div>
      </div>
      <div className="stacking">
        <div className="stacking__header">
          <div className="stacking__header__clearfix-pool">Pool</div>
          <div style={{ marginLeft: -36 }}>Total staked</div>
          <div className="stacking__header__clearfix-apy">Net APY</div>
          <div style={{ maxWidth: 157 }}></div>
        </div>
        {pools.map((pool) => (
          <StackItem key="test" poolInfo={pool} lazy />
        ))}
      </div>
      <div className="faq">
        <CollapsedList />
      </div>
    </div>
  );
};

export default Home;
