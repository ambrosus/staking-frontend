import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  constructor() {
    this.tokenPrice = undefined;
    this.refresh = false;
    this.stakingWrapper = undefined;
    makeAutoObservable(this);
  }

  setRefresh() {
    runInAction(() => {
      this.refresh = !this.refresh;
    });
  }

  setStakingWrapper(wrap) {
    runInAction(() => {
      this.stakingWrapper = wrap;
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
