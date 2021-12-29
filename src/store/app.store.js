import { runInAction, makeAutoObservable } from 'mobx';
import StakingWrapper from '../services/staking.wrapper';
import { debugLog } from '../utils/helpers';

export class AppStore {
  poolsData = [];

  tokenPrice = undefined;

  signer = undefined;

  refresh = false;

  constructor(poolsData, tokenPrice, refresh) {
    this.poolsData = poolsData;
    this.tokenPrice = tokenPrice;
    this.refresh = refresh;
    makeAutoObservable(this);
  }

  setRefresh() {
    runInAction(() => {
      this.refresh = !this.refresh;
    });
  }

  setSigner(signer) {
    runInAction(() => {
      this.signer = signer;
    });
  }

  async updatePoolData() {
    debugLog('updatePoolData');
    const poolsData = await StakingWrapper.getPoolsData(
      window.location.pathname !== '/',
    );
    debugLog('poolsData', poolsData);
    runInAction(() => {
      this.poolsData = poolsData;
    });
  }

  setTokenPrice(price) {
    runInAction(() => {
      this.tokenPrice = price;
    });
  }
}

const appStore = new AppStore();
export default appStore;
