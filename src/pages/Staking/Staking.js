import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { toJS } from 'mobx';

import StakingItem from '../../components/StakingItem';
import Header from '../../components/layouts/Header';
import NotSupported from '../../components/NotSupported';
import { useTimeout } from '../../hooks';
import InfoBlock from './components/InfoBlock';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT } from '../../services/numbers';
import { bounce, connectorsByName, ethereum } from '../../config';
import appStore from '../../store/app.store';
import { Loader } from '../../components/Loader';
import { changeNetwork, collapsedReducer, debugLog } from '../../utils/helpers';

const Staking = observer(() => {
  const { account, activate, chainId } = useWeb3React();
  const [activeExpand, setActiveExpand] = useState(() => -1);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState(() => []);
  const [checkNetworkChain, setCheckNetworkChain] = useState(() => false);

  const getDataFromProvider = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };

  useTimeout(() => setCheckNetworkChain(true), 1500);

  useEffect(() => {
    debugLog('Staking render useEffect');
    activate(connectorsByName.Injected);
    getDataFromProvider();
    if (ethereum?.isMetaMask) {
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        window.addEventListener('focus', changeNetwork);
      }
    }
  }, [appStore.refresh]);

  return (
    <>
      {checkNetworkChain && chainId !== +process.env.REACT_APP_CHAIN_ID && (
        <NotSupported onclick={changeNetwork} />
      )}
      <div className="layout">
        <Header />
        <div className="content">
          <div className="page">
            {pools.length > 0 ? (
              <RenderItems>
                <InfoBlock account={account} poolsArr={pools} />
                <div className="staking wrapper">
                  <>
                    <div className="staking__header">
                      <div>Pool</div>
                      <div>My Stake</div>
                      <div>Total pool stake</div>
                      <div>APY</div>
                      <div style={{ marginRight: -45 }} />
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

export default Staking;
