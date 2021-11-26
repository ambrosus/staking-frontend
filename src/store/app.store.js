import { makeAutoObservable, runInAction } from 'mobx';
import {StakingWrapper} from "../services/staking.wrapper";

export class AppStore {
  constructor() {
    this.poolData = [];
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

  updatePoolData(signer = null) {
    this.poolData = signer ? getSigner(signer) : getWithoutSigner();
   // const inst = StakingWrapper.getInstance()
   // this.poolData = inst.getPoolData(poolInfo.index)

    return wer;
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
