import React, { useLayoutEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';

import Button from '../../components/Button';
import P from '../../components/P';
import Deposit from './components/Deposit';

import infoIcon from '../../assets/svg/info.svg';
import avatarIcon from '../../assets/svg/avatar.svg';
import appStore from '../../store/app.store';
import storageService from '../../services/storage.service';

export const StackItem = ({
  expand,
  comingSoon,
  children,
  instant,
  lazy,
  transitionDuration = '200ms',
  transitionTimingFunction = 'ease-in',
  onComplete,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const firstRender = useRef(true);
  const transition = `height ${transitionDuration} ${transitionTimingFunction}`;
  const [renderChildren, setRenderChildren] = useState(lazy ? open : true);
  const history = useHistory();
  const logIn = async () => {
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      await window.ethereum.enable();
      await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

      await window.ethereum
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
          }
        })
        .catch((e) => {
          if (e) {
            storageService.set('auth', false);
            appStore.setAuth(false);
          }
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
    <div
      className="item--header"
      role="presentation"
      onClick={async (e) => {
        e.stopPropagation();
        if (expand) {
          setOpen((openContent) => !openContent);
        } else {
          await logIn();
        }
      }}
    >
      <div className="item--header__pool">
        <ReactSVG src={avatarIcon} wrapper="span" />
        <P
          style={{
            textTransform: 'uppercase',
            color: comingSoon && '#BFC9E0',
          }}
          size="l-500"
        >
          Alpha
        </P>
      </div>
      {history.location.pathname === '/stacking' && (
        <div className="item--header__my-stake">
          <P style={{ textTransform: 'uppercase' }} size="l-400">
            {comingSoon ? '' : '     3m AMB '}
          </P>
        </div>
      )}

      <div className="item--header__vault-assets">
        <P style={{ textTransform: 'uppercase' }} size="l-400">
          {comingSoon ? '' : '     3.5m AMB '}
        </P>
      </div>
      <div className="item--header__apy">
        <P style={{ textTransform: 'uppercase' }} size="l-700">
          {comingSoon ? '' : '32.87%'}
        </P>
      </div>
      <div className="mobile-display-none">
        {comingSoon ? (
          <Button disabled priority="secondary">
            <P style={{ textTransform: 'uppercase' }} size="m-500">
              COMING SOON
            </P>
          </Button>
        ) : (
          <Button
            type="primary"
            onclick={async () => {
              if (expand) {
                setOpen((openContent) => !openContent);
              } else {
                await logIn();
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
          <div className="collapsed-content__header">
            <>
              <P size="xxl-500">
                Deposit AMB&nbsp;
                <ReactSVG
                  data-tip
                  data-for="deposit"
                  src={infoIcon}
                  wrapper="span"
                />
              </P>
              <ReactTooltip id="deposit" place="top" effect="solid">
                Ну тут какая-то поdсказка которая сообщает о том о сём. И
                человек себе сразу понимает что к чему.
              </ReactTooltip>
            </>
            <P size="s-400">You staked: 264.000 AMB</P>
            <P size="s-400" style={{ fontWeight: 500 }}>
              Available for stake: 2.2m AMB
            </P>
            <div style={{ flexBasis: '90%' }} />
          </div>
          <div className="collapsed-content__body">
            <Deposit />
          </div>
        </div>
      </div>
    </div>
  );
};
StackItem.propTypes = {
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
