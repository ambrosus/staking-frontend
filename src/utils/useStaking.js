import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { StakingWrapper, ZERO } from '../services/staking.wrapper';
import { ambMounthUSD, ethereum } from './constants';
import appStore from '../store/app.store';
import collapsedReducer from './collapsedReducer';
import storageService from '../services/storage.service';

const useStaking = () => {
  const [account, setAccount] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [totalStaked, setTotalStaked] = useState(-ZERO);
  const [activeExpand, setActiveExpand] = useState(-1);
  const [totalReward, setTotalReward] = useState('');
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [requestNetworkChange, setRequestNetworkChange] = useState(true);
  const [state, dispatch] = React.useReducer(collapsedReducer, [false]);
  const [pools, setPools] = useState([]);

  const changeNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
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
                    chainId: `${ethers.utils.hexlify(
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
    const provider = new ethers.providers.Web3Provider(ethereum);
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
    const inteval = setInterval(async () => {
      if (storageService.get('auth') === true) {
        if (
          ethereum &&
          ethereum.isMetaMask &&
          correctNetwork &&
          requestNetworkChange
        ) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const { chainId } = await provider.getNetwork();
          setUserChainId(chainId);
          appStore.incrementObserver();

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
              if (poolsArr) {
                setPools(poolsArr);
                poolsArr.forEach(async (item) => {
                  if (item.active) {
                    if (appStore.observer === 1) {
                      const { myStakeInAMB, estDR } =
                        await stakingWrapper.getPoolData(item.index);
                      setTotalStaked((prevState) =>
                        prevState.add(myStakeInAMB),
                      );
                      setTotalReward(estDR);
                      const priceInUsd = await ambMounthUSD(1);
                      if (priceInUsd && estDR) {
                        setTotalRewardInUsd(+priceInUsd * estDR);
                      }
                    }
                    if (appStore.observer === 0) {
                      setTotalStaked(ethers.BigNumber.from('0'));
                    }
                  }
                });
              }
            }
          }
        }
      }
    }, 3000);
    return () => clearInterval(inteval);
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
