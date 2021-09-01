import React from 'react';
import { ReactSVG } from 'react-svg';

import P from '../../components/P';
import headerLogoSvg from '../../assets/svg/header-logo.svg';
import MetamaskConnect from '../../components/MetamaskConnect';

const Home = () => {
  const content = (
    <div className="home__content">
      <P size="xxxl-500" style={{ paddingBottom: 10 }}>
        Maximize your AMB Rewards.
      </P>
      <P size="xl-400">
        You don&apos;t want to raise Node? Fine, steak your AMB and get up to
        55% APY
      </P>
    </div>
  );
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header--logo">
          <ReactSVG src={headerLogoSvg} wrapper="span" />
        </div>
        <MetamaskConnect />
      </div>
      {content}
    </div>
  );
};

export default Home;
