/*eslint-disable*/
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
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

import infoIcon from '../../assets/svg/info.svg';
import avatarIcon from '../../assets/svg/avatar.svg';
export const StackItem = ({
  expand,
  comingSoon,
  children,
  instant,
  lazy,
  transitionDuration = '200ms',
  transitionTimingFunction = 'ease-in',
  onComplete,
  poolInfo = {
    abi: [],
  },
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const firstRender = useRef(true);
  const transition = `height ${transitionDuration} ${transitionTimingFunction}`;
  const [renderChildren, setRenderChildren] = useState(lazy ? open : true);
  const [totalStake, setTotalStake] = useState(0);
  const { ethereum } = window;
  const history = useHistory();
  useEffect(() => {
    if (ethereum && ethereum.isMetaMask && appStore.auth) {
      ethereum.enable().then(() => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        if (provider) {
          const singer = provider.getSigner();
          if (singer) {
            const poolContract = new ethers.Contract(
              '0x39a499cd81C494E8EBC226D416B245978820414e',
              poolInfo?.abi,
              provider,
            );
            if (poolContract) {
              poolContract.getTotalStake().then((total) => {
                if (total) {
                  const formatEther = ethers.utils.formatEther(total);
                  if (formatEther) {
                    setTotalStake(formatEther);
                  }
                } else {
                  setTotalStake(0);
                }
              });
            }
          }
        }
      });
    }
  }, []);
  const logIn = async () => {
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
    } else if (window.ethereum === undefined) {
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
  }, [renderChildren]);
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
          {poolInfo?.contractName}
        </P>
      </div>
      {history.location.pathname === '/stacking' && (
        <div className="item--header__my-stake">
          <P style={{ textTransform: 'uppercase' }} size="l-400">
            {comingSoon ? '' : `     {myStake} AMB`}
          </P>
        </div>
      )}

      <div className="item--header__vault-assets">
        <P style={{ textTransform: 'uppercase' }} size="l-400">
          {comingSoon ? '' : `${totalStake} AMB`}
        </P>
      </div>
      <div className="item--header__apy">
        <P style={{ textTransform: 'uppercase' }} size="l-700">
          {comingSoon ? '' : '32.87%'}
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
              setOpen((openContent) => !openContent);
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
};
export default StackItem;
