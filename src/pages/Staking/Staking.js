/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';
import { ToastContainer, cssTransition } from 'react-toastify';

import { ambMounthUSD, ethereum } from '../../utils/constants';
import StakingItem from '../../components/StakingItem';
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
  StakingWrapper,
} from '../../services/staking.wrapper';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import NotSupported from '../../components/NotSupported';
import collapsedReducer from '../../utils/collapsedReducer';
import useStaking from '../../utils/useStaking';

const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});
const Staking = observer(() => {
  const {
    account,
    userChainId,
    isCopied,
    onCopy,
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
                      <P
                        size="m-400"
                        style={{ paddingBottom: 5, wordWrap: 'nowrap' }}
                      >
                        &nbsp;&nbsp;My total stake&nbsp;&nbsp;
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
                  <P
                    size="xl-400"
                    style={{ color: '#4A38AE', whiteSpace: 'nowrap' }}
                  >
                    {totalStaked && totalStaked.gte(MINSHOWSTAKE) ? (
                      <span>{formatFixed(totalStaked, 2)} AMB</span>
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

                <P
                  size="xl-400"
                  style={{ color: '#4A38AE', whiteSpace: 'nowrap' }}
                >
                  <span style={{ color: '#1ACD8C' }}>
                    {' '}
                    {totalReward ? `+${totalReward}  AMB` : '-'}
                  </span>
                  &nbsp; /
                  {totalRewardInUsd && ` ${totalRewardInUsd.toFixed(2)}$`}
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
            <div className="staking wrapper">
              {pools.length > 0 && (
                <>
                  <div className="staking__header">
                    <div style={{ flexBasis: 64 }}>Pool</div>
                    <div style={{ flexBasis: 26 }}>My Stake</div>
                    <div style={{ flexBasis: 29 }}>Total pool stake</div>
                    <div style={{ flexBasis: 26 }}>APY</div>
                    <div style={{ maxWidth: 167, marginRight: -6 }} />
                  </div>
                  {pools.map(
                    (item, index) =>
                      item.active && (
                        <StakingItem
                          dispatch={dispatch}
                          activeExpand={activeExpand}
                          setActiveExpand={setActiveExpand}
                          key={item.contractName}
                          index={index}
                          state={state}
                          expand
                          hasChain={
                            +process.env.REACT_APP_CHAIN_ID === userChainId
                          }
                          comingSoon={!item?.abi}
                          lazy
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
                </>
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

export default Staking;
