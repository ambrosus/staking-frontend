import React, { useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { BigNumber } from 'ethers';
import {
  FIXEDPOINT,
  formatRounded,
  StakingWrapper,
} from '../services/staking.wrapper';
import { connectorsByName, ethereum } from '../config';
import { changeNetwork, collapsedReducer } from '../utils/helpers';
import appStore from '../store/app.store';

const useStaking = () => {
  const { account, active, activate, chainId, library } = useWeb3React();
  /*eslint-disable*/
  const [totalStaked, setTotalStaked] = useState(null);
  const [activeExpand, setActiveExpand] = useState(-1);
  const [totalReward, setTotalReward] = useState(null);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(null);
  const [totalStakedInUsd, setTotalStakedInUsd] = useState(null);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);
  const mounted = useRef(false);
  let signer;

  const getDataFromProvider = async () => {
    await activate(connectorsByName['Injected']);
    signer = library !== undefined && library.getSigner();
    if (signer) {
      const stakingWrapper = new StakingWrapper(signer);
      const poolsArr = await stakingWrapper.getPools();
      setPools(poolsArr);
      const poolsRewards = [];
      const myTotalStake = [];
      poolsArr.map(async (pool) => {
        const { estAR, myStakeInAMB } = await stakingWrapper.getPoolData(
          pool.index,
        );
        if (estAR) {
          poolsRewards.push(estAR);
          const rewardInAmb =
            poolsRewards?.length > 0 &&
            poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
          setTotalReward(rewardInAmb > 0 && rewardInAmb);
          const esdSum =
            appStore.tokenPrice &&
            poolsRewards?.length > 0 &&
            poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
          setTotalRewardInUsd(
            esdSum &&
              appStore.tokenPrice &&
              esdSum > 0 &&
              esdSum * appStore.tokenPrice,
          );
        }
        if (myStakeInAMB) {
          myTotalStake.push(myStakeInAMB);
          if (myTotalStake?.length > 0) {
            const totalStakeSum = myTotalStake.reduceRight(
              (acc, curr) => acc.add(curr),
              BigNumber.from('0'),
            );
            setTotalStaked(
              totalStakeSum && totalStakeSum.gte(FIXEDPOINT) && totalStakeSum,
            );
            setTotalStakedInUsd(
              totalStakeSum &&
                appStore.tokenPrice &&
                totalStakeSum.gte(FIXEDPOINT) &&
                formatRounded(totalStakeSum) * appStore.tokenPrice,
            );
          }
        }
      });
    }
  };

  useEffect(() => {
    mounted.current = true;
    if (mounted.current) {
      getDataFromProvider();
      if (ethereum && ethereum.isMetaMask) {
        if (
          chainId !== undefined &&
          chainId !== +process.env.REACT_APP_CHAIN_ID
        ) {
          window.addEventListener('focus', async () => {
            await changeNetwork();
          });
        }
      }
    }
  }, [appStore.refresh, chainId, active, account]);

  return {
    account,
    chainId,
    totalStaked,
    activeExpand,
    setActiveExpand,
    totalReward,
    totalRewardInUsd,
    state,
    dispatch,
    pools,
    changeNetwork,
    totalStakedInUsd,
  };
};
export default useStaking;
