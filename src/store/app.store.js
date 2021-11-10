import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  auth = false;

  tokenPrice = undefined;

  refresh = false;

  stakingWrapper = undefined;

  constructor() {
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
