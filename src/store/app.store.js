import { makeAutoObservable, runInAction } from 'mobx';

export class AppStore {
  auth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    console.log(this.auth);
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
