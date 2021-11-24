import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';

import StakingItem from '../../components/StakingItem';
import Header from '../../components/layouts/Header';
import NotSupported from '../../components/NotSupported';
import { useStaking, useTimeout } from '../../hooks';
import InfoBlock from './components/InfoBlock';
import RenderItems from '../../components/RenderItems';
import { FIXED_POINT } from '../../services/staking.wrapper';
import { bounce } from '../../config';

const Staking = observer(() => {
  const {
    account,
    chainId,
    totalStaked,
    activeExpand,
    setActiveExpand,
    totalReward,
    totalRewardInUsd,
    totalStakedInUsd,
    state,
    dispatch,
    pools,
    changeNetwork,
  } = useStaking();
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
            <InfoBlock
              totalStakedInUsd={totalStakedInUsd}
              account={account}
              totalReward={totalReward}
              totalRewardInUsd={totalRewardInUsd}
              totalStaked={totalStaked}
            />
            <div className="staking wrapper">
              {pools.length > 0 && (
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
                          hasChain={+process.env.REACT_APP_CHAIN_ID === chainId}
                          comingSoon={!item.abi}
                          lazy
                          poolInfo={item}
                        />
                      ))}
                  </RenderItems>
                </>
              )}
            </div>
            <ToastContainer transition={bounce} />
          </div>
        </div>
      </div>
    </>
  );
});

export default React.memo(Staking);
