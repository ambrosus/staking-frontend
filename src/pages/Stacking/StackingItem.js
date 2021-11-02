/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { ethers } from 'ethers';
import { store as alertStore } from 'react-notifications-component';

import Button from '../../components/Button';
import P from '../../components/P';
import Deposit from './components/Deposit';

import appStore from '../../store/app.store';
import storageService from '../../services/storage.service';
import InstallMetamaskAlert from '../Home/components/InstallMetamaskAlert';
import FromPhoneDeviseEnter from '../Home/components/FromPhoneDeviseEnter';
import avatarIcon from '../../assets/svg/avatar.svg';
import { SkeletonString } from '../../components/Loader';

import {
  StakingWrapper,
  MINSHOWSTAKE,
  ZERO,
  formatFixed,
} from '../../services/staking.wrapper';
import Collapse from '@kunukn/react-collapse';
// import { createPlugin } from 'stylelint';

export const StackItem = ({
  expand,
  comingSoon,
  activeExpand,
  setActiveExpand,
  state = 0,
  hasChain,
  loading = true,
  instant,
  lazy,
  dispatch,
  transitionDuration = '200ms',
  transitionTimingFunction = 'ease-in',
  onComplete,
  index = -1,
  poolInfo,
  ...restProps
}) => {
  const [myStake, setMyStake] = useState(ZERO);
  const [totalStake, setTotalStake] = useState(ZERO);
  const { ethereum } = window;
  const history = useHistory();

  const logIn = async () => {
    if (ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 0);
    }

    async function handleEthereum() {
      if (ethereum && ethereum.isMetaMask) {
        await ethereum
          .request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {},
              },
            ],
          })
          .then(async (e) => {
            if (e) {
              history.push('/stacking');
              storageService.set('auth', true);
              appStore.setAuth(true);
              const provider = new ethers.providers.Web3Provider(ethereum);
              provider.on('network', (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                  window.location.reload();
                }
              });

              provider
                .listAccounts()
                .then((accounts) => {
                  const defaultAccount = accounts[0];
                  if (defaultAccount) {
                    appStore.setAuth(true);
                  } else {
                    storageService.set('auth', false);
                  }
                })
                .catch((error) => {
                  if (error) {
                    storageService.set('auth', false);
                  }
                });
            }
          })
          .catch((e) => {
            if (e) {
              storageService.set('auth', false);
              appStore.setAuth(false);
            }
          });
      } else {
        alertStore.addNotification({
          content: InstallMetamaskAlert,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
      if (
        navigator.userAgent.includes('iPhone') ||
        navigator.userAgent.includes('Android')
      ) {
        alertStore.addNotification({
          content: FromPhoneDeviseEnter,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
    }
  };

  useEffect(async () => {
    let provider;
    let interv;
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
              const stakingWrapper = new StakingWrapper(poolInfo, singer);
              const [totalStakeInAMB, myStakeInAMB] =
                await stakingWrapper.getPoolData();
              setMyStake(myStakeInAMB);
              setTotalStake(totalStakeInAMB);
            }
          }
        }, 5000);
      } else {
        const stakingWrapper = new StakingWrapper(poolInfo);
        const [totalStakeInAMB] = await stakingWrapper.getPoolData();
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
    return () => clearInterval(interv);
  }, [hasChain]);

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
          {!loading || hasChain === false ? (
            <SkeletonString />
          ) : (
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              {comingSoon ? (
                ''
              ) : (
                <span>
                  {myStake && myStake.gte(MINSHOWSTAKE)
                    ? `${formatFixed(myStake, 2)}  AMB`
                    : '-'}
                </span>
              )}
            </P>
          )}
        </div>
      )}

      <div className="item--header__vault-assets">
        {!loading ? (
          <SkeletonString />
        ) : (
          <P style={{ textTransform: 'uppercase' }} size="l-400">
            {comingSoon ? (
              ''
            ) : (
              <>
                {' '}
                <span>
                  {totalStake && totalStake.gte(MINSHOWSTAKE)
                    ? `${formatFixed(totalStake, 2)}  AMB`
                    : '-'}
                </span>
              </>
            )}
          </P>
        )}
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
              COMING SOON
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
            {expand &&
              (state[index] && activeExpand === index ? 'HIDE' : 'SHOW')}
            {!expand && 'STAKE'}
          </P>
        </Button>
      )}
    </div>
  );
  return (
    <div role="presentation" className="stack-item">
      {stackHeader}
      <Collapse
        layoutEffect
        isOpen={state[index] ? activeExpand === index : state[index]}
      >
        <div className="item--content" {...restProps}>
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
StackItem.propTypes = {
  poolInfo: PropTypes.object,
  expand: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  open: PropTypes.bool,
  comingSoon: PropTypes.bool,
  lazy: PropTypes.bool,
  hasChain: PropTypes.bool,
  index: PropTypes.number,
  openIndex: PropTypes.number,
  setOpenIndex: PropTypes.func,
  onToggle: PropTypes.func,
  instant: PropTypes.bool,
  onComplete: PropTypes.func,
  loading: PropTypes.bool,
};
export default StackItem;
