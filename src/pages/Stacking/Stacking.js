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
import last24hIcon from '../../assets/svg/last24h.svg';
import copyIcon from '../../assets/svg/copy.svg';

const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});
const Stacking = observer(() => {
  const [account, setAccount] = useState(null);
  const [openIndexStakeItem, setOpenIndexStakeItem] = useState(20);
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const [totalStaked, setTotalStaked] = useState(ethers.BigNumber.from('0'));
  const [totalReward, setTotalReward] = useState(ethers.BigNumber.from('0'));
  const { ethereum } = window;
  let contract = null;

  useEffect(async () => {
    try {
      if (storageService.get('auth') === true) {
        setInterval(async () => {
          appStore.incrementObserver();
          if (ethereum && ethereum.isMetaMask) {
            window.ethereum.on('accountsChanged', function () {
              window.location.reload();
            });
            const provider = new ethers.providers.Web3Provider(ethereum);
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
              pools.forEach((item) => {
                contract = new ethers.Contract(item.address, item.abi, signer);
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
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      try {
        if (storageService.get('auth') === true) {
          setInterval(async () => {
            appStore.incrementObserver();
            if (ethereum && ethereum.isMetaMask) {
              window.ethereum.on('accountsChanged', function () {
                window.location.reload();
              });
              const provider = new ethers.providers.Web3Provider(ethereum);
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
                pools.forEach((item) => {
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
          }, 3000);
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  const infoBlock = (
    <div className="info-block ">
      <div className="wrapper">
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
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              {totalStaked && Number(ethers.utils.formatEther(totalStaked)) > 1
                ? Number(ethers.utils.formatEther(totalStaked)).toFixed(2)
                : '-'}
              &nbsp;&nbsp;AMB
            </P>
          </div>
          <div className="info-block__stacked--course">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ReactSVG
                style={{
                  paddingTop: 0,
                }}
                src={last24hIcon}
              />
              <P size="m-400" style={{ paddingBottom: 5 }}>
                &nbsp;&nbsp;Last 24 Hours
              </P>
            </div>

            <P size="xl-400" style={{ color: '#4A38AE' }}>
              <span style={{ color: '#1ACD8C' }}>
                {' '}
                {totalReward && totalReward > ethers.BigNumber.from('0')
                  ? `+${Number(totalReward).toFixed(2)}`
                  : '-'}{' '}
                AMB{' '}
              </span>
              &nbsp; / 34$
            </P>
          </div>
        </div>
      </div>
    </div>
  );
  return appStore.auth ? (
    <>
      {account && infoBlock}
      <div className="stacking wrapper">
        <div className="stacking__header">
          <div style={{ flexBasis: 64 }}>Pool</div>
          <div style={{ flexBasis: 26 }}>My Stake</div>
          <div style={{ flexBasis: 29 }}>Total staked</div>
          <div style={{ flexBasis: 26 }}>Net APY</div>
          <div style={{ maxWidth: 167, marginRight: -6 }} />
        </div>
        {pools.map((item, index) => (
          <StackItem
            key={item.contractName}
            index={index}
            openIndex={openIndexStakeItem}
            setOpenIndex={setOpenIndexStakeItem}
            expand
            comingSoon={!item?.abi}
            lazy
            poolInfo={item}
          />
        ))}
      </div>
      <ToastContainer transition={bounce} />
    </>
  ) : (
    <div>Loading...</div>
  );
});

export default Stacking;
