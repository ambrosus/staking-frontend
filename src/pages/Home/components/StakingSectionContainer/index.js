import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { useLocation } from 'react-router-dom';
import { MAIN_PAGE, STAKE } from '../../../../config';
import RenderItems from '../../../../components/RenderItems';
import StakingItem from '../../../../components/StakingItem';
import { Loader } from '../../../../components/Loader';
import appStore from '../../../../store/app.store';
import Paragraph from '../../../../components/Paragraph';
import Button from '../../../../components/Button';
import { useLogIn, useMedia } from '../../../../hooks';

export default () => {
  const { pathname } = useLocation();
  const [pools, setPools] = useState([]);
  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();

  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };

  useEffect(() => {
    getPools();
  }, []);

  return (
    <div className="staking">
      <div>
        <h2 className="section-heading">Choose your staking pool</h2>
      </div>
      {pools.length > 0 ? (
        <>
          <div
            className="staking__header"
            style={{
              color: pathname === MAIN_PAGE && '#FFFFFF',
            }}
          >
            <div className="staking__header__clearfix-pool">Pool</div>
            <div>Total pool stake</div>
            <div className="staking__header__clearfix-apy">APY</div>
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
            {isSmall && (
              <Button
                buttonStyles={{ marginLeft: 'auto', maxHeight: 50, width: 160 }}
                type={pathname === MAIN_PAGE ? 'black' : 'primary'}
                onclick={logIn}
              >
                <Paragraph style={{ textTransform: 'uppercase' }} size="m-500">
                  {STAKE}
                </Paragraph>
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="staking__loader">
          <Loader types="spokes" />
        </div>
      )}
    </div>
  );
};
