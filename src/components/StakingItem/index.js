import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll-to-element';

import Collapse from '@kunukn/react-collapse';
import { useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { ReactSVG } from 'react-svg';
import { FIXED_POINT, formatRounded } from '../../services/numbers';
import { HIDE, injected, MAIN_PAGE, SHOW, STAKE, walletconnect } from 'config';
import { poolIcon } from 'utils/helpers';
import Paragraph from '../Paragraph';
import DisplayValue from '../DisplayValue';
import { useMobileDetect, useLogIn, useModal } from 'hooks';

import expandDown from 'assets/svg/expandDown.svg';
import expandUp from 'assets/svg/expandUp.svg';
import CollapsedContentTabs from './CollapsedContentTabs';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

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
    maxPoolTotalStake,
    maxUserTotalStake,
  } = poolInfo;
  const { pathname } = useLocation();
  const { active } = useWeb3React();
  const { logIn } = useLogIn();
  const { isDesktop } = useMobileDetect();
  const h2ref = useRef(null);
  const isMainPage = pathname === MAIN_PAGE;

  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();
  const MAX_POOL_STAKE =
    maxPoolTotalStake !== undefined || maxPoolTotalStake !== null
      ? maxPoolTotalStake
      : undefined;

  const MAX_USER_STAKE =
    maxUserTotalStake !== undefined || maxUserTotalStake !== null
      ? maxUserTotalStake
      : undefined;

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
      toggleLogInMethodShow();
    }
  };

  return (
    <div
      id="stack-item"
      role="presentation"
      className="stack-item"
      style={{
        background: '#262626',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.25)',
        color: !myStakeInAMB && !isPoolActive && 'rgb(191 201 224)',
      }}
    >
      <>
        <div className="item--header" role="presentation">
          <div
            className="item--header__flex"
            style={{
              paddingRight: !isMainPage ? 40 : 130,
            }}
          >
            <div
              style={{
                marginRight: !isMainPage ? -50 : 0,
                color: !myStakeInAMB && !isPoolActive && 'rgb(191 201 224)',
              }}
              className="item--header__flex__pool"
            >
              <ReactSVG
                className="item--header__flex__pool--avatar"
                src={poolIcon(poolInfo.index)}
                wrapper="span"
              />
              <p
                className="pool-title"
                style={{
                  fontSize: isMainPage && 26,
                  color: isPoolActive ? '#FFF' : 'rgb(191, 201, 224)',
                }}
              >
                {contractName && contractName.substring(0, 8)}
              </p>
            </div>
            {!isMainPage && (
              <>
                {isDesktop ? (
                  <div
                    style={{
                      marginRight: !isMainPage ? 10 : '',
                    }}
                    className="item--header__flex__my-stake"
                  >
                    <div
                      style={{
                        width: 'max-content',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginLeft: 10,
                      }}
                    >
                      {/* TODO maybe here is another condition */}
                      {myStakeInAMB && MAX_POOL_STAKE && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-9px',
                            width: '100%',
                            height: '2.5px',
                            border: '0.2px solid #15D378',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              top: 0,
                              left: 0,
                              height: 2.5,
                              background: '#15D378',
                              width: `${
                                100 /
                                (+formatRounded(MAX_USER_STAKE, 18) /
                                  +formatRounded(myStakeInAMB, 18))
                              }%`,
                            }}
                          />
                        </div>
                      )}
                      <DisplayValue
                        color={isPoolActive ? '#15D378' : 'rgb(191, 201, 224)'}
                        value={myStakeInAMB && formatRounded(myStakeInAMB, 2)}
                      />

                      {MAX_USER_STAKE && (
                        <>
                          <span style={{ color: '#fff' }}>&nbsp;/&nbsp;</span>
                          <DisplayValue
                            color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                            value={formatRounded(MAX_USER_STAKE, 2)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      marginRight: !isMainPage ? 10 : '',
                    }}
                    className="item--header__flex__my-stake"
                  >
                    <div
                      style={{
                        width: 'max-content',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginLeft: 0,
                        paddingLeft: 11,
                      }}
                    >
                      <DisplayValue
                        styles={{ fontSize: isMainPage && 16 }}
                        color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                        value={myStakeInAMB && formatRounded(myStakeInAMB, 2)}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {
              /* eslint-disable-next-line */
              isDesktop ? (
                MAX_POOL_STAKE ? (
                  <div className="item--header__flex__vault-assets">
                    <div style={{ width: 150, fontSize: 16 }}>
                      <DisplayValue
                        styles={{ fontSize: isMainPage && 16 }}
                        color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                        value={
                          MAX_POOL_STAKE && formatRounded(MAX_POOL_STAKE, 2)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="item--header__flex__vault-assets"
                    style={{
                      paddingLeft:
                        !MAX_POOL_STAKE && isDesktop && !isMainPage ? 10 : 23,
                    }}
                  >
                    <div style={{ width: 150 }}>
                      <Paragraph
                        style={{
                          color: isPoolActive ? '#FFF' : 'rgb(191, 201, 224)',
                          fontSize: 16,
                        }}
                        size="l-500"
                      >
                        Unlimited
                      </Paragraph>
                    </div>
                  </div>
                )
              ) : null
            }

            {isDesktop && (
              <div
                className="item--header__flex__vault-assets"
                style={{
                  paddingLeft:
                    !MAX_POOL_STAKE && isDesktop && !isMainPage ? 10 : 35,
                }}
              >
                <div style={{ width: 150 }}>
                  <DisplayValue
                    styles={{ fontSize: isMainPage && 16 }}
                    color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                    value={totalStakeInAMB && formatRounded(totalStakeInAMB, 2)}
                  />
                </div>
              </div>
            )}
            {!isDesktop && isMainPage && (
              <div
                className="item--header__flex__vault-assets"
                style={{
                  paddingLeft:
                    !MAX_POOL_STAKE && isDesktop && !isMainPage ? 10 : 3,
                }}
              >
                <div style={{ width: 150 }}>
                  <DisplayValue
                    styles={{ fontSize: isMainPage && 16 }}
                    color={isPoolActive ? '#FFF' : 'rgb(191, 201, 224)'}
                    value={totalStakeInAMB && formatRounded(totalStakeInAMB, 2)}
                  />
                </div>
              </div>
            )}
            <div
              className="item--header__flex__apy"
              style={{
                marginLeft: -20,
                paddingLeft: isDesktop && isMainPage ? 100 : 20,
              }}
            >
              {isPoolActive === false && totalStakeInAMB.gte(FIXED_POINT) ? (
                <Paragraph
                  style={{
                    fontSize: isMainPage && 16,
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
                  styles={{
                    fontSize: 16,
                  }}
                  symbol="%"
                  value={poolAPY}
                />
              )}
            </div>
          </div>
          <span role="presentation" onClick={stakeBtnHandler}>
            <Scroll type="id" element="stack-item">
              <p className="item--header__collapse-btn">
                {expand &&
                  (state[index] && activeExpand === index ? HIDE : SHOW)}
                {!expand && STAKE}
                {!isMainPage && (
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
            </Scroll>
          </span>
        </div>
        {!isMainPage && (
          <Collapse
            isOpen={state[index] ? activeExpand === index : state[index]}
          >
            <div className="item--content" id="item--content">
              <div className="collapsed-content">
                {active && <CollapsedContentTabs poolInfo={poolInfo} />}
              </div>
            </div>
          </Collapse>
        )}

        <Modal
          isShowing={isLogInMethodShow}
          hide={toggleLogInMethodShow}
          modalStyles={{ maxWidth: 500 }}
        >
          <ButtonGroup>
            <Button
              buttonStyles={{
                background: '#212121',
              }}
              type="black"
              onclick={() => logIn(injected)}
            >
              <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
                <span
                  style={{
                    paddingLeft: 5,
                    fontFamily: ' Neue Machina',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Metamask
                </span>
              </Paragraph>
            </Button>
            <Button
              buttonStyles={{
                background: '#212121',
              }}
              type="black"
              onclick={() => logIn(walletconnect)}
            >
              <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
                <span
                  style={{
                    paddingLeft: 5,
                    fontFamily: ' Neue Machina',
                    whiteSpace: 'nowrap',
                  }}
                >
                  WalletConnect
                </span>
              </Paragraph>
            </Button>
          </ButtonGroup>
        </Modal>
      </>
      <div ref={h2ref} />
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
