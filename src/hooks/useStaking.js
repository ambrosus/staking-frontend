import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { BigNumber, utils } from 'ethers';
import { formatRounded, StakingWrapper } from '../services/staking.wrapper';
import { ethereum, network } from '../utils/constants';
import { collapsedReducer } from '../utils/helpers';
import appStore from '../store/app.store';
import { connectorsByName } from '../utils/connectors';

const useStaking = () => {
  const { account, active, activate, chainId, library } = useWeb3React();
  /*eslint-disable*/
  const [totalStaked, setTotalStaked] = useState(BigNumber.from('0'));
  const [activeExpand, setActiveExpand] = useState(-1);
  const [requestNetworkChange, setRequestNetworkChange] = useState(false);
  const [totalReward, setTotalReward] = useState(0);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [totalStakedInUsd, setTotalStakedInUsd] = useState(0);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);
  let signer;
  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        setCorrectNetwork(false);
        return         setRequestNetworkChange(true);

      }
    }
  };
  const checkEthereumNetwork = async () => {
    const { chainId } = await library.getNetwork();
    if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };
  const getDataFromProvider = async () => {
    await activate(connectorsByName['Injected']);
    checkEthereumNetwork()
    if (chainId) {
      window.addEventListener('focus', () => {
        changeNetwork();
      });
    }
    if (correctNetwork && active) {
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
            setTotalReward(rewardInAmb);
            const esdSum =
              appStore.tokenPrice &&
              poolsRewards?.length > 0 &&
              poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
            setTotalRewardInUsd(
              esdSum && appStore.tokenPrice && esdSum * appStore.tokenPrice,
            );
          }
          if (myStakeInAMB) {
            myTotalStake.push(myStakeInAMB);
            if (myTotalStake?.length > 0) {
              const totalStakeSum = myTotalStake.reduceRight(
                (acc, curr) => acc.add(curr),
                BigNumber.from('0'),
              );
              setTotalStaked(totalStakeSum);
              setTotalStakedInUsd(
                totalStakeSum &&
                  appStore.tokenPrice &&
                  formatRounded(totalStakeSum) * appStore.tokenPrice,
              );
            }
          }
        });
      }
    }
  };
  useEffect(() => {
    if (requestNetworkChange) {
      try {
        ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `${utils.hexlify(
                      +process.env.REACT_APP_CHAIN_ID,
                  )}`,
                  chainName: `${network}`,
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
            })
            .then((e) => {
              if (e) {
                setCorrectNetwork(true);
                setRequestNetworkChange(false);
              }
            });
      } catch (e) {
        setCorrectNetwork(false);
      }
    }

    if (active && account) {
      getDataFromProvider();
    }
    return () => getDataFromProvider();
  }, [appStore.refresh, active]);

  return {
    account,
    userChainId: chainId,
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
    totalStakedInUsd,
  };
};
export default useStaking;
