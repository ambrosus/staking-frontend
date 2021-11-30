import { BigNumber, ethers } from 'ethers';
import { transactionGasLimit, transactionGasPrice } from '../config';

import NewStakingWrapper from './newsw';
import {
  math,
  ZERO,
  ONE,
  TEN,
  FIXED_POINT,
  THOUSAND,
  MIN_SHOW_STAKE,
} from './numbers';

function formatRounded(bigNumber, digits = 18) {
  if (!bigNumber || !BigNumber.isBigNumber(bigNumber)) {
    throw new Error('not a BigNumber');
  }
  const digitsCopy = Math.floor(digits);
  if (digitsCopy < 0 || digitsCopy > 18) {
    throw new Error('digits out of range');
  }
  const mathBn = math.bignumber(ethers.utils.formatEther(bigNumber));
  return math.format(mathBn.round(digitsCopy), {
    notation: 'fixed',
    precision: digitsCopy,
  });
}

function checkValidNumberString(str) {
  try {
    parseFloatToBigNumber(str);
    return true;
  } catch (err) {
    return false;
  }
}

function parseFloatToBigNumber(str) {
  const mathBn = math.bignumber(str);
  return ethers.utils.parseEther(math.round(mathBn, 18).toString());
}

class StakingWrapper {
  static privateInstance = null;

  static createInstance(loggedIn = false) {
    console.log('## createInstance', loggedIn);
    this.privateInstance = new StakingWrapper();
    return this.privateInstance;
  }

  static getInstance() {
    console.log('## getInstance');
    return this.privateInstance;
  }

  async getPools() {
    this.poolsData = await NewStakingWrapper.getPools(
      window.location.pathname !== '/',
    );

    return this.poolsData;
  }

  async getPoolData(index) {
    console.log('getPoolData', index, this.poolsData[index]);
    if (typeof index !== 'number') {
      throw new Error('no pool index provided');
    }
    return this.poolsData[index];
  }

  async stake(index, value) {
    const overrides = {
      value: parseFloatToBigNumber(value),
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    const poolContract = this.poolsData[index].contract; // todo: do not use index !!

    console.log('.stake', index, value);

    try {
      overrides.gasLimit = await poolContract.estimateGas.stake(overrides);
      console.log('gasLimit', overrides.gasLimit.toString());
    } catch (err) {
      console.log('stake error', err);
      return null;
    }

    return poolContract.stake(overrides);
  }

  async unstake(index, value, fullUnstake = false) {
    const { tokenPriceAMB, myStakeInTokens } =
      await StakingWrapper.getInstance().getPoolData(index);

    const calculatedTokens = parseFloatToBigNumber(value)
      .mul(FIXED_POINT)
      .div(tokenPriceAMB);

    const overrides = {
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    const poolContract = this.poolsData[index].contract; // todo: do not use index !!

    const tokens = fullUnstake ? myStakeInTokens : calculatedTokens;

    console.log('unstake', index, value, fullUnstake, tokens.toString());

    try {
      overrides.gasLimit = await poolContract.estimateGas.unstake(
        tokens,
        overrides,
      );
      console.log('gasLimit', overrides.gasLimit.toString());
    } catch (err) {
      console.log('unstake error', err);
      return null;
    }

    return poolContract.unstake(tokens, overrides);
  }
}

const createStakingWrapper = StakingWrapper.createInstance;
const getStakingWrapper = StakingWrapper.getInstance;

export {
  StakingWrapper,
  createStakingWrapper,
  getStakingWrapper,
  formatRounded,
  parseFloatToBigNumber,
  checkValidNumberString,
  ZERO,
  ONE,
  TEN,
  FIXED_POINT,
  MIN_SHOW_STAKE,
  THOUSAND,
};
