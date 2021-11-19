import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { ReactSVG } from 'react-svg';
import Collapse from '@kunukn/react-collapse';

import { HIDE, MAIN_PAGE, SHOW, STAKE, STAKING_PAGE } from '../../config';
import avatarIcon from '../../assets/svg/avatar.svg';
import Paragraph from '../Paragraph';
import DisplayValue from '../DisplayValue';
import { formatRounded } from '../../services/staking.wrapper';
import Button from '../Button';
import Deposit from '../../pages/Staking/components/Deposit/Deposit';
import useLogIn from '../../hooks/useLogIn';

const StakingItemBody = ({
  totalStake,
  APYOfPool,
  expand,
  activeExpand,
  setActiveExpand,
  state,
  dispatch,
  index,
  myStake,
  poolInfo,
}) => {
  const { active } = useWeb3React();
  const { logIn } = useLogIn();
  const history = useHistory();
  const { pathname } = history.location;
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
      logIn();
    }
  };

  return (
    <>
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
            <Paragraph
              style={{
                color: poolInfo.active
                  ? pathname === MAIN_PAGE && '#FFF'
                  : 'rgb(191, 201, 224)',
              }}
              size="l-500"
            >
              {poolInfo?.contractName.substring(0, 8)}
            </Paragraph>
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
            <Paragraph
              style={{
                textTransform: 'uppercase',
                color: poolInfo.active
                  ? pathname === MAIN_PAGE && '#1ACD8C'
                  : 'rgb(191, 201, 224)',
              }}
              size="l-700"
            >
              {APYOfPool ? (
                <span className="mobile-display-wrap">
                  {poolInfo.contractName === 'Plutus'
                    ? 'Offline soon'
                    : `${APYOfPool}%`}
                </span>
              ) : (
                <span className="skeleton" />
              )}
            </Paragraph>
          </div>
        </div>
        <Button
          type={pathname === MAIN_PAGE ? 'green' : 'primary'}
          onclick={stakeBtnHandler}
        >
          <Paragraph style={{ textTransform: 'uppercase' }} size="m-500">
            {expand && (state[index] && activeExpand === index ? HIDE : SHOW)}
            {!expand && STAKE}
          </Paragraph>
        </Button>
      </div>
      {pathname === STAKING_PAGE && (
        <Collapse isOpen={state[index] ? activeExpand === index : state[index]}>
          <div className="item--content">
            <div className="line" />
            <div className="collapsed-content">
              {active && (
                <div className="collapsed-content__body">
                  <Deposit depositInfo={poolInfo} />
                </div>
              )}
            </div>
          </div>
        </Collapse>
      )}
    </>
  );
};

StakingItemBody.propTypes = {
  totalStake: PropTypes.any,
  APYOfPool: PropTypes.any,
  expand: PropTypes.any,
  activeExpand: PropTypes.any,
  setActiveExpand: PropTypes.any,
  state: PropTypes.any,
  dispatch: PropTypes.any,
  index: PropTypes.any,
  active: PropTypes.any,
  myStake: PropTypes.any,
  poolInfo: PropTypes.any,
};

export default StakingItemBody;
