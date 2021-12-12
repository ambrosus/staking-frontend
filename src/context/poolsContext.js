import React, { useState } from 'react';
import { toJS } from 'mobx';
import { PoolsContext } from '../config';
import appStore from '../store/app.store';
import { debugLog } from '../utils/helpers';

function PoolsContextProvider(props) {
  const [pools, setPools] = useState([]);

  const getPools = async () => {
    await appStore.updatePoolData();
    if (appStore.poolsData.length > 0) setPools(toJS(appStore.poolsData));
  };
  const value = React.useMemo(() => [pools, getPools], [pools]);
  debugLog(value);
  return <PoolsContext.Provider value={value} {...props} />;
}
export default PoolsContextProvider;
