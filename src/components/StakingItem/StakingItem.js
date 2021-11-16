import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { providers, utils } from 'ethers';
import { store as alertStore } from 'react-notifications-component';
import Collapse from '@kunukn/react-collapse';

import Button from '../Button';
import P from '../P';
import Deposit from '../../pages/Staking/components/Deposit';
import appStore from '../../store/app.store';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert';
import useLogIn from '../../hooks/useLogIn';
import DisplayValue from '../DisplayValue';

import {
  formatRounded,
  MINSHOWSTAKE,
  StakingWrapper,
} from '../../services/staking.wrapper';
import {
  ethereum,
  HIDE,
  MAIN_PAGE,
  SHOW,
  STAKE,
  STAKING_PAGE,
} from '../../utils/constants';
import StakingItemBody from './StakingItemBody';

import avatarIcon from '../../assets/svg/avatar.svg';
import ComingSoonPool from '../ComingSoonPool';
// import { SkeletonPool } from '../Loader';

const StakingItem = ({
  expand = false,
  activeExpand,
  setActiveExpand,
  state = 0,
  hasChain,
  dispatch,
  index = -1,
  poolInfo,
}) => {
  const [myStake, setMyStake] = useState(null);
  const [totalStake, setTotalStake] = useState(null);
  const [APYOfPool, setAPYOfPool] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const { logIn } = useLogIn();
  let provider;

  const updateState = async () => {
    try {
      if (appStore.auth) {
        if (ethereum && ethereum.isMetaMask) {
          provider = new providers.Web3Provider(ethereum);
        } else {
          alertStore.addNotification({
            content: InstallMetamaskAlert,
            container: 'bottom-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
          });
        }
      }
      const loggedInRefresh = async () => {
        if (provider) {
          const singer = provider.getSigner();
          if (singer) {
            const wrapper = new StakingWrapper(singer);
            appStore.setStakingWrapper(wrapper);
            if (appStore.stakingWrapper !== undefined) {
              const { totalStakeInAMB, myStakeInAMB, poolAPY } =
                await appStore.stakingWrapper.getPoolData(poolInfo.index);
              if (totalStakeInAMB && myStakeInAMB && poolAPY) {
                setMyStake(myStakeInAMB);
                setAPYOfPool(poolAPY);
                setTotalStake(totalStakeInAMB);
              }
            }
          }
        }
      };
      const loggedOutRefresh = async () => {
        const stakingWrapper = new StakingWrapper();
        const { totalStakeInAMB, poolAPY } = await stakingWrapper.getPoolData(
          poolInfo.index,
        );
        if (poolAPY && totalStakeInAMB) {
          setAPYOfPool(poolAPY);
          setTotalStake(totalStakeInAMB);
        }
      };
      const refreshProc = provider ? loggedInRefresh : loggedOutRefresh;
      refreshProc();
    } catch (switchError) {
      if (switchError.code === 4902) {
        ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `${utils.hexlify(+process.env.REACT_APP_CHAIN_ID)}`,
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
  const stakeBtnHandler = () => {
    if (expand !== false) {
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
  };
  useEffect(() => {
    updateState();
    return () => updateState();
  }, [appStore.refresh]);

  const stackHeader = (
    <div className="item--header" role="presentation">
      <div
        className="item--header__flex"
        style={{
          paddingRight: pathname === STAKING_PAGE ? 100 : 100,
        }}
      >
        <div
          style={{
            marginRight: pathname === STAKING_PAGE ? 10 : '',
            color:
              pathname === MAIN_PAGE &&
              !myStake &&
              !poolInfo.active &&
              'rgb(191 201 224)',
          }}
          className="item--header__flex__pool"
        >
          <ReactSVG
            className="item--header__flex__pool--avatar"
            src={avatarIcon}
            wrapper="span"
          />
          <P
            style={{
              color: poolInfo.active
                ? pathname === MAIN_PAGE && '#FFF'
                : 'rgb(191, 201, 224)',
            }}
            size="l-500"
          >
            {poolInfo?.contractName.substring(0, 8)}
          </P>
        </div>
        {pathname === STAKING_PAGE && (
          <div
            style={{
              marginRight: pathname === STAKING_PAGE ? 10 : '',
            }}
            className="item--header__flex__my-stake"
          >
            <div style={{ width: 150 }}>
              <DisplayValue
                color={
                  poolInfo.active
                    ? pathname === MAIN_PAGE && '#FFF'
                    : 'rgb(191, 201, 224)'
                }
                value={myStake && formatRounded(myStake, 2)}
              />
            </div>
          </div>
        )}
        <div className="item--header__flex__vault-assets">
          <div style={{ width: 150 }}>
            <DisplayValue
              color={
                poolInfo.active
                  ? pathname === MAIN_PAGE && '#FFF'
                  : 'rgb(191, 201, 224)'
              }
              value={totalStake && formatRounded(totalStake, 2)}
            />
          </div>
        </div>
        <div className="item--header__flex__apy">
          <P
            style={{
              textTransform: 'uppercase',
              color: poolInfo.active
                ? pathname === MAIN_PAGE && '#1ACD8C'
                : 'rgb(191, 201, 224)',
            }}
            size="l-700"
          >
            {APYOfPool ? `${APYOfPool}%` : <span className="skeleton" />}
          </P>
        </div>
      </div>
      <Button
        type={pathname === MAIN_PAGE ? 'green' : 'primary'}
        onclick={stakeBtnHandler}
      >
        <P style={{ textTransform: 'uppercase' }} size="m-500">
          {expand && (state[index] && activeExpand === index ? HIDE : SHOW)}
          {!expand && STAKE}
        </P>
      </Button>
    </div>
  );
  return totalStake && totalStake.gte(MINSHOWSTAKE) ? (
    <div
      role="presentation"
      className="stack-item"
      style={{
        background: pathname === MAIN_PAGE && '#262626',
        boxShadow: pathname === MAIN_PAGE && '0px 6px 10px rgba(0, 0, 0, 0.25)',
        color:
          pathname === MAIN_PAGE &&
          !myStake &&
          !poolInfo.active &&
          'rgb(191 201 224)',
      }}
    >
      <StakingItemBody>
        {stackHeader}
        {pathname === STAKING_PAGE && (
          <Collapse
            isOpen={state[index] ? activeExpand === index : state[index]}
          >
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
        )}
      </StakingItemBody>
    </div>
  ) : (
    <ComingSoonPool loading={!!myStake} poolInfo={poolInfo} lazy />
  );
};
StakingItem.propTypes = {
  poolInfo: PropTypes.object,
  dispatch: PropTypes.func,
  expand: PropTypes.bool,
  state: PropTypes.array,
  hasChain: PropTypes.bool,
  index: PropTypes.number,
  activeExpand: PropTypes.number,
  setActiveExpand: PropTypes.func,
};
export default StakingItem;
