/* eslint-disable */

import { ethers } from 'ethers';

const FIXEDPOINT = ethers.utils.parseUnits('1.0', 'ether');
const MINSHOWSTAKE = ethers.utils.parseUnits('0.01', 'ether');

class StakingWrapper {
  constructor(providerOrSigner, poolInfo) {
    if (!providerOrSigner || !poolInfo) {
      throw new Error('providerOrSigner and poolInfo not set');
    }
    this.poolContract = new ethers.Contract(
      poolInfo.address,
      poolInfo.abi,
      providerOrSigner,
    );
  }

  async getUserData() {
    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens] = await Promise.all(
      [
        this.poolContract.totalStake(),
        this.poolContract.getTokenPrice(),
        this.poolContract.viewStake(),
      ],
    );
    const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXEDPOINT);
    return [totalStakeInAMB, tokenPriceAMB, myStakeInAMB, myStakeInTokens];
  }

  async getPoolData(provider) {}
}

export { StakingWrapper, FIXEDPOINT, MINSHOWSTAKE };
