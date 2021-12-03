import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useLocation } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import Paragraph from '../../components/Paragraph';
import MetamaskConnect from './components/MetamaskConnect';
import StakingItem from '../../components/StakingItem';
import CollapsedList from '../../components/CollapsedList';
import { Loader } from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import RenderItems from '../../components/RenderItems';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import { MAIN_PAGE } from '../../config';
import Menu from './components/Menu';
import appStore from '../../store/app.store';

const Home = () => {
  const [pools, setPools] = useState([]);
  const { pathname } = useLocation();

  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(() => appStore.poolsData);
  };

  useEffect(() => {
    getPools();
  }, []);

  return (
    <>
      <div className="home" id="home">
        <Sidebar pageWrapId="root" outerContainerId="root" />
        <ReactNotifications />
        <div className="home__top">
          <div className="home__top--header">
            <div className="logo">
              <ReactSVG src={headerLogoSvg} wrapper="span" />
            </div>
            <Menu />
          </div>
        </div>
        <div className="home__top--info">
          <div className="back-figure1" />
          <div className="back-figure2" />
          <div className="info-text">
            <Paragraph
              size="xxxl-500"
              style={{
                paddingBottom: 10,
                fontFamily: 'Halvar Breitschrift,sans-serif',
              }}
            >
              Get AMB Rewards. No node needed.
            </Paragraph>
            <Paragraph size="l-500-white">
              Stake your AMB and receive up to
              <span style={{ color: '#1ACD8C', fontWeight: 600 }}>
                {' '}
                35% APY
              </span>{' '}
              in a few clicks.
            </Paragraph>
          </div>
          <MetamaskConnect />
        </div>
        <div className="staking">
          {pools.length > 0 ? (
            <>
              <div
                className="staking__header"
                style={{
                  color: pathname === MAIN_PAGE && '#FFFFFF',
                }}
              >
                <div className="staking__header__clearfix-pool">Pool</div>
                <div>Total pool stake</div>
                <div className="staking__header__clearfix-apy">APY</div>
                <div style={{ maxWidth: 160, minWidth: 160 }} />
              </div>
              <div className="staking__pools">
                <RenderItems>
                  <>
                    {pools.map(
                      (item) =>
                        item.active && (
                          <StakingItem
                            key={item.contractName}
                            poolInfo={item}
                            expand={false}
                          />
                        ),
                    )}
                  </>
                </RenderItems>
              </div>
            </>
          ) : (
            <div className="staking__loader">
              <Loader types="spokes" />
            </div>
          )}
        </div>
        <div className="faq">
          <CollapsedList />
        </div>
      </div>
    </>
  );
};

export default Home;
