import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  constructor() {
    this.auth = false;
    this.tokenPrice = undefined;
    this.refresh = false;
    this.stakingWrapper = undefined;
    makeAutoObservable(this);
  }

  setAuth(bool) {
    runInAction(() => {
      this.auth = bool;
    });
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

  resetStore = () => {
    runInAction(() => {
      this.auth = true;
    });
  };
}

const appStore = new AppStore();
export default appStore;
