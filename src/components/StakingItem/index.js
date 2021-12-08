import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useWeb3React } from '@web3-react/core';
import Collapse from '@kunukn/react-collapse';
import { ReactSVG } from 'react-svg';

import { FIXED_POINT, formatRounded } from '../../services/numbers';
import { HIDE, MAIN_PAGE, SHOW, STAKE, STAKING_PAGE } from '../../config';
import avatarIcon from '../../assets/svg/avatar.svg';
import Paragraph from '../Paragraph';
import DisplayValue from '../DisplayValue';
import Button from '../Button';
import Deposit from '../../pages/Staking/components/Deposit/Deposit';
import { useLogIn } from '../../hooks';

const StakingItem = ({
  expand = false,
  activeExpand,
  setActiveExpand,
  state = 0,
  dispatch,
  index = -1,
  poolInfo,
}) => {
  const {
    myStakeInAMB,
    active: isPoolActive,
    contractName,
    totalStakeInAMB,
    poolAPY,
  } = poolInfo;
  const history = useHistory();
  const { pathname } = history.location;
  const { active } = useWeb3React();
  const { logIn } = useLogIn();
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
    <div
      role="presentation"
      className="stack-item"
      style={{
        background: pathname === MAIN_PAGE && '#262626',
        boxShadow: pathname === MAIN_PAGE && '0px 6px 10px rgba(0, 0, 0, 0.25)',
        color:
          pathname === MAIN_PAGE &&
          !myStakeInAMB &&
          !isPoolActive &&
          'rgb(191 201 224)',
      }}
    >
      <>
        <div className="item--header" role="presentation">
          <div
            className="item--header__flex"
            style={{
              paddingRight: pathname === STAKING_PAGE ? 90 : 130,
            }}
          >
            <div
              style={{
                marginRight: pathname === STAKING_PAGE ? 10 : '',
                color:
                  pathname === MAIN_PAGE &&
                  !myStakeInAMB &&
                  !isPoolActive &&
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
                  color: isPoolActive
                    ? pathname === MAIN_PAGE && '#FFF'
                    : 'rgb(191, 201, 224)',
                }}
                size="l-500"
              >
                {contractName && contractName.substring(0, 8)}
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
                      isPoolActive
                        ? pathname === MAIN_PAGE && '#FFF'
                        : 'rgb(191, 201, 224)'
                    }
                    value={myStakeInAMB && formatRounded(myStakeInAMB, 2)}
                  />
                </div>
              </div>
            )}
            <div className="item--header__flex__vault-assets">
              <div style={{ width: 150 }}>
                <DisplayValue
                  color={
                    isPoolActive
                      ? pathname === MAIN_PAGE && '#FFF'
                      : 'rgb(191, 201, 224)'
                  }
                  value={totalStakeInAMB && formatRounded(totalStakeInAMB, 2)}
                />
              </div>
            </div>
            <div className="item--header__flex__apy">
              {isPoolActive === false && totalStakeInAMB.gte(FIXED_POINT) ? (
                <Paragraph
                  style={{
                    color: isPoolActive
                      ? pathname === MAIN_PAGE && '#1ACD8C'
                      : 'rgb(191, 201, 224)',
                  }}
                  size="l-700"
                >
                  <span className="transitions">OFFLINE</span>
                </Paragraph>
              ) : (
                <DisplayValue
                  color={
                    isPoolActive
                      ? pathname === MAIN_PAGE && '#1ACD8C'
                      : 'rgb(191, 201, 224)'
                  }
                  size="l-700"
                  symbol="%"
                  value={poolAPY}
                />
              )}
            </div>
          </div>
          {pathname === STAKING_PAGE && (
            <Button
              buttonStyles={{
                width: pathname === MAIN_PAGE && 187,
                height: pathname === MAIN_PAGE && 65,
              }}
              type={pathname === MAIN_PAGE ? 'black' : 'primary'}
              onclick={stakeBtnHandler}
            >
              <Paragraph style={{ textTransform: 'uppercase' }} size="m-500">
                {expand &&
                  (state[index] && activeExpand === index ? HIDE : SHOW)}
                {!expand && STAKE}
              </Paragraph>
            </Button>
          )}
        </div>
        {pathname === STAKING_PAGE && (
          <Collapse
            isOpen={state[index] ? activeExpand === index : state[index]}
          >
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
    </div>
  );
};

StakingItem.propTypes = {
  poolInfo: PropTypes.object,
  dispatch: PropTypes.func,
  expand: PropTypes.bool,
  state: PropTypes.array,
  index: PropTypes.number,
  activeExpand: PropTypes.number,
  setActiveExpand: PropTypes.func,
};
export default React.memo(StakingItem);
