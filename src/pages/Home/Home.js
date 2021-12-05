import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { toJS } from 'mobx';
import { useLocation } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import Paragraph from '../../components/Paragraph';
import StakingItem from '../../components/StakingItem';
import CollapsedList from '../../components/CollapsedList';
import { Loader } from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import RenderItems from '../../components/RenderItems';
import { useLogIn } from '../../hooks';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import { CONNECT_TEXT, MAIN_PAGE } from '../../config';
import Menu from './components/Menu';
import appStore from '../../store/app.store';

import secondSectionIcon1 from '../../assets/svg/home/second-section/Icon1-66x85.svg';
import secondSectionIcon2 from '../../assets/svg/home/second-section/Icon2-66x85.svg';
import secondSectionIcon3 from '../../assets/svg/home/second-section/Icon3-66x85.svg';
import secondSectionIcon4 from '../../assets/svg/home/second-section/Icon4-66x85.svg';

import BinanceIcon from '../../assets/svg/home/whereToByAmb/Binance.svg';
import KuCoinIcon from '../../assets/svg/home/whereToByAmb/KuCoin.svg';
import WhiteBITIcon from '../../assets/svg/home/whereToByAmb/WhiteBIT.svg';
import probitIcon from '../../assets/svg/home/whereToByAmb/probit.svg';

const Home = () => {
  const [pools, setPools] = useState([]);
  const { pathname } = useLocation();
  const { logIn } = useLogIn();
  const arcadiaStaking = [
    {
      src: secondSectionIcon1,
      text: 'Staking starts from 1000 AMB',
    },
    {
      src: secondSectionIcon2,
      text: 'Secure the network and earn rewards.',
    },
    {
      src: secondSectionIcon3,
      text: 'Rewards are distributed every 6 hours',
    },
    {
      src: secondSectionIcon4,
      text: 'Unstake at any time',
    },
  ];
  const whereToByAmb = [
    {
      src: BinanceIcon,
      text: 'Binance',
    },
    {
      src: KuCoinIcon,
      text: 'KuCoin',
    },
    {
      src: WhiteBITIcon,
      text: 'WhiteBIT',
    },
    {
      src: probitIcon,
      text: 'ProBit',
    },
  ];
  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };

  useEffect(() => {
    getPools();
  }, []);

  return (
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
        <div
          role="presentation"
          className="connect-btn btn black"
          onClick={logIn}
        >
          <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
            <span
              style={{
                paddingLeft: 5,
                fontFamily: ' Neue Machina',
                whiteSpace: 'nowrap',
              }}
            >
              {CONNECT_TEXT}
            </span>
          </Paragraph>
        </div>
      </div>
      <div className="home__second-section">
        <div className="container">
          <div>
            <h2 className="section-heading">Arcadia</h2>
          </div>
          <p className="home__second-section--secondary">
            Simplified staking on the Ambrosus network.
          </p>
          <div className="items-container">
            {arcadiaStaking.map((block) => (
              <div className="items-container__item">
                <ReactSVG src={block.src} wrapper="span" />
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="btn-group">
          {' '}
          <button type="button" className="btn white " onClick={logIn}>
            ↖ Start Staking
          </button>
        </div>
      </div>
      <div className="home__third-section">
        <div className="back-figure3" />
        <div className="back-figure4" />
        <div className="container">
          <div>
            <h2 className="section-heading">Where to buy AMB?</h2>
          </div>
          <div className="items-container">
            {whereToByAmb.map((block) => (
              <div className="items-container__item">
                <ReactSVG src={block.src} wrapper="span" />
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </div>
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
      <div className="home__faq">
        <CollapsedList />
      </div>
    </div>
  );
};

export default Home;
