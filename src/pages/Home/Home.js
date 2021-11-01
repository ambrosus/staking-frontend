import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import { ethers } from 'ethers';

import P from '../../components/P';
import MetamaskConnect from '../../components/MetamaskConnect';
import StackItem from '../Stacking/StackingItem';
import { pools } from '../../utils/constants';

import headerLogoSvg from '../../assets/svg/header-logo.svg';
import CollapsedList from '../../components/CollapsedList';
import ComingSoonPool from '../../components/ComingSoonPool';

const Home = () => {
  const { ethereum } = window;
  const [userChainId, setUserChainId] = useState(null);
  const initEthereumNetwork = async () => {
    try {
      if (ethereum && ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const { chainId } = await provider.getNetwork();
        setUserChainId(chainId);
        if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
          ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: `${ethers.utils.hexlify(
                  +process.env.REACT_APP_CHAIN_ID,
                )}`,
              },
            ],
          });
        }
      }
    } catch (e) {
      if (e) {
        ethereum.request({
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
        });
      }
    }
  };

  useEffect(async () => {
    window.addEventListener('focus', function () {
      initEthereumNetwork();
    });
  }, []);
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
        {pools.map((pool) => {
          if (pool.active === true) {
            return (
              <StackItem
                hasChain={+process.env.REACT_APP_CHAIN_ID === userChainId}
                key={pool.contractName}
                poolInfo={pool}
                lazy
              />
            );
          }
          return (
            <ComingSoonPool key={pool.contractName} poolInfo={pool} lazy />
          );
        })}
      </div>
      <div className="faq">
        <CollapsedList />
      </div>
    </div>
  );
};

export default Home;
