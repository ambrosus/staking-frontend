import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { toJS } from 'mobx';
import StakingWrapper from '../services/staking.wrapper';
import { injected, PoolsContext, walletconnect } from 'config';
import appStore from 'store/app.store';
import { debugLog } from 'utils/helpers';

function PoolsContextProvider(props) {
  const [pools, setPools] = useState([]);
  const context = useWeb3React();
  const { activate, active } = context;
  useEffect(() => {
    console.log('active', active);
  }, []);

  const getPools = async () => {
    let isMainPage;
    let poolsData;
    const connectedMethod = localStorage.getItem('connector');

    if (window.location.pathname === '/') {
      isMainPage = false;
      poolsData = await StakingWrapper.getPoolsData(
        isMainPage,
        appStore.signer !== undefined ? appStore.signer : window.ethereum,
      );
    } else {
      /* eslint-disable-next-line */
      await activate(
        connectedMethod !== 'injected' ? walletconnect : injected,
      ).then(async () => {
        isMainPage = true;
        poolsData = await StakingWrapper.getPoolsData(
          isMainPage,
          connectedMethod !== 'injected'
            ? walletconnect.walletConnectProvider
            : window.ethereum,
        );
        appStore.setRefresh();
      });
    }

    await appStore.updatePoolData(poolsData);
    if (appStore.poolsData && appStore.poolsData.length > 0)
      setPools(toJS(appStore.poolsData));
  };
  const value = React.useMemo(() => [pools, getPools], [pools]);
  debugLog(value);
  return <PoolsContext.Provider value={value} {...props} />;
}
export default PoolsContextProvider;
