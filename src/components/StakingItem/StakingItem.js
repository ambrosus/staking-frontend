import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { providers, utils } from 'ethers';
import { store as alertStore } from 'react-notifications-component';
import Collapse from '@kunukn/react-collapse';
import { useLocation } from 'react-router-dom';

import Button from '../Button';
import P from '../P';
import Deposit from '../../pages/Staking/components/Deposit';
import appStore from '../../store/app.store';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert';
import useLogIn from '../../utils/useLogIn';
import DisplayValue from '../DisplayValue';

import { StakingWrapper } from '../../services/staking.wrapper';
import { ethereum, HIDE, SHOW, STAKE } from '../../utils/constants';
import StakingItemBody from './StakingItemBody';

import avatarIcon from '../../assets/svg/avatar.svg';

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
  const { logIn } = useLogIn();
  const location = useLocation();
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
            const stakingWrapper = new StakingWrapper(singer);
            const { totalStakeInAMB, myStakeInAMB, poolAPY } =
              await stakingWrapper.getPoolData(poolInfo.index);
            setMyStake(myStakeInAMB);
            setAPYOfPool(poolAPY);
            setTotalStake(totalStakeInAMB);
          }
        }
      };
      const loggedOutRefresh = async () => {
        const stakingWrapper = new StakingWrapper();
        const { totalStakeInAMB, poolAPY } = await stakingWrapper.getPoolData(
          poolInfo.index,
        );
        setAPYOfPool(poolAPY);
        setTotalStake(totalStakeInAMB);
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

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      updateState();
    }
    return () => {
      mounted = false;
    };
  }, [appStore.refresh]);

  const stackHeader = (
    <div className="item--header" role="presentation">
      <div
        className="item--header__flex"
        style={{
          paddingRight: history.location.pathname === '/staking' ? 100 : 100,
        }}
      >
        <div
          style={{
            marginRight: history.location.pathname === '/staking' ? 10 : '',
          }}
          className="item--header__flex__pool"
        >
          <ReactSVG src={avatarIcon} wrapper="span" />
          <P
            style={{
              textTransform: 'uppercase',
            }}
            size="l-500"
          >
            {poolInfo?.contractName.substring(0, 8)}
          </P>
        </div>
        {history.location.pathname === '/staking' && (
          <div
            style={{
              marginRight: history.location.pathname === '/staking' ? 10 : '',
            }}
            className="item--header__flex__my-stake"
          >
            <div style={{ width: 150 }}>
              <DisplayValue value={myStake && utils.formatEther(myStake)} />
            </div>
          </div>
        )}
        <div className="item--header__flex__vault-assets">
          <div style={{ width: 150 }}>
            <DisplayValue value={totalStake && utils.formatEther(totalStake)} />
          </div>
        </div>
        <div className="item--header__flex__apy">
          <P style={{ textTransform: 'uppercase' }} size="l-700">
            {APYOfPool ? `${APYOfPool}%` : <span className="skeleton" />}
          </P>
        </div>
      </div>
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
    </div>
  );
  return (
    <div role="presentation" className="stack-item">
      <StakingItemBody>
        {stackHeader}
        {location.pathname === '/staking' && (
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
export default React.memo(StakingItem);
