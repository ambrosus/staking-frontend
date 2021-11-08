import React, { useEffect, useState } from 'react';
import { BigNumber, providers, utils } from 'ethers';
import { StakingWrapper } from '../services/staking.wrapper';
import { ethereum } from './constants';
import appStore from '../store/app.store';
import collapsedReducer from './collapsedReducer';
import storageService from '../services/storage.service';

const useStaking = () => {
  const [account, setAccount] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [activeExpand, setActiveExpand] = useState(-1);
  const [totalReward, setTotalReward] = useState(null);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(null);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [requestNetworkChange, setRequestNetworkChange] = useState(true);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);
  let provider;
  let signer;

  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      provider = new providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
        setCorrectNetwork(false);
        setRequestNetworkChange(true);
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
                    chainName: 'Ambrosus Test',
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
      }
    }
  };
  const checkEthereumNetwork = async () => {
    provider = new providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    if (chainId !== +process.env.REACT_APP_CHAIN_ID) {
      setCorrectNetwork(false);
      setRequestNetworkChange(true);
    } else {
      setCorrectNetwork(true);
      setRequestNetworkChange(false);
    }
    setUserChainId(chainId);
  };

  useEffect(async () => {
    let interval;

    let mounetd = true;
    if (mounetd) {
      interval = setInterval(() => appStore.setRefresh(), 70000);
      if (ethereum && ethereum.isMetaMask) {
        checkEthereumNetwork();
        window.addEventListener('focus', () => {
          changeNetwork();
        });
      }
      if (correctNetwork && appStore.auth) {
        provider = new providers.Web3Provider(ethereum);
        const { chainId } = provider && provider.getNetwork();
        setUserChainId(chainId);
        signer = provider && provider.getSigner();
        if (provider && signer) {
          if (storageService.get('auth') === true) {
            const stakingWrapper = signer && new StakingWrapper(signer);
            provider.listAccounts().then((accounts) => {
              const defaultAccount = accounts[0];
              if (defaultAccount) {
                setAccount(defaultAccount);
              }
            });
            const poolsArr = await stakingWrapper.getPools();
            setPools(poolsArr && poolsArr);
            const poolsRewards = [];
            const myTotalStake = [];
            /* eslint-disable-next-line */
            for (const pool of poolsArr) {
              if (pool.active) {
                const { estDR, myStakeInAMB } =
                  /* eslint-disable-next-line */
                  await stakingWrapper.getPoolData(pool.index);
                poolsRewards.push(estDR && estDR);
                const rewardInAmb =
                  poolsRewards?.length > 1 &&
                  poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
                setTotalReward(rewardInAmb && rewardInAmb);
                const esdSum =
                  appStore.tokenPrice &&
                  poolsRewards?.length > 1 &&
                  poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
                setTotalRewardInUsd(
                  esdSum && appStore.tokenPrice && esdSum * appStore.tokenPrice,
                );
                if (myStakeInAMB) {
                  myTotalStake.push(myStakeInAMB);
                  if (myTotalStake?.length > 1) {
                    const totalStakeSum = myTotalStake.reduceRight(
                      (acc, curr) => acc.add(curr),
                      BigNumber.from('0'),
                    );
                    setTotalStaked(totalStakeSum && totalStakeSum);
                  }
                }
              }
            }
          }
        }
      }
    }
    return () => {
      mounetd = false;
      return interval && clearInterval(interval);
    };
  }, [appStore.refresh]);

  return {
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
    checkEthereumNetwork,
  };
};
export default useStaking;
