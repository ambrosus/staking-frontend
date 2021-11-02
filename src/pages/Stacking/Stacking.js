import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';
// import EthDater from 'ethereum-block-by-date';
import { ToastContainer, cssTransition } from 'react-toastify';

import { pools } from '../../utils/constants';
import StackItem from './StackingItem';
import P from '../../components/P';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import appStore from '../../store/app.store';
import storageService from '../../services/storage.service';

import errorOutlineIcon from '../../assets/svg/error_outline.svg';
import pieChartOutlineIcon from '../../assets/svg/pie_chart_outline.svg';
import earningsIcon from '../../assets/svg/last24h.svg';
import copyIcon from '../../assets/svg/copy.svg';
import { Loader, SkeletonString } from '../../components/Loader';
import ComingSoonPool from '../../components/ComingSoonPool';

import {
  formatFixed,
  ZERO,
  MINSHOWSTAKE,
} from '../../services/staking.wrapper';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import NotSupported from '../../components/NotSupported';

const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});
const Stacking = observer(() => {
  const [account, setAccount] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [openIndexStakeItem, setOpenIndexStakeItem] = useState(-1);
  const { isCopied, onCopy } = useCopyToClipboard({ text: account && account });
  const [totalStaked, setTotalStaked] = useState(ZERO);
  const [totalReward, setTotalReward] = useState(ZERO);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [requestNetworkChange, setRequestNetworkChange] = useState(true);
  const { ethereum } = window;
  let contract = null;
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
  const initEthereumNetwork = async () => {
    if (ethereum && ethereum.isMetaMask) {
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
    }
  };

  useEffect(async () => {
    initEthereumNetwork();
    window.addEventListener('focus', () => {
      changeNetwork();
    });
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

          // const dater = new EthDater(provider);
          // const block = await dater.getDate(
          //   new Date(Date.now() - 24 * 60 * 60 * 1000),
          // );
          // console.log('block', block);
          const signer = provider.getSigner();
          provider.listAccounts().then((accounts) => {
            const defaultAccount = accounts[0];
            if (defaultAccount) {
              setAccount(defaultAccount);
            }
          });
          if (provider) {
            if (signer) {
              pools.forEach((item) => {
                if (item.active) {
                  contract = new ethers.Contract(
                    item.address,
                    item.abi,
                    signer,
                  );
                  if (appStore.observer === 1) {
                    if (contract) {
                      contract.viewStake().then(async (res) => {
                        setTotalStaked((prevState) => prevState.add(res));
                      });
                    }
                  }
                  if (appStore.observer === 0) {
                    setTotalStaked(ethers.BigNumber.from('0'));
                  }
                }
              });

              if (contract) {
                // await contract.nodes(0).then(console.log);
                // const iface = contract.interface;
                // console.log('iface', iface);
                // const event = iface.events['PoolReward(address,uint256)'];
                // console.log('event:', event);
                // TODO
                setTotalReward(ethers.BigNumber.from('0'));

                // const rewardsLogs = provider.getLogs({
                //   fromBlock: block.block,
                //   toBlock: 'latest',
                //   topics: [ethers.utils.id('PoolReward(address,uint256)')],
                // });
                // if (rewardsLogs !== undefined) {
                //   const rewards =
                //     rewardsLogs &&
                //     rewardsLogs.map((log) => iface.parseLog(log).args.reward);
                //   if (rewards) {
                //     const totalRewards = rewards.reduce(
                //       (acc, reward) => acc.add(reward),
                //       ethers.BigNumber.from('0'),
                //     );
                //     if (totalRewards) {
                //       const formatTotalReward =
                //         ethers.utils.formatEther(totalRewards);
                //         prevState.add(formatTotalReward),
                //       );
                //     }
                //   }
                // }
              }
            }
          }
        }
      }
    }, 3000);
    return () => clearInterval(inteval);
  }, []);

  const infoBlock = (
    <div className="info-block ">
      <div className="wrapper">
        {account && totalReward && totalStaked ? (
          <>
            <div className="info-block__address">
              <P size="m-400" style={{ paddingBottom: 5 }}>
                My Address
              </P>
              <P size="xl-400" style={{ color: '#333333' }}>
                {account && account}
                <ReactSVG
                  data-tip
                  data-for="copy-state"
                  onClick={onCopy}
                  src={copyIcon}
                  wrapper="span"
                  style={{ marginLeft: 20, cursor: 'pointer' }}
                />
              </P>
              {!isCopied ? (
                <ReactTooltip id="copy-state" place="top" effect="solid">
                  Copy to clipboard
                </ReactTooltip>
              ) : (
                <ReactTooltip id="copy-state" place="top" effect="solid">
                  Copied
                </ReactTooltip>
              )}
            </div>
            <div className="info-block__stacked">
              <div className="info-block__stacked--total">
                <div>
                  <ReactTooltip id="total-staked" place="top" effect="solid">
                    The amount of staked coins in all pools
                  </ReactTooltip>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <ReactSVG
                        style={{
                          paddingTop: 1,
                        }}
                        src={pieChartOutlineIcon}
                        wrapper="span"
                      />
                      <P size="m-400" style={{ paddingBottom: 5 }}>
                        &nbsp;&nbsp;Total Staked&nbsp;&nbsp;
                      </P>
                    </div>
                    <ReactSVG
                      data-tip
                      data-for="total-staked"
                      src={errorOutlineIcon}
                      wrapper="span"
                    />
                  </div>
                </div>
                {appStore.observer < 1 ? (
                  <SkeletonString />
                ) : (
                  <P size="xl-400" style={{ color: '#4A38AE' }}>
                    {totalStaked && totalStaked.gte(MINSHOWSTAKE) ? (
                      <span>{formatFixed(totalStaked, 2)} &nbsp;&nbsp;AMB</span>
                    ) : (
                      '-'
                    )}
                  </P>
                )}
              </div>
              <div className="info-block__stacked--course">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ReactTooltip id="earnings" place="top" effect="solid">
                    Estimated earnings for the next 24h. <br />
                    This function is in early beta, <br />
                    the data is for reference only
                  </ReactTooltip>
                  <ReactSVG
                    style={{
                      paddingTop: 0,
                    }}
                    src={earningsIcon}
                  />
                  <P size="m-400" style={{ paddingBottom: 5 }}>
                    &nbsp;&nbsp;Earnings &nbsp;&nbsp;
                  </P>
                  <ReactSVG
                    data-tip
                    data-for="earnings"
                    src={errorOutlineIcon}
                    wrapper="span"
                  />
                </div>

                <P size="xl-400" style={{ color: '#4A38AE' }}>
                  <span style={{ color: '#1ACD8C' }}>
                    {' '}
                    {totalReward && totalReward > ethers.BigNumber.from('0')
                      ? `+${formatFixed(totalReward, 2)}  AMB`
                      : '-'}
                  </span>
                  &nbsp; / 34$
                </P>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
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
            <div className="stacking wrapper">
              <div className="stacking__header">
                <div style={{ flexBasis: 64 }}>Pool</div>
                <div style={{ flexBasis: 26 }}>My Stake</div>
                <div style={{ flexBasis: 29 }}>Total staked</div>
                <div style={{ flexBasis: 26 }}>Net APY</div>
                <div style={{ maxWidth: 167, marginRight: -6 }} />
              </div>
              {pools.map(
                (item, index) =>
                  item.active && (
                    <StackItem
                      key={item.contractName}
                      index={index}
                      openIndex={openIndexStakeItem}
                      setOpenIndex={setOpenIndexStakeItem}
                      expand
                      hasChain={+process.env.REACT_APP_CHAIN_ID === userChainId}
                      comingSoon={!item?.abi}
                      lazy
                      loading={!!account}
                      poolInfo={item}
                    />
                  ),
              )}
              {pools.map(
                (coming) =>
                  !coming.active && (
                    <ComingSoonPool
                      key={coming.contractName}
                      poolInfo={coming}
                      lazy
                    />
                  ),
              )}
            </div>
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

export default Stacking;
