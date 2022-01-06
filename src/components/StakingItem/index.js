import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@kunukn/react-collapse';
import { useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { ReactSVG } from 'react-svg';
import { FIXED_POINT, formatRounded } from '../../services/numbers';
import { HIDE, SHOW, STAKE, STAKING_PAGE } from 'config';
import { poolIcon } from 'utils/helpers';
import Paragraph from '../Paragraph';
import DisplayValue from '../DisplayValue';
import { useMobileDetect, useLogIn } from 'hooks';

import expandDown from 'assets/svg/expandDown.svg';
import expandUp from 'assets/svg/expandUp.svg';
import CollapsedContentTabs from './CollapsedContentTabs';
// TODO new item-header
// const Layout = ({ children = 5, childrenPerRow = 1 }) => {
//   const childrenWithSpacer = children.reduce((result, child) => {
//     result.push(child);
//     return result;
//   }, []);
//   return (
//     <div
//       className="grid-layout-columns"
//       style={{
//         height: 100,
//         width: 'inherit',
//         padding: '20px 20px',
//         display: 'grid',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         gridAutoFlow: 'column',
//         gridTemplateRows: `repeat(${childrenPerRow}, 1fr)`,
//       }}
//     >
//       {childrenWithSpacer}
//     </div>
//   );
// };
//
// Layout.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
//   childrenPerRow: PropTypes.number,
// };

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
  const { pathname } = useLocation();
  const { active } = useWeb3React();
  const { logIn } = useLogIn();
  const { isDesktop } = useMobileDetect();

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
        background: '#262626',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.25)',
        color: !myStakeInAMB && !isPoolActive && 'rgb(191 201 224)',
      }}
    >
      {/*
      TODO new header
      <div className="item--test-header" role="presentation">
        <Layout>
          <div className="pool-name">
            <ReactSVG src={poolIcon(poolInfo.index)} wrapper="div" />
            <div>{contractName && contractName.substring(0, 8)}</div>
          </div>
          {isDesktop && pathname === STAKING_PAGE && (
            <div className="my-stake">
              <div>
                <DisplayValue
                  color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                  value={myStakeInAMB && formatRounded(myStakeInAMB, 2)}
                />
              </div>
            </div>
          )}
          <div className="vault-assets">
            <div>
              <DisplayValue
                color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                value={totalStakeInAMB && formatRounded(totalStakeInAMB, 2)}
              />
            </div>
          </div>
          <div className="apy">
            {isPoolActive === false && totalStakeInAMB.gte(FIXED_POINT) ? (
              <Paragraph
                style={{
                  color: isPoolActive ? '#1ACD8C' : 'rgb(191, 201, 224)',
                }}
                size="l-700"
              >
                <span className="transitions">OFFLINE</span>
              </Paragraph>
            ) : (
              <DisplayValue
                color={isPoolActive ? '#1ACD8C' : 'rgb(191, 201, 224)'}
                size="l-700"
                symbol="%"
                value={poolAPY}
              />
            )}
          </div>
          <div className="button">
            <p
              role="presentation"
              className="item--header__collapse-btn"
              onClick={stakeBtnHandler}
            >
              {expand && (state[index] && activeExpand === index ? HIDE : SHOW)}
              {!expand && STAKE}
              {pathname === STAKING_PAGE && (
                <ReactSVG
                  style={{
                    marginLeft: 11,
                  }}
                  src={
                    state[index] && activeExpand === index
                      ? expandUp
                      : expandDown
                  }
                  wrapper="span"
                />
              )}
            </p>
          </div>
        </Layout>
      </div>
      */}
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
                marginRight: pathname === STAKING_PAGE ? 10 : 0,
                color: !myStakeInAMB && !isPoolActive && 'rgb(191 201 224)',
              }}
              className="item--header__flex__pool"
            >
              <ReactSVG
                className="item--header__flex__pool--avatar"
                src={poolIcon(poolInfo.index)}
                wrapper="span"
              />
              <Paragraph
                style={{
                  color: isPoolActive ? '#FFF' : 'rgb(191, 201, 224)',
                }}
                size="l-500"
              >
                {contractName && contractName.substring(0, 8)}
              </Paragraph>
            </div>
            {isDesktop && pathname === STAKING_PAGE && (
              <div
                style={{
                  marginRight: pathname === STAKING_PAGE ? 10 : '',
                }}
                className="item--header__flex__my-stake"
              >
                <div style={{ width: 150 }}>
                  <DisplayValue
                    color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                    value={myStakeInAMB && formatRounded(myStakeInAMB, 2)}
                  />
                </div>
              </div>
            )}
            <div className="item--header__flex__vault-assets">
              <div style={{ width: 150 }}>
                <DisplayValue
                  color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                  value={totalStakeInAMB && formatRounded(totalStakeInAMB, 2)}
                />
              </div>
            </div>
            <div className="item--header__flex__apy">
              {isPoolActive === false && totalStakeInAMB.gte(FIXED_POINT) ? (
                <Paragraph
                  style={{
                    color: isPoolActive ? '#1ACD8C' : 'rgb(191, 201, 224)',
                  }}
                  size="l-700"
                >
                  <span className="transitions">OFFLINE</span>
                </Paragraph>
              ) : (
                <DisplayValue
                  color={isPoolActive ? '#1ACD8C' : 'rgb(191, 201, 224)'}
                  size="l-700"
                  symbol="%"
                  value={poolAPY}
                />
              )}
            </div>
          </div>
          <p
            role="presentation"
            className="item--header__collapse-btn"
            onClick={stakeBtnHandler}
          >
            {expand && (state[index] && activeExpand === index ? HIDE : SHOW)}
            {!expand && STAKE}
            {pathname === STAKING_PAGE && (
              <ReactSVG
                style={{
                  marginLeft: 11,
                }}
                src={
                  state[index] && activeExpand === index ? expandUp : expandDown
                }
                wrapper="span"
              />
            )}
          </p>
        </div>
        {pathname === STAKING_PAGE && (
          <Collapse
            isOpen={state[index] ? activeExpand === index : state[index]}
          >
            <div className="item--content">
              <div className="collapsed-content">
                {active && <CollapsedContentTabs poolInfo={poolInfo} />}
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
