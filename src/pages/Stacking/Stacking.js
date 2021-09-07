import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';

import Button from '../../components/Button';
import P from '../../components/P';

import infoIcon from '../../assets/svg/info.svg';
import ButtonGroup from '../../components/ButtonGroup';
import Deposit from './components/Deposit/Deposit';

export const StackItem = ({
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
        node.style.paddingBottom = '30px';
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

  return (
    <div className="stack-item">
      <div className="item--header">
        <div className="item--header__pool">
          <P style={{ textTransform: 'uppercase' }} size="l-500">
            Alpha
          </P>
        </div>
        <div className="item--header__vault-assets">
          <P style={{ textTransform: 'uppercase' }} size="l-400">
            3.5m AMB
          </P>
        </div>
        <div className="item--header__apy">
          <P style={{ textTransform: 'uppercase' }} size="l-700">
            32.87%
          </P>
        </div>
        <Button onclick={() => setOpen((openContent) => !openContent)}>
          <P style={{ textTransform: 'uppercase' }} size="m-500">
            {open ? 'SHOW' : 'HIDE'}
          </P>
        </Button>
      </div>
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
            <P size="xxl-500">
              Deposit AMB&nbsp;
              <ReactSVG
                data-tip
                data-for="deposit"
                src={infoIcon}
                wrapper="span"
              />
              <ReactTooltip id="deposit" place="top" effect="solid">
                Ну тут какая-то поdсказка которая сообщает о том о сём. И
                человек себе сразу понимает что к чему.
              </ReactTooltip>
            </P>
            <P size="s-400">You staked: 264.000 AMB</P>
            <P size="s-400">Available for stake: 788.899 AMB</P>
            <Button
              disabled
              priority="secondary"
              type="outline"
              onclick={() => alert('Reward')}
            >
              <P size="s-500">Reward: 0.000</P>
            </Button>
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
  children: PropTypes.element,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  open: PropTypes.bool,
  lazy: PropTypes.bool,
  instant: PropTypes.bool,
  onComplete: PropTypes.func,
};
const Stacking = () => (
  <div className="stacking">
    <div className="stacking__header">
      <div>Pool</div>
      <div>Vault Assets</div>
      <div>Net APY</div>
      <div style={{ maxWidth: 160 }}></div>
    </div>
    <StackItem
      lazy
      onComplete={() => {
        alert('Функция при открытии колапса');
      }}
    />
    <StackItem lazy />
    <StackItem lazy />
    <ButtonGroup>
      <Button />
      <Button priority="secondary" />
      <Button disabled priority="secondary" />
      <Button priority="secondary" type="outline" />
      <Button disabled priority="secondary" type="outline" />
    </ButtonGroup>
    <br />
    <ButtonGroup compact>
      <Button />
      <Button priority="secondary" />
      <Button disabled priority="secondary" />
      <Button priority="secondary" type="outline" />
      <Button disabled priority="secondary" type="outline" />
    </ButtonGroup>
  </div>
);

export default Stacking;
