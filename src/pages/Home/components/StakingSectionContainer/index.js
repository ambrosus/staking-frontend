import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

export default () => {
  const { pathname } = useLocation();
  const [pools, getPools] = useContext(PoolsContext);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [chartData, setChartData] = useState(data[0]);
  const [pickedName, setPickedName] = useState(poolsArr[0]);

  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();

  const openDropDownHandler = () => {
    setOpenDropDown(!openDropDown);
  };

  const chartDataHandler = (arr) => {
    setChartData(arr);
    openDropDownHandler();
  };

  const setPickedNameHandler = (contractName) => {
    setPickedName(contractName);
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
                className="pool-picker-arrow"
            >
              <ReactSVG src={openDropDown ? chevronUp : chevronDown} />
            </div>
            <div className="chart__pool-picker--name" role="presentation">
              <ReactSVG
                  className="chart__pool-picker--name--icon"
                  src={poolIcon(pickedName.index)}
                  wrapper="div"
              />
              {pickedName.contractName}
            </div>
            {poolsArr.map(
                (pool, index) =>
                    pool.contractName !== pickedName.contractName && (
                        <div
                            key={pool.contractName}
                            className="chart__pool-picker--name"
                            onClick={() => {
                              chartDataHandler(data[index]);
                              setPickedNameHandler(pool);
                            }}
                            role="presentation"
                        >
                          <ReactSVG
                              className="chart__pool-picker--name--icon"
                              src={poolIcon(pool.index)}
                              wrapper="div"
                          />
                          {pool.contractName}
                        </div>
                    ),
            )}
          </div>
          <div className="info">
            <div>Lorem ipsum dolor sit</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              diam, cursus interdum dictum interdum. Malesuada platea vehicula
              ac, mattis et eget. Vel egestas aliquam semper amet, leo.
            </div>
          </div>
          <div className="calculator">
            <div>Lorem ipsum dolor sit</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              diam, cursus interdum dictum interdum. Malesuada platea vehicula
              ac, mattis et eget. Vel egestas aliquam semper amet, leo.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
