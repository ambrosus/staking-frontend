import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  auth = false;

  tokenPrice = 0.04;

  refresh = false;

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
