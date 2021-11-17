import React, { useEffect, useState } from 'react';
import { BigNumber, providers, utils } from 'ethers';
import { StakingWrapper } from '../services/staking.wrapper';
import { ethereum, network } from '../utils/constants';
import { collapsedReducer } from '../utils/helpers';
import appStore from '../store/app.store';
import storageService from '../services/storage.service';

const useStaking = () => {
  const [account, setAccount] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [totalStaked, setTotalStaked] = useState(BigNumber.from('0'));
  const [activeExpand, setActiveExpand] = useState(-1);
  const [totalReward, setTotalReward] = useState(0);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
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
  const getDataFromProvider = async () => {
    if (ethereum && ethereum.isMetaMask) {
      checkEthereumNetwork();
      window.addEventListener('focus', () => {
        changeNetwork();
      });
    }
    if (correctNetwork && appStore.auth) {
      provider = new providers.Web3Provider(ethereum);
      signer = provider !== undefined && provider.getSigner();
      if (provider !== undefined && signer !== undefined) {
        const { chainId } = provider && provider.getNetwork();
        setUserChainId(chainId);
        if (storageService.get('auth')) {
          const stakingWrapper = new StakingWrapper(signer);
          provider.listAccounts().then((accounts) => {
            const defaultAccount = accounts[0];
            if (defaultAccount) {
              setAccount(defaultAccount);
            }
          });
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
              }
            }
          });
        }
      }
    }
  };
  useEffect(() => {
    getDataFromProvider();
    return () => getDataFromProvider();
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
