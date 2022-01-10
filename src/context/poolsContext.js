import React, { useState } from 'react';
import { toJS } from 'mobx';
import StakingWrapper from '../services/staking.wrapper';
import { PoolsContext } from '../config';
import appStore from '../store/app.store';
import { debugLog } from '../utils/helpers';

function PoolsContextProvider(props) {
  const [pools, setPools] = useState([]);

  const getPools = async () => {
    let isMainPage;
    let poolsData;
    if (window.location.pathname === '/') {
      isMainPage = false;
      poolsData = await StakingWrapper.getPoolsData(
        isMainPage,
        appStore.signer !== undefined ? appStore.signer : window.ethereum,
      );
    } else {
      isMainPage = true;
      poolsData = await StakingWrapper.getPoolsData(
        isMainPage,
        appStore.signer !== undefined ? appStore.signer : window.ethereum,
      );
    }
    appStore.setRefresh();

    await appStore.updatePoolData(poolsData);
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };
  const value = React.useMemo(() => [pools, getPools], [pools]);
  debugLog(value);
  return <PoolsContext.Provider value={value} {...props} />;
}
export default PoolsContextProvider;
