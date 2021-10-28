/*eslint-disable*/
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { getBalance } from '../../utils/constants';
import avatarIcon from '../../assets/svg/avatar.svg';
import { SkeletonString } from '../../components/Loader';

import { StakingWrapper, MINSHOWSTAKE } from '../../services/staking.wrapper';

export const StackItem = ({
  expand,
  comingSoon,
  children,
  loading = true,
  instant,
  lazy,
  transitionDuration = '200ms',
  transitionTimingFunction = 'ease-in',
  onComplete,
  index = -1,
  openIndex = -1,
  setOpenIndex,
  poolInfo,
  ...restProps
}) => {
  const ref = useRef();
  const firstRender = useRef(true);
  const [open, setOpen] = useState(false);
  const transition = `height ${transitionDuration} ${transitionTimingFunction}`;
  const [renderChildren, setRenderChildren] = useState(lazy ? open : true);
  const [myStake, setMyStake] = useState(ethers.BigNumber.from('0'));
  const [totalStake, setTotalStake] = useState(ethers.BigNumber.from('0'));
  const { ethereum } = window;
  const history = useHistory();

  //console.log('StackItem: upper');

  const start = () => {
    if (ethereum && ethereum.isMetaMask && appStore.auth) {
      console.log('StackItem: start 1');
      const provider = new ethers.providers.Web3Provider(ethereum);

      const interv = setInterval(async () => {
        console.log('StackItem: setInterval', interv);
        if (provider) {
          const singer = provider.getSigner();
          if (singer) {
            const stakingWrapper = new StakingWrapper(singer, poolInfo);
            const [
              totalStakeInAMB,
              tokenPriceAMB,
              myStakeInAMB,
              myStakeInTokens,
            ] = await stakingWrapper.getUserData();
            setMyStake(myStakeInAMB);
            setTotalStake(totalStakeInAMB);
          }
        }
      }, 3000);
    } else {
      console.log('StackItem: start 2');
      /*
      const provider = new ethers.providers.Web3Provider(ethereum);
      const poolContractForView = new ethers.Contract(
        poolInfo.address,
        poolInfo?.abi,
        provider,
      );
      /////poolContractForView.getTotalStake().then((total) => {
        if (total) {
          setTotalStake(total);
        }
      });
      */
      if (!ethereum && !ethereum.isMetaMask) {
        alertStore.addNotification({
          content: InstallMetamaskAlert,
          container: 'bottom-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
        });
      }
    }
  };

  const logIn = async () => {
    console.log('StackItem: logIn');
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
        .then((e) => {
          if (e) {
            history.push('/stacking');
            storageService.set('auth', true);
            appStore.setAuth(true);
            const provider = new ethers.providers.Web3Provider(ethereum);
            provider.listAccounts().then((accounts) => {
              const defaultAccount = accounts[0];
              if (defaultAccount) {
                appStore.setAuth(true);
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
    } else if (ethereum === undefined) {
      alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    } else if (
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
  };

  function openCollapse() {
    const node = ref.current;
    requestAnimationFrame(() => {
      node.style.height = `${node.scrollHeight}px`;
      node.style.paddingBottom = 0;
    });
  }

  function closeCollapse() {
    const node = ref.current;
    requestAnimationFrame(() => {
      node.style.height = `${node.style.height}px`;
      node.style.paddingBottom = 0;
      node.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        node.style.height = 0;
        node.style.paddingBottom = 0;
      });
    });
  }
  useLayoutEffect(() => {
    if (lazy) {
      if (open) {
        getBalance();
        if (renderChildren) {
          openCollapse();
        } else {
          setRenderChildren(true);
        }
      } else {
        closeCollapse();
      }
    } else {
      if (open) {
        openCollapse();
      }
      closeCollapse();
    }
  }, [open]);

  useLayoutEffect(() => {
    const node = ref.current;

    function handleComplete() {
      node.style.overflow = open ? 'initial' : 'hidden';
      if (open) {
        node.style.height = 'auto';
      }
      if (!open) {
        node.style.paddingBottom = '0px';
      }
      if (!open && lazy) {
        setRenderChildren(false);
      }
      if (open && onComplete) {
        (() => {
          onComplete();
        })();
      }
    }

    function handleTransitionEnd(event) {
      if (
        (event.target === node && event.propertyName === 'height') ||
        'padding-bottom'
      ) {
        handleComplete();
      }
    }

    if (instant || firstRender.current) {
      handleComplete();
      firstRender.current = false;
    }
    node.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      node.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (open) {
      openCollapse();
    }
    return () => openCollapse();
  }, [renderChildren]);
  useEffect(() => {
    console.log('StackItem: useEffect');
    try {
      start();
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `${ethers.utils.hexlify(+process.env.REACT_APP_CHAIN_ID)}`,
          },
        ],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
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
        } catch (addError) {
          console.log(addError);
        }
      }
      console.log(switchError);
    }
    return () => {
      console.log('StackItem: useEffect return');
      start();
    };
  }, []);

  useEffect(() => {
    if (expand) {
      if (index === openIndex) {
        setOpen(!open);
      } else {
        setOpen(false);
      }
    } else {
    }
  }, [openIndex, index]);
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
          {!loading ? (
            <SkeletonString />
          ) : (
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              {comingSoon ? (
                ''
              ) : (
                <span>
                  {myStake && myStake.gte(MINSHOWSTAKE)
                    ? `${Number(ethers.utils.formatEther(myStake)).toFixed(
                        2,
                      )}  AMB`
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
                    ? `${Number(ethers.utils.formatEther(totalStake)).toFixed(
                        2,
                      )}  AMB`
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
              setOpenIndex(index);
              if (openIndex === index) {
                setOpen(!open);
              }
            } else {
              logIn();
            }
          }}
        >
          <P style={{ textTransform: 'uppercase' }} size="m-500">
            {expand && (open ? 'HIDE' : 'SHOW')}
            {!expand && 'STAKE'}
          </P>
        </Button>
      )}
    </div>
  );
  return (
    <div role="presentation" className="stack-item">
      {stackHeader}
      <div
        ref={ref}
        className="item--content"
        style={{
          transition: instant || firstRender.current ? undefined : transition,
        }}
        {...restProps}
      >
        <div className="line" />
        <div className="collapsed-content">
          {appStore.auth && (
            <div className="collapsed-content__body">
              <Deposit depositInfo={poolInfo} />
            </div>
          )}
        </div>
      </div>
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
  instant: PropTypes.bool,
  onComplete: PropTypes.func,
  loading: PropTypes.bool,
};
export default StackItem;
