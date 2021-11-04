import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import { ethers } from 'ethers';

import P from '../../components/P';
import MetamaskConnect from '../../components/MetamaskConnect';
import StackItem from '../../components/StakingItem';
import { ethereum } from '../../utils/constants';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import CollapsedList from '../../components/CollapsedList';
import ComingSoonPool from '../../components/ComingSoonPool';
import NotSupported from '../../components/NotSupported';
import { StakingWrapper } from '../../services/staking.wrapper';
import { Loader } from '../../components/Loader';

const Home = () => {
  const [userChainId, setUserChainId] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [pools, setPools] = useState([]);
  const stakingWrapper = new StakingWrapper();
  //  stakingWrapper;

  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        try {
          ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `${ethers.utils.hexlify(
                    +process.env.REACT_APP_CHAIN_ID,
                  )}`,
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
          setCorrectNetwork(false);
        }
      }
    }
  };
  const initEthereumNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        setCorrectNetwork(false);
      }
      setUserChainId(chainId);
    }
  };
  const getPulls = async () => {
    const poolsArr = await stakingWrapper.getPools();
    setPools(poolsArr);
  };
  useEffect(() => {
    getPulls();
    initEthereumNetwork();
  }, [correctNetwork]);
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
        <div style={{ marginLeft: -36 }}>Total pool stake</div>
        <div className="staking__header__clearfix-apy">APY</div>
        <div style={{ maxWidth: 157 }}></div>
      </div>
      <div className="staking__pools">
        {pools &&
          pools.map((pool) => {
            if (pool.active === true) {
              return (
                <StackItem
                  hasChain={+process.env.REACT_APP_CHAIN_ID === userChainId}
                  key={pool.contractName}
                  poolInfo={pool}
                  lazy
                  expand={false}
                />
              );
            }
            return (
              <ComingSoonPool key={pool.contractName} poolInfo={pool} lazy />
            );
          })}
      </div>
    </>
  );
  return (
    <>
      {!correctNetwork && <NotSupported onclick={changeNetwork} />}
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
                You don&apos;t want to raise Node? Fine, steak your AMB and get
                up to 55% APY
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
