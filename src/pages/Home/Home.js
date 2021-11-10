import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import { providers, utils } from 'ethers';

import P from '../../components/P';
import MetamaskConnect from '../../components/MetamaskConnect';
import StackItem from '../../components/StakingItem';
import { ethereum } from '../../utils/constants';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import headerImage from '../../assets/images/header-image.svg';
import CollapsedList from '../../components/CollapsedList';
import ComingSoonPool from '../../components/ComingSoonPool';
import NotSupported from '../../components/NotSupported';
import { StakingWrapper } from '../../services/staking.wrapper';
import { Loader } from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import RenderItems from '../../components/StakingItem/RenderItems';

const Home = () => {
  const [userChainId, setUserChainId] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [pools, setPools] = useState([]);

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
      if (chainId && chainId !== +process.env.REACT_APP_CHAIN_ID) {
        setCorrectNetwork(false);
      }
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
  }, []);
  const menu = (
    <div className="menu">
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
    </div>
  );
  const poolsData = pools.length > 0 && (
    <>
      <div className="staking__header">
        <div className="staking__header__clearfix-pool">Pool</div>
        <div>Total pool stake</div>
        <div className="staking__header__clearfix-apy">APY</div>
        <div style={{ maxWidth: 160, minWidth: 160 }} />
      </div>
      <div className="staking__pools">
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
        <div className="home__top">
          <div className="home__top--header">
            <div className="logo">
              <ReactSVG src={headerLogoSvg} wrapper="span" />
            </div>
            {menu}
            <MetamaskConnect />
          </div>
          <div className="home__top--info-mobile">
            <div className="info-image">
              <ReactSVG src={headerImage} wrapper="span" />
            </div>
            <div className="info-text">
              <P size="xxxl-500" style={{ paddingBottom: 10 }}>
                Get AMB Rewards. No node needed.
              </P>
              <P size="l-500-white">
                Stake your AMB and receive up to 30% APY in a few clicks.
              </P>
            </div>
            <MetamaskConnect />
          </div>
          <div className="home__top--info">
            <div className="info-image" />
            <div className="info-text">
              <P size="xxxl-500" style={{ paddingBottom: 10 }}>
                Get AMB Rewards. No node needed.
              </P>
              <P size="l-500-white">
                Stake your AMB and receive up to 30% APY in a few clicks.
              </P>
            </div>
          </div>
        </div>
        <div className="staking">
          {poolsData}
          <div className="staking__loader">{!poolsData && <Loader />}</div>
        </div>
        <div className="faq">
          <CollapsedList />
        </div>
      </div>
    </>
  );
};

export default Home;
