import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { store as alertStore } from 'react-notifications-component';
import { useWeb3React } from '@web3-react/core';
import appStore from '../../store/app.store';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert';

import { StakingWrapper } from '../../services/staking.wrapper';
import { ethereum, MAIN_PAGE } from '../../config';
import StakingItemBody from './StakingItemBody';

import ComingSoonPool from '../ComingSoonPool';

const StakingItem = ({
  expand = false,
  activeExpand,
  setActiveExpand,
  state = 0,
  dispatch,
  index = -1,
  poolInfo,
}) => {
  const { library } = useWeb3React();
  const [myStake, setMyStake] = useState(null);
  const [totalStake, setTotalStake] = useState(null);
  const [APYOfPool, setAPYOfPool] = useState('');
  const history = useHistory();
  const { pathname } = history.location;

  const updateState = async () => {
    const loggedInRefresh = async () => {
      if (library) {
        const singer = library.getSigner();
        if (singer) {
          const wrapper = new StakingWrapper(singer);
          appStore.setStakingWrapper(wrapper);
          if (appStore.stakingWrapper !== undefined) {
            const { totalStakeInAMB, myStakeInAMB, poolAPY } =
              await appStore.stakingWrapper.getPoolData(poolInfo.index);
            if (totalStakeInAMB && myStakeInAMB && poolAPY) {
              setMyStake(myStakeInAMB);
              setAPYOfPool(poolAPY);
              setTotalStake(totalStakeInAMB);
            }
          }
        }
      }
    };

    const loggedOutRefresh = async () => {
      const stakingWrapper = new StakingWrapper();
      const { totalStakeInAMB, poolAPY } = await stakingWrapper.getPoolData(
        poolInfo.index,
      );
      if (poolAPY && totalStakeInAMB) {
        setAPYOfPool(poolAPY);
        setTotalStake(totalStakeInAMB);
      }
    };
    const refreshProc = library ? loggedInRefresh : loggedOutRefresh;
    refreshProc();
  };

  useEffect(() => {
    updateState();
    if (ethereum && !ethereum.isMetaMask) {
      alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    return () => updateState();
  }, [appStore.refresh]);

  return poolInfo.active ? <div
      role="presentation"
      className="stack-item"
      style={{
        background: pathname === MAIN_PAGE && '#262626',
        boxShadow: pathname === MAIN_PAGE && '0px 6px 10px rgba(0, 0, 0, 0.25)',
        color:
          pathname === MAIN_PAGE &&
          !myStake &&
          !poolInfo.active &&
          'rgb(191 201 224)',
      }}
    >
      <StakingItemBody
        myStake={myStake}
        totalStake={totalStake}
        APYOfPool={APYOfPool}
        poolInfo={poolInfo}
        expand={expand}
        activeExpand={activeExpand}
        setActiveExpand={setActiveExpand}
        state={state}
        dispatch={dispatch}
        index={index}
      />
    </div>
};

StakingItem.propTypes = {
  poolInfo: PropTypes.object,
  dispatch: PropTypes.func,
  expand: PropTypes.bool,
  state: PropTypes.array,
  index: PropTypes.number,
  activeExpand: PropTypes.number,
  setActiveExpand: PropTypes.func,
};
export default StakingItem;
