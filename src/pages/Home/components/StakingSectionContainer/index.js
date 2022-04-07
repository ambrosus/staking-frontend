import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import {
  injected,
  MAIN_PAGE,
  PoolsContext,
  STAKE,
  tooltips,
  walletconnect,
} from 'config';
import RenderItems from '../../../../components/RenderItems';
import StakingItem from '../../../../components/StakingItem';
import { Loader } from '../../../../components/Loader';
import Paragraph from '../../../../components/Paragraph';
import Button from '../../../../components/Button';
import { useLogIn, useMedia, useMobileDetect, useModal } from 'hooks';
import { poolIcon } from 'utils/helpers';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import appStore from 'store/app.store';
import paragrapfIcon from 'assets/svg/paragrapf-icon.svg';
import ReactTooltip from 'react-tooltip';
import errorOutlineIcon from 'assets/svg/error_outline.svg';

export default () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_PAGE;
  const [pools, getPools] = useContext(PoolsContext);
  const [rangeValue, setRangeValue] = useState(50000);
  const inputRef = useRef(null);
  const { isDesktop } = useMobileDetect();

  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();

  const handleChangeRange = useCallback(
    (e) => {
      if (e.target.value && appStore.tokenPrice && inputRef.current !== null) {
        setRangeValue(e.target.value);
      }
    },
    [rangeValue],
  );
  const value = (rangeValue / 100000) * 10;

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.style.background = `linear-gradient(to right, rgba(21, 211, 120),  ${value}%, transparent ${0}%, transparent 100%)`;
    }
    getPools();
  }, [value]);

  return (
    <>
      <div className="staking">
        <div>
          <h2 className="section-heading">Choose your staking pool</h2>
        </div>
        {pools.length > 0 ? (
          <>
            <div className="staking__header">
              <div
                style={{
                  fontSize: 16,
                  paddingRight: isDesktop && isMainPage && 81,
                }}
              >
                Pool
              </div>
              {isDesktop && (
                <>
                  {isMainPage ? (
                    <div
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Max Stake
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {isDesktop ? (
                        <div
                          style={{
                            fontSize: 16,
                          }}
                        >
                          My Stake/Max Stake
                        </div>
                      ) : (
                        <div>My Stake</div>
                      )}
                    </div>
                  )}
                </>
              )}
              <ReactTooltip id="max-total-staked">
                {tooltips.totalMaxStaked}
              </ReactTooltip>
              {isDesktop && !isMainPage && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}
                  data-for="max-total-staked"
                >
                  Total Max Stake&nbsp;
                  <ReactSVG
                    data-tip
                    data-for="total-staked"
                    src={errorOutlineIcon}
                    wrapper="span"
                  />
                </div>
              )}
              <div
                style={{ display: 'flex', flexDirection: 'row', fontSize: 16 }}
              >
                Total pool stake{' '}
              </div>
              <div
                style={{
                  fontSize: 16,
                  paddingLeft: isMainPage && isDesktop ? 0 : 12,
                }}
              >
                APY
              </div>
              <div
                style={{ marginRight: isDesktop && isMainPage ? -132 : -20 }}
              />
            </div>

            <div className="staking__pools">
              <RenderItems>
                <>
                  {pools.map(
                    (item) =>
                      item.active && (
                        <StakingItem
                          key={item.contractName}
                          poolInfo={item}
                          expand={false}
                        />
                      ),
                  )}
                </>
              </RenderItems>
            </div>
            <div style={{ width: '100%' }}>
              <Button
                buttonStyles={{
                  margin: !isSmall ? '45px auto 0 auto' : '0 0 0 auto',
                  maxHeight: !isSmall ? 65 : 50,
                  width: !isSmall ? 211 : 160,
                }}
                type="white "
                onclick={toggleLogInMethodShow}
              >
                <Paragraph size="m-500">{STAKE}</Paragraph>
              </Button>
            </div>
          </>
        ) : (
          <div className="staking__loader">
            <Loader types="spokes" />
          </div>
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
      </div>
      <div className="staking-calculator">
        <div className="background" />
        <div className="container">
          <div className="info">
            <div className="after-icon">
              <ReactSVG src={paragrapfIcon} wrapper="span" />
            </div>
            <div className="info__primary">Calculate your rewards</div>
            <div className="info__secondary">
              See what your AMB stake will be worth with our handy APY
              calculator!
            </div>
          </div>
          <div className="calculator">
            <div className="calculator__labels">
              <div className="left-value">
                <div className="left-value__secondary">Initial stake</div>
                <div className="left-value__primary">
                  {new Intl.NumberFormat('en').format(rangeValue)}
                </div>
              </div>
            </div>
            <div className="calculator__range">
              {/* TODO min & max range value */}
              <input
                ref={inputRef}
                min="1000"
                max="1000000"
                value={rangeValue}
                readOnly={false}
                step="1"
                onChange={handleChangeRange}
                type="range"
              />
            </div>
            <div className="calculator__keys">
              <div className="calculator__keys__result">
                <div
                  style={{
                    justifyContent: 'flex-start',
                    flexBasis: !isDesktop && '130%',
                  }}
                >
                  Pool
                </div>
                {isDesktop && (
                  <div style={{ justifyContent: 'flex-start' }}>APY %</div>
                )}
                <div style={{ paddingLeft: 25, justifyContent: 'flex-start' }}>
                  APY AMB
                </div>
                <div>APY $</div>
              </div>
            </div>
            <div className="calculator__results">
              {pools.map(
                (pool) =>
                  pool.active && (
                    // eslint-disable-next-line
                    <div
                      key={pool.contractName}
                      className="calculator__results__result"
                    >
                      <div
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 10,
                          justifyItems: 'flex-start',
                          flexBasis: !isDesktop && '130%',
                        }}
                      >
                        <ReactSVG
                          className="pool-calc-icon"
                          src={poolIcon(pool.index)}
                          wrapper="span"
                        />
                        {pool.contractName}{' '}
                        {!isDesktop && `${Number(pool.poolAPY).toFixed(0)} %`}
                      </div>
                      {isDesktop && (
                        <div style={{ justifyContent: 'flex-start' }}>
                          {Number(pool.poolAPY).toFixed(2)} %
                        </div>
                      )}
                      <div
                        style={{
                          paddingLeft: 25,
                          justifyContent: 'flex-start',
                        }}
                      >
                        {((+rangeValue / 100) * pool.poolAPY).toFixed(0)} AMB
                      </div>
                      <div>
                        $
                        {(
                          (+rangeValue / 100) *
                          pool.poolAPY *
                          appStore.tokenPrice
                        ).toFixed(0)}
                      </div>
                      <div className="hr" />
                    </div>
                  ),
              )}
              <Button
                buttonStyles={{
                  marginTop: isDesktop ? 70 : 20,
                  minWidth: '174px',
                  width: '174px',
                  minHeight: '65px',
                }}
                className="calc-stake"
                type="white"
                onclick={() => {
                  toggleLogInMethodShow();
                }}
              >
                <span style={{ fontSize: 14 }}>↖ Stake Now</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
