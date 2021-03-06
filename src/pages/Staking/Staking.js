import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import { ToastContainer } from 'react-toastify';
import { useMobileDetect, useTimeout } from 'hooks';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT } from '../../services/numbers';
import { bounce, ethereum, MAIN_PAGE, PoolsContext, tooltips } from 'config';
import appStore from 'store/app.store';
import { Loader } from '../../components/Loader';
import { collapsedReducer } from 'utils/reducers';
import { changeNetwork, debugLog } from 'utils/helpers';
import StakingItem from '../../components/StakingItem';
import InfoBlock from './components/InfoBlock';
import ReactTooltip from 'react-tooltip';
import { ReactSVG } from 'react-svg';
import errorOutlineIcon from 'assets/svg/error_outline.svg';
import { Header } from 'components/layouts/Header';
import { useLocation } from 'react-router-dom';


const Staking = observer(() => {
  const { account, chainId } = useWeb3React();
  const [activeExpand, setActiveExpand] = useState(-1);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [checkNetworkChain, setCheckNetworkChain] = useState(false);
  const [pools, getPools] = useContext(PoolsContext);
  const { isDesktop } = useMobileDetect();
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_PAGE;

  useTimeout(() => setCheckNetworkChain(true), 1500);

  useEffect(() => {
    debugLog('Staking render useEffect');
    getPools();
    if (ethereum) {
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        window.addEventListener('focus', changeNetwork);
      }
    }
  }, [appStore.refresh]);

  return (
    <>
      {checkNetworkChain && chainId !== +process.env.REACT_APP_CHAIN_ID && (
        <React.Suspense fallback={<div />}>
          <NotSupported key={chainId} />
        </React.Suspense>
      )}
      <div className="layout">
        <div
          className="staking_top-left"
          style={{ opacity: !isDesktop && 0.5 }}
        />
        <div
          className="staking_top-right"
          style={{ opacity: !isDesktop && 0.5 }}
        />
        <Header />
        <div className="content" style={{ marginTop: 90 }}>
          <div className="page">
            {pools.length > 0 ? (
              <RenderItems>
                <InfoBlock account={account} poolsArr={pools} />
                <div className="staking wrapper">
                  <>
                    {!isDesktop && (
                      <div className="staking__header__title">
                        Choose your staking pool
                      </div>
                    )}
                    <div className="staking__header">
                      <div style={{ fontSize: 18 }}>Pool</div>
                      {isMainPage ? (
                        <div>Max Stake</div>
                      ) : (
                        <div>
                          {isDesktop ? (
                            <div>My Stake/Max Stake</div>
                          ) : (
                            <div>My Stake</div>
                          )}
                        </div>
                      )}
                      <ReactTooltip id="max-total-staked">
                        {tooltips.totalMaxStaked}
                      </ReactTooltip>
                      {isDesktop && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          data-for="max-total-staked"
                        >
                          Total Max Stake&nbsp;
                          <ReactSVG
                            data-tip
                            data-for="total-staked"
                            src={errorOutlineIcon}
                            wrapper="span"
                          />
                        </div>
                      )}
                      {isDesktop && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          Total pool stake{' '}
                        </div>
                      )}
                      <div style={{ fontSize: 18 }}>APY</div>
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
