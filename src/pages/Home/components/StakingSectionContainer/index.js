import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { useLocation } from 'react-router-dom';
import { MAIN_PAGE } from '../../../../config';
import RenderItems from '../../../../components/RenderItems';
import StakingItem from '../../../../components/StakingItem';
import { Loader } from '../../../../components/Loader';
import appStore from '../../../../store/app.store';

export default () => {
  const { pathname } = useLocation();
  const [pools, setPools] = useState([]);
  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };

  useEffect(() => {
    getPools();
  }, []);

  return (
    <div className="staking">
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
        </>
      ) : (
        <div className="staking__loader">
          <Loader types="spokes" />
        </div>
      )}
    </div>
  );
};
