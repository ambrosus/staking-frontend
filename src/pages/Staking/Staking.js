import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import { ToastContainer } from 'react-toastify';
import { Header } from '../../components/layouts/Header';
import { useMobileDetect, useTimeout } from 'hooks';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT } from '../../services/numbers';
import { bounce, ethereum, PoolsContext } from 'config';
import appStore from 'store/app.store';
import { Loader } from '../../components/Loader';
import { collapsedReducer } from 'utils/reducers';
import { changeNetwork, debugLog } from 'utils/helpers';
import StakingItem from '../../components/StakingItem';
import InfoBlock from './components/InfoBlock';

const NotSupported = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../../components/NotSupported'),
);

const Staking = observer(() => {
  const { account, chainId } = useWeb3React();
  const [activeExpand, setActiveExpand] = useState(-1);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [checkNetworkChain, setCheckNetworkChain] = useState(false);
  const [pools, getPools] = useContext(PoolsContext);
  const { isDesktop } = useMobileDetect();

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
        <Header />
        <div className="content" style={{ marginTop: 90 }}>
          <div className="page">
            {pools.length > 0 ? (
              <RenderItems>
                <InfoBlock account={account} poolsArr={pools} />
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
