/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import {
  injected,
  MAIN_PAGE,
  PoolsContext,
  STAKE,
  walletconnect,
} from 'config';
import RenderItems from '../../../../components/RenderItems';
import StakingItem from '../../../../components/StakingItem';
import { Loader } from '../../../../components/Loader';
import Paragraph from '../../../../components/Paragraph';
import Button from '../../../../components/Button';
import { useLogIn, useMedia, useModal } from 'hooks';
import { debugLog } from 'utils/helpers';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import appStore from 'store/app.store';
import paragrapfIcon from 'assets/svg/paragrapf-icon.svg';

export default () => {
  const { pathname } = useLocation();
  const [pools, getPools] = useContext(PoolsContext);
  const [rangeValue, setRangeValue] = useState(1000);

  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();

  const handleChangeRange = (e) => {
    if (e.target.value && appStore.tokenPrice) {
      setRangeValue(e.target.value);
    }
  };

  const isMainPage = pathname === MAIN_PAGE;
  useEffect(() => {
    debugLog('Home render useEffect');
    getPools();
  }, []);

  return (
    <>
      <div className="staking">
        <div>
          <h2 className="section-heading">Choose your staking pool</h2>
        </div>
        {pools.length > 0 ? (
          <>
            <div
              className="staking__header"
              style={{
                color: isMainPage && '#FFFFFF',
              }}
            >
              <div className="staking__header__clearfix-pool">Pool</div>
              <div style={{ marginLeft: !isSmall ? 140 : -85 }}>
                Total pool stake
              </div>
              <div
                className="staking__header__clearfix-apy"
                style={{ marginLeft: !isSmall ? 146 : -75 }}
              >
                APY
              </div>
              <div style={{ maxWidth: 160, minWidth: 160 }} />
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
        <div className="container">
          <div className="info">
            <div className="after-icon">
              <ReactSVG src={paragrapfIcon} wrapper="span" />
            </div>
            <div className="info__primary">Lorem ipsum dolor sit</div>
            <div className="info__secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              diam, cursus interdum dictum interdum. Malesuada platea vehicula
              ac, mattis et eget. Vel egestas aliquam semper amet, leo.
            </div>
          </div>
          <div className="calculator">
            <div className="calculator__labels">
              <div className="left-value">
                <div className="left-value__secondary">Caption</div>
                <div className="left-value__primary">{rangeValue}</div>
              </div>
              <div className="right-value">
                <div className="right-value__secondary">Caption</div>
                <div className="right-value__primary">APY %</div>
              </div>
            </div>
            <div className="calculator__range">
              {/* TODO min & max range value */}
              <input
                min="1000"
                max="100000"
                value={rangeValue}
                step="1"
                onChange={handleChangeRange}
                type="range"
              />
            </div>
            <div className="calculator__results">
              {pools
                .filter((item, index) => index < 3)
                .map((pool, index) => (
                  // eslint-disable-next-line
                  <div
                    key={pool.contractName}
                    className="calculator__results__result"
                  >
                    <div>{pool.contractName}</div>
                    <div>
                      {((+rangeValue / 100) * pool.poolAPY).toFixed(2)} AMB
                    </div>
                    <div>
                      $
                      {(
                        (+rangeValue / 100) *
                        pool.poolAPY *
                        appStore.tokenPrice
                      ).toFixed(2)}
                    </div>
                    <div className="hr" />
                  </div>
                ))}
              <Button
                buttonStyles={{ width: 174, height: 65, marginLeft: 'auto' }}
                type="white"
                onclick={() => {
                  toggleLogInMethodShow();
                }}
              >
                ↖ Stake Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
