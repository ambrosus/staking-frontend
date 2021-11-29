import { runInAction, makeAutoObservable } from 'mobx';
import { StakingWrapper } from '../services/staking.wrapper';

export class AppStore {
  poolsData = [];

  tokenPrice = undefined;

  refresh = false;

  constructor(poolsData, tokenPrice, refresh) {
    this.poolsData = poolsData;
    this.tokenPrice = tokenPrice;
    this.refresh = refresh;
    this.updatePoolData = this.updatePoolData.bind(this);
    makeAutoObservable(this);
  }

  setRefresh() {
    runInAction(() => {
      this.refresh = !this.refresh;
    });
  }

  async updatePoolData() {
    console.log('updatePoolData');
    const inst = StakingWrapper;
    const pools = await inst.getPools();
    console.log(pools);
    runInAction(() => {
      this.poolsData = pools;
      // TODO => make update with mobx
      this.setRefresh();
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
