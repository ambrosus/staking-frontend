import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useLocation } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import { providers, utils } from 'ethers';

import P from '../../components/P';
import MetamaskConnect from '../../components/MetamaskConnect';
import StackItem from '../../components/StakingItem';
import { ethereum, MAIN_PAGE, menuLinks } from '../../utils/constants';

import CollapsedList from '../../components/CollapsedList';
import ComingSoonPool from '../../components/ComingSoonPool';
import NotSupported from '../../components/NotSupported';
import { StakingWrapper } from '../../services/staking.wrapper';
import { Loader } from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import RenderItems from '../../components/StakingItem/RenderItems';

import headerLogoSvg from '../../assets/svg/header-logo.svg';

const Home = () => {
  const [userChainId, setUserChainId] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [pools, setPools] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        try {
          ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `${utils.hexlify(+process.env.REACT_APP_CHAIN_ID)}`,
                  chainName: 'Ambrosus Test',
                  nativeCurrency: {
                    name: 'AMB',
                    symbol: 'AMB',
                    decimals: 18,
                  },
                  rpcUrls: [`${process.env.REACT_APP_RPC_URL}`],
                  blockExplorerUrls: [
                    `${process.env.REACT_APP_BLOCK_EXPLORER_URL}`,
                  ],
                },
              ],
            })
            .then((e) => {
              if (e) {
                setCorrectNetwork(true);
              }
            });
        } catch (e) {
          if (e) {
            setCorrectNetwork(false);
          }
        }
      }
    }
  };
  const initEthereumNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      getPulls();
      const provider = new providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId) {
        setUserChainId(chainId);
      }
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        setCorrectNetwork(false);
      }
    } else {
      getPulls();
    }
  };
  const getPulls = async () => {
    const stakingWrapper = new StakingWrapper();
    const poolsArr = stakingWrapper && (await stakingWrapper.getPools());
    if (poolsArr) {
      setPools(poolsArr);
    }
  };
  useEffect(() => {
    initEthereumNetwork();
    return () => initEthereumNetwork();
  }, []);
  const menu = (
    <div className="menu">
      {menuLinks.map((link) =>
        link.route ? (
          <Link to={link.href} className="menu__bold" key={link.href}>
            <P
              style={{ color: 'white', fontWeight: '500' }}
              className="active"
              size="xs-500"
            >
              {link.title}
            </P>
          </Link>
        ) : (
          <a target={link.taget && '_blank'} href={link.href} key={link.href}>
            <P size="xs-500">{link.title}</P>
          </a>
        ),
      )}
    </div>
  );
  const poolsData = pools.length > 0 && (
    <>
      <div
        className="staking__header Halvar_Breit "
        style={{
          color: pathname === MAIN_PAGE && '#FFFFFF',
        }}
      >
        <div className="staking__header__clearfix-pool">Pool</div>
        <div>Total pool stake</div>
        <div className="staking__header__clearfix-apy">APY</div>
        <div style={{ maxWidth: 160, minWidth: 160 }} />
      </div>
      <div className="staking__pools Halvar_Breit">
        <RenderItems>
          {pools && pools.length && (
            <>
              {pools.map(
                (item) =>
                  item.active && (
                    <StackItem
                      hasChain={+process.env.REACT_APP_CHAIN_ID === userChainId}
                      key={item.contractName}
                      poolInfo={item}
                      expand={false}
                    />
                  ),
              )}
              {pools.map(
                (coming) =>
                  !coming.active && (
                    <ComingSoonPool
                      loading
                      key={coming.contractName}
                      poolInfo={coming}
                      lazy
                    />
                  ),
              )}
            </>
          )}
        </RenderItems>
      </div>
    </>
  );
  return (
    <>
      {!correctNetwork && <NotSupported onclick={() => changeNetwork()} />}
      <div className="home" id="home">
        <Sidebar pageWrapId="root" outerContainerId="root" />
        <ReactNotifications />
        <div className="back-figure1" />
        <div className="back-figure2" />
        <div className="home__top">
          <div className="home__top--header">
            <div className="logo">
              <ReactSVG src={headerLogoSvg} wrapper="span" />
            </div>
            {menu}
          </div>
        </div>
        <div className="home__top--info">
          <div className="info-text">
            <P
              size="xxxl-500"
              style={{
                paddingBottom: 10,
                fontFamily: 'Halvar Breitschrift,sans-serif',
              }}
            >
              Get AMB Rewards. No node needed.
            </P>
            <P size="l-500-white">
              Stake your AMB and receive up to
              <span style={{ color: '#1ACD8C' }}> 35% APY</span> in a few
              clicks.
            </P>
          </div>
          <MetamaskConnect />
        </div>
        <div className="staking">
          {poolsData}
          <div className="staking__loader">
            {!poolsData && <Loader types="spokes" />}
          </div>
        </div>
        <div className="faq">
          <CollapsedList />
        </div>
      </div>
    </>
  );
};

export default Home;
