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
import { debugLog, poolIcon } from 'utils/helpers';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import appStore from 'store/app.store';

import chevronUp from 'assets/svg/Chevron-up.svg';
import chevronDown from 'assets/svg/Chevron-down.svg';
import paragrapfIcon from 'assets/svg/paragrapf-icon.svg';

export default () => {
  const { pathname } = useLocation();
  const [pools, getPools] = useContext(PoolsContext);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [pickedName, setPickedName] = useState({});
  const [rangeValue, setRangeValue] = useState(0);
  const [calculateValue, setCalculateValue] = useState(0);
  const [historyCalculating, setHistoryCalculating] = useState([
    {
      myStake: 0,
      myReward: 0,
    },
  ]);
  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();

  useEffect(() => {
    if (pools.length > 0) {
      if (pickedName.index === undefined) {
        pools.forEach((pool) => pool.active && setPickedName(pool));
      }
    }
  }, [pools, pickedName]);

  const openDropDownHandler = () => {
    setOpenDropDown(!openDropDown);
  };

  const chartDataHandler = () => {
    openDropDownHandler();
  };

  const setPickedNameHandler = (contractName) => {
    setPickedName(contractName);
  };

  const handleChangeRange = (e) => {
    setRangeValue(e.target.value);
    if (e.target.value && pickedName.poolAPY && appStore.tokenPrice) {
      setCalculateValue(
        +e.target.value * +pickedName.poolAPY * appStore.tokenPrice,
      );
      setHistoryCalculating((prevState) => [
        ...prevState,
        {
          myStake: +rangeValue,
          myReward: +calculateValue,
        },
      ]);
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
            {pools.length > 0 && (
              <div
                className="pool-picker"
                style={{
                  height: !openDropDown ? 44 : 'auto',
                  overflow: !openDropDown ? 'hidden' : 'auto',
                }}
              >
                <div
                  role="presentation"
                  onClick={openDropDownHandler}
                  className="arrow"
                >
                  <ReactSVG src={openDropDown ? chevronUp : chevronDown} />
                </div>
                <div className="pool-picker--name" role="presentation">
                  <ReactSVG
                    className="pool-picker--name--icon"
                    src={poolIcon(pickedName.index)}
                    wrapper="div"
                  />
                  {pickedName.contractName}
                </div>
                {pools.map(
                  (pool) =>
                    // pool.active &&
                    pool.contractName !== pickedName.contractName && (
                      <div
                        key={pool.contractName}
                        className="pool-picker--name"
                        onClick={() => {
                          chartDataHandler();
                          setPickedNameHandler(pool);
                        }}
                        role="presentation"
                      >
                        <ReactSVG
                          className="pool-picker--name--icon"
                          src={poolIcon(pool.index)}
                          wrapper="div"
                        />
                        {pool.contractName}
                      </div>
                    ),
                )}
              </div>
            )}
            <div className="calculator__labels">
              <div className="left-value">
                <div className="secondary">Caption</div>
                <div className="primary">{rangeValue}</div>
              </div>
              <div className="right-value">
                <div className="secondary">Caption</div>
                <div className="primary">{pickedName.poolAPY}%</div>
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
              {historyCalculating
                .reverse()
                .filter((item, index) => index < 3)
                .map((historyItem, index) => (
                  // eslint-disable-next-line
                  <div key={index} className="calculator__results__result">
                    <div>Caption</div>
                    <div>{historyItem.myStake} AMB</div>
                    <div>${historyItem.myReward.toFixed(2)}</div>
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
