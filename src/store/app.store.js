import { runInAction, makeAutoObservable } from 'mobx';
import StakingWrapper from '../services/staking.wrapper';

export class AppStore {
  poolsData = [];

  tokenPrice = undefined;

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

  async updatePoolData() {
    console.log('updatePoolData');
    const poolsData = await StakingWrapper.getPools(
      window.location.pathname !== '/',
    );
    console.log('poolsData', poolsData);
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
