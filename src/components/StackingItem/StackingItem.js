import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { BigNumber, ethers } from 'ethers';
import { store as alertStore } from 'react-notifications-component';
import Collapse from '@kunukn/react-collapse';

import Button from '../Button';
import P from '../P';
import Deposit from '../../pages/Stacking/components/Deposit';
import appStore from '../../store/app.store';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert';
import { SkeletonString } from '../Loader';
import useLogIn from '../../utils/useLogIn';

import avatarIcon from '../../assets/svg/avatar.svg';

import {
  StakingWrapper,
  MINSHOWSTAKE,
  ZERO,
  formatFixed,
} from '../../services/staking.wrapper';
import {
  COMING_SOON,
  ethereum,
  HIDE,
  SHOW,
  STAKE,
} from '../../utils/constants';

const StackingItem = ({
  expand = false,
  comingSoon,
  activeExpand,
  setActiveExpand,
  state = 0,
  hasChain,
  dispatch,
  index = -1,
  poolInfo,
}) => {
  const [myStake, setMyStake] = useState(ZERO);
  const [totalStake, setTotalStake] = useState(ZERO);
  const history = useHistory();
  const { logIn } = useLogIn();
  let provider;
  let interv;

  const updateState = async () => {
    try {
      if (appStore.auth) {
        if (ethereum && ethereum.isMetaMask) {
          provider = new ethers.providers.Web3Provider(ethereum);
        } else {
          // stakingWrapper.getAPY();
          alertStore.addNotification({
            content: InstallMetamaskAlert,
            container: 'bottom-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
          });
        }
      }
      if (provider) {
        interv = setInterval(async () => {
          if (provider) {
            const singer = provider.getSigner();
            if (singer) {
              const stakingWrapper = new StakingWrapper(singer);
              const { totalStakeInAMB, myStakeInAMB } =
                await stakingWrapper.getPoolData(poolInfo.index);
              setMyStake(myStakeInAMB);
              setTotalStake(totalStakeInAMB);
            }
          }
        }, 5000);
      } else {
        const stakingWrapper = new StakingWrapper();
        const { totalStakeInAMB } = await stakingWrapper.getPoolData(
          poolInfo.index,
        );
        setTotalStake(totalStakeInAMB);
      }
    } catch (switchError) {
      if (switchError.code === 4902) {
        ethereum.request({
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
        });
      }
    }
  };

  useEffect(() => {
    updateState();
    return () => clearInterval(interv);
  }, [hasChain]);

  const sleepForDisplaying = (val) => {
    if (val && val.lte(BigNumber.from('0'))) {
      return <SkeletonString />;
    }
    if (val && val.lte(MINSHOWSTAKE)) {
      return (
        <P style={{ textTransform: 'uppercase' }} size="l-400">
          {`${formatFixed(val, 2)} AMB`}
        </P>
      );
    }
    if (val && val.gte(MINSHOWSTAKE)) {
      return (
        <P style={{ textTransform: 'uppercase' }} size="l-400">
          {`${formatFixed(val, 2)} AMB`}
        </P>
      );
    }
    return false;
  };
  const stackHeader = (
    <div className="item--header" role="presentation">
      <div className="item--header__pool">
        <ReactSVG src={avatarIcon} wrapper="span" />
        <P
          style={{
            textTransform: 'uppercase',
            color: comingSoon && '#BFC9E0',
          }}
          size="l-500"
        >
          {poolInfo?.contractName.substring(0, 8)}
        </P>
      </div>
      {history.location.pathname === '/stacking' && (
        <div className="item--header__my-stake">
          {comingSoon ? (
            ''
          ) : (
            <span style={{ width: 150 }}>
              {myStake && sleepForDisplaying(myStake)}
            </span>
          )}
        </div>
      )}

      <div className="item--header__vault-assets">
        <div>
          {comingSoon ? (
            ''
          ) : (
            <>
              {' '}
              <div style={{ width: 150 }}>
                {totalStake && sleepForDisplaying(totalStake)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="item--header__apy">
        <P style={{ textTransform: 'uppercase' }} size="l-700">
          {comingSoon ? '' : `${appStore.randomInteger}%`}
        </P>
      </div>
      {comingSoon ? (
        <div style={{ minWidth: 160, maxWidth: 160 }}>
          <Button disabled priority="secondary">
            <P style={{ textTransform: 'uppercase' }} size="m-500">
              {COMING_SOON}
            </P>
          </Button>
        </div>
      ) : (
        <Button
          type="primary"
          onclick={() => {
            if (expand) {
              setActiveExpand(index);
              dispatch({ type: 'toggle', index });
              if (index === activeExpand) {
                dispatch({ type: 'hide', index });
              }
              if (index === activeExpand && !state[index]) {
                dispatch({ type: 'toggle', index });
              }
            } else {
              /* eslint-disable-next-line */
              if (hasChain === true) {
                logIn();
              }
            }
          }}
        >
          <P style={{ textTransform: 'uppercase' }} size="m-500">
            {expand && (state[index] && activeExpand === index ? HIDE : SHOW)}
            {!expand && STAKE}
          </P>
        </Button>
      )}
    </div>
  );
  return (
    <div role="presentation" className="stack-item">
      {stackHeader}
      <Collapse isOpen={state[index] ? activeExpand === index : state[index]}>
        <div className="item--content">
          <div className="line" />
          <div className="collapsed-content">
            {appStore.auth && (
              <div className="collapsed-content__body">
                <Deposit depositInfo={poolInfo} />
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
};
StackingItem.propTypes = {
  poolInfo: PropTypes.object,
  dispatch: PropTypes.func,
  expand: PropTypes.bool,
  comingSoon: PropTypes.bool,
  state: PropTypes.array,
  hasChain: PropTypes.bool,
  index: PropTypes.number,
  activeExpand: PropTypes.number,
  setActiveExpand: PropTypes.func,
};
export default StackingItem;
