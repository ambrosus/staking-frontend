import React, { useEffect, useState } from 'react';
import { BigNumber, providers, utils } from 'ethers';
import { StakingWrapper, ZERO } from '../services/staking.wrapper';
import { ambMounthUSD, ethereum } from './constants';
import appStore from '../store/app.store';
import collapsedReducer from './collapsedReducer';
import storageService from '../services/storage.service';

const useStaking = () => {
  const [account, setAccount] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [totalStaked, setTotalStaked] = useState(ZERO);
  const [activeExpand, setActiveExpand] = useState(-1);
  const [totalReward, setTotalReward] = useState('');
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [requestNetworkChange, setRequestNetworkChange] = useState(true);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);
  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new providers.Web3Provider(ethereum);
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
    const provider = new providers.Web3Provider(ethereum);
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

  useEffect(() => {
    if (appStore.auth) {
      if (ethereum && ethereum.isMetaMask) {
        checkEthereumNetwork();
        window.addEventListener('focus', () => {
          changeNetwork();
        });
      }
    }
    return () => checkEthereumNetwork();
  }, [correctNetwork]);
  useEffect(() => {
    const intervProc = async () => {
      if (storageService.get('auth') === true) {
        if (
          ethereum &&
          ethereum.isMetaMask &&
          correctNetwork &&
          requestNetworkChange
        ) {
          const provider = new providers.Web3Provider(ethereum);
          const { chainId } = await provider.getNetwork();
          setUserChainId(chainId);
          const signer = provider.getSigner();
          provider.listAccounts().then((accounts) => {
            const defaultAccount = accounts[0];
            if (defaultAccount) {
              setAccount(defaultAccount);
            }
          });
          if (provider) {
            if (signer) {
              const stakingWrapper = new StakingWrapper(signer);
              const poolsArr = await stakingWrapper.getPools();
              setPools(poolsArr && poolsArr);
              const poolRewards = [];
              const myTotalStaked = [];
              const priceInUsd = await ambMounthUSD(1);
              /* eslint-disable-next-line */
              for (const pool of poolsArr) {
                if (pool.active) {
                  const { estDR, myStakeInAMB } =
                    /* eslint-disable-next-line */
                    await stakingWrapper.getPoolData(pool.index);
                  poolRewards.push(estDR && estDR);
                  const esdSum =
                    priceInUsd &&
                    poolRewards?.length > 1 &&
                    poolRewards.reduceRight((acc, curr) => acc + +curr, 0);
                  setTotalReward(esdSum && esdSum);
                  setTotalRewardInUsd(
                    esdSum && priceInUsd && esdSum * priceInUsd,
                  );
                  if (myStakeInAMB) {
                    myTotalStaked.push(myStakeInAMB);
                    if (priceInUsd && myTotalStaked?.length > 1) {
                      const totalStakeSum = myTotalStaked.reduceRight(
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
    };
    const interval = setInterval(intervProc, 4000);
    return () => clearInterval(interval);
  }, []);

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
