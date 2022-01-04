/*eslint-disable*/
// TODO add WalletConnectConnector
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/layouts/Header';
import { useMobileDetect, useTimeout } from '../../hooks';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT } from '../../services/numbers';
import {
  bounce,
  connectorsByName,
  ethereum,
  PoolsContext,
  STAKING_PAGE,
} from '../../config';
import appStore from '../../store/app.store';
import { Loader } from '../../components/Loader';
import { collapsedReducer } from '../../utils/reducers';
import { changeNetwork, debugLog } from '../../utils/helpers';
import StakingItem from '../../components/StakingItem';
import { ReactSVG } from 'react-svg';
import headerLogoSvg from 'assets/svg/header-logo.svg';
import Menu from 'pages/Home/components/Menu';

const NotSupported = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../../components/NotSupported'),
);
const InfoBlock = React.lazy(() =>
  import(/* webpackPrefetch: true */ './components/InfoBlock'),
);

const Staking = observer(() => {
  const { account, activate, chainId } = useWeb3React();
  const [activeExpand, setActiveExpand] = useState(-1);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [checkNetworkChain, setCheckNetworkChain] = useState(false);
  const [pools, getPools] = useContext(PoolsContext);
  const { isDesktop } = useMobileDetect();

  useTimeout(() => setCheckNetworkChain(true), 1500);

  useEffect(() => {
    debugLog('Staking render useEffect');
    // TODO change here when will do WalletConnect
    activate(connectorsByName.Injected);
    getPools();
    if (ethereum) {
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        window.addEventListener('focus', changeNetwork);
      }
    }
  }, [appStore.refresh]);

  return (
    <>
      <Sidebar pageWrapId="root" outerContainerId="root" />
      {checkNetworkChain && chainId !== +process.env.REACT_APP_CHAIN_ID && (
        <React.Suspense fallback={<div />}>
          <NotSupported key={chainId} onclick={changeNetwork} />
        </React.Suspense>
      )}
      <div className="layout">
        <Header />
        {/*<div className="home__top">*/}
        {/*  <div className="home__top--header">*/}
        {/*    <Link to="/">*/}
        {/*      <div className="logo">*/}
        {/*        <ReactSVG src={headerLogoSvg} wrapper="span"/>*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*    <Menu/>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="content" style={{ marginTop: 90 }}>
          <div className="page">
            {pools.length > 0 ? (
              <RenderItems>
                <React.Suspense fallback={<div />}>
                  <InfoBlock account={account} poolsArr={pools} />
                </React.Suspense>
                <div className="staking wrapper">
                  <>
                    <div className="staking__header">
                      <div>Pool</div>
                      {isDesktop && <div>My Stake</div>}
                      <div>Total pool stake</div>
                      <div>APY</div>
                      <div style={{ marginRight: -20 }} />
                    </div>
                    {pools
                      .filter(
                        (pool) =>
                          pool.active || pool.totalStakeInAMB.gte(FIXED_POINT),
                      )
                      .sort((a, b) => b.active - a.active)
                      .map((item, index) => (
                        <StakingItem
                          dispatch={dispatch}
                          activeExpand={activeExpand}
                          setActiveExpand={setActiveExpand}
                          key={item.contractName}
                          index={index}
                          state={state}
                          expand
                          hasChain={+process.env.REACT_APP_CHAIN_ID === chainId}
                          comingSoon={!item.abi}
                          lazy
                          poolInfo={item}
                        />
                      ))}
                  </>
                </div>
              </RenderItems>
            ) : (
              <div style={{ paddingTop: 100 }}>
                <Loader types="spokes" />
              </div>
            )}
            <ToastContainer transition={bounce} />
          </div>
        </div>
      </div>
    </>
  );
});

export default React.memo(Staking);
