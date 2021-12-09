import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { PoolsContext } from '../config';
import appStore from '../store/app.store';

function PoolsContextProvider(props) {
  const [pools, setPools] = useState([]);

  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };

  useEffect(() => {
    getPools();
  }, [appStore.refresh]);

  return <PoolsContext.Provider value={[pools, getPools]} {...props} />;
}
export default PoolsContextProvider;
