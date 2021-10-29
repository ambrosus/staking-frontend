/* eslint-disable */

import { ethers, BigNumber } from 'ethers';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18);             // 1.0 ether
const MINSHOWSTAKE = FIXEDPOINT.div(100);   // 0.01 ether

function formatFixed(bigNumber, digits = 18) {
  digits = Math.floor(digits);
  if (digits < 0 || digits > 18) {
    throw new Error('digits out of range');
  }
  const whole = bigNumber.div(FIXEDPOINT).toString();
  if (!digits) {
    return whole;
  }
  const pow10 = TEN.pow(digits);
  const fract = bigNumber.mod(pow10).add(pow10).toString().slice(1);

  return `${whole}.${fract}`;
}

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

  async getPoolData() {
    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens] = await Promise.all(
      [
        this.poolContract.totalStake(),
        this.poolContract.getTokenPrice(),
        this.poolContract.viewStake(),
      ],
    );
    const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXEDPOINT);
    return [totalStakeInAMB, myStakeInAMB, tokenPriceAMB, myStakeInTokens];
  }
}

export { StakingWrapper, formatFixed, ZERO, ONE, TEN, FIXEDPOINT, MINSHOWSTAKE };
