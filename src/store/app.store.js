import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  auth = false;

  tokenPrice = 0.04;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    runInAction(() => {
      this.auth = bool;
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
