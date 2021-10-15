import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  auth = false;

  observer = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setObserverValue(val) {
    runInAction(() => {
      this.observer = val;
    });
  }

  incrementObserver() {
    runInAction(() => {
      this.observer += 1;
    });
  }

  setAuth(bool) {
    runInAction(() => {
      this.auth = bool;
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
