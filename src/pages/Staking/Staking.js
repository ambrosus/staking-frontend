/*eslint-disable*/
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer, cssTransition } from 'react-toastify';
import StakingItem from '../../components/StakingItem';
import appStore from '../../store/app.store';
import ComingSoonPool from '../../components/ComingSoonPool';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import NotSupported from '../../components/NotSupported';
import useStaking from '../../utils/useStaking';
import InfoBlock from './components/InfoBlock';

const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});
const Staking = observer(() => {
  const {
    account,
    userChainId,
    totalStaked,
    activeExpand,
    setActiveExpand,
    correctNetwork,
    totalReward,
    totalRewardInUsd,
    state,
    dispatch,
    pools,
    changeNetwork,
  } = useStaking();

  const infoBlock = (
    <InfoBlock
      account={account}
      totalReward={totalReward}
      totalRewardInUsd={totalRewardInUsd}
      totalStaked={totalStaked}
    />
  );
  const stakingBody = (
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
          {pools.map((item, index) =>
            item.active ? (
              <StakingItem
                dispatch={dispatch}
                activeExpand={activeExpand}
                setActiveExpand={setActiveExpand}
                key={item.contractName}
                index={index}
                state={state}
                expand
                hasChain={+process.env.REACT_APP_CHAIN_ID === userChainId}
                comingSoon={!item?.abi}
                lazy
                poolInfo={item}
              />
            ) : (
              <ComingSoonPool key={item.contractName} poolInfo={item} lazy />
            ),
          )}
        </>
      )}
    </div>
  );
  return appStore.auth ? (
    <>
      {!correctNetwork && <NotSupported onclick={changeNetwork} />}
      <div className="layout">
        <Header />
        <div className="content">
          <div className="page">
            {infoBlock}
            {stakingBody}
            <ToastContainer transition={bounce} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
});

export default React.memo(Staking);
