import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import StakingItem from '../../components/StakingItem';
import Header from '../../components/layouts/Header';
import NotSupported from '../../components/NotSupported';
import { useTimeout } from '../../hooks';
import InfoBlock from './components/InfoBlock';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT, StakingWrapper } from '../../services/staking.wrapper';
import { bounce, connectorsByName, ethereum } from '../../config';
import appStore from '../../store/app.store';
import { Loader } from '../../components/Loader';
import { changeNetwork, collapsedReducer } from '../../utils/helpers';

const Staking = observer(() => {
  const { account, activate, chainId, library } = useWeb3React();
  const [activeExpand, setActiveExpand] = useState(-1);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);
  let signer;
  let stakingWrapper;

  const getDataFromProvider = async () => {
    signer = library !== undefined && library.getSigner();
    if (signer) {
      if (appStore.stakingWrapper !== undefined) {
        const poolsArr = await appStore.stakingWrapper.getPools();
        setPools(poolsArr);
      } else {
        stakingWrapper = new StakingWrapper(signer);
        appStore.setStakingWrapper(stakingWrapper);
        const poolsArr = await appStore.stakingWrapper.getPools();
        setPools(poolsArr);
      }
    }
  };

  const checkNetwork = async () => {
    await changeNetwork();
  };
  useEffect(() => {
    activate(connectorsByName.Injected);
    getDataFromProvider();
    if (ethereum && ethereum.isMetaMask) {
      if (
        chainId !== undefined &&
        chainId !== +process.env.REACT_APP_CHAIN_ID
      ) {
        window.addEventListener('focus', checkNetwork);
      }
    }
  }, [appStore.refresh, chainId, account]);

  const [checkNetworkChain, setCheckNetworkChain] = useState(false);
  useTimeout(() => setCheckNetworkChain(true), 1500);
  return (
    <>
      {checkNetworkChain && chainId !== +process.env.REACT_APP_CHAIN_ID && (
        <NotSupported onclick={changeNetwork} />
      )}
      <div className="layout">
        <Header />
        <div className="content">
          <div className="page">
            {appStore.stakingWrapper !== undefined && pools.length > 0 ? (
              <>
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
                    <RenderItems>
                      {pools
                        .filter(
                          (pool) =>
                            pool.active || pool.totalStake.gte(FIXED_POINT),
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
                            hasChain={
                              +process.env.REACT_APP_CHAIN_ID === chainId
                            }
                            comingSoon={!item.abi}
                            lazy
                            poolInfo={item}
                          />
                        ))}
                    </RenderItems>
                  </>
                </div>
              </>
            ) : (
              <div style={{ paddingTop: 40 }}>
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
