import { runInAction, makeAutoObservable } from 'mobx';
import { debugLog } from '../utils/helpers';

export class AppStore {
  poolsData = [];

  tokenPrice = undefined;

  tokenChange = undefined;

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

  async updatePoolData(data) {
    debugLog('updatePoolData');

    debugLog('poolsData', data);
    runInAction(() => {
      this.poolsData = data;
    });
  }

  setTokenPrice(price) {
    runInAction(() => {
      this.tokenPrice = price;
    });
  }

  setTokenChange(change) {
    runInAction(() => {
      this.tokenChange = change;
    });
  }
}

const appStore = new AppStore();
export default appStore;
