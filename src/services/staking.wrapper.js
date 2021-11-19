/* eslint-disable */

import { contractJsons, pool } from 'ambrosus-node-contracts';
import { BigNumber, ethers, providers } from 'ethers';
import { all, create } from 'mathjs';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18);
const MINSHOWSTAKE = FIXEDPOINT.div(100);
const THOUSAND = FIXEDPOINT.mul(1000);

const AVERAGING_PERIOD = 10 * 24 * 60 * 60;

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

const exprDPY = math.compile('(s2 / s1) ^ (86400 / (t2 - t1)) - 1');

function formatRounded(bigNumber, digits = 18) {
  if (!bigNumber || !BigNumber.isBigNumber(bigNumber)) {
    throw new Error('not a BigNumber');
  }
  digits = Math.floor(digits);
  if (digits < 0 || digits > 18) {
    throw new Error('digits out of range');
  }
  const mathBn = math.bignumber(ethers.utils.formatEther(bigNumber));
  return math.format(mathBn.round(digits), {
    notation: 'fixed',
    precision: digits,
  });
}

function checkValidNumberString(str) {
  let ret = false;
  try {
    parseFloatToBigNumber(str);
    ret = true;
  } catch (err) {}
  return ret;
}

function parseFloatToBigNumber(str) {
  const mathBn = math.bignumber(str);
  return ethers.utils.parseEther(math.round(mathBn, 18).toString());
}

class StakingWrapper {
  constructor(providerOrSigner = null) {
    if (!providerOrSigner) {
      providerOrSigner = new providers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL,
      );
    }
    this._providerOrSigner = providerOrSigner;

    this._initPromise = this._initialize();
  }

  async _initialize() {
    this.headContract = new ethers.Contract(
      headContractAddress,
      contractJsons.head.abi,
      this._providerOrSigner,
    );
    const contextContract = new ethers.Contract(
      await this.headContract.context(),
      contractJsons.context.abi,
      this._providerOrSigner,
    );
    const storageCatalogueContr = new ethers.Contract(
      await contextContract.storageCatalogue(),
      contractJsons.storageCatalogue.abi,
      this._providerOrSigner,
    );
    this.poolEventsEmitter = new ethers.Contract(
      await storageCatalogueContr.poolEventsEmitter(),
      contractJsons.poolEventsEmitter.abi,
      this._providerOrSigner,
    );
    this.poolsStore = new ethers.Contract(
      await storageCatalogueContr.poolsStore(),
      contractJsons.poolsStore.abi,
      this._providerOrSigner,
    );
  }

  async getPools() {
    await this._initPromise;

    const poolsCount = await this.poolsStore.getPoolsCount();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    this._pools = poolsAddrs.map(
      (poolAddr) =>
        new ethers.Contract(poolAddr, pool.abi, this._providerOrSigner),
    );

    return Promise.all(
      this._pools.map(async (_pool, index) => {
        const info = await Promise.all([
          _pool.name(),
          _pool.active(),
          _pool.totalStake(),
        ]);
        return {
          index,
          contractName: info[0],
          address: _pool.address,
          abi: pool.abi,
          active: info[1],
          contract: _pool,
          totalStake: info[2],
        };
      }),
    );
  }

  async getPoolData(index) {
    if (typeof index !== 'number') {
      throw new Error('no pool index provided');
    }
    await this._initPromise;

    if (!this._pools) await this.getPools();

    const poolContract = this._pools[index];

    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens, poolDPY] =
      await Promise.all([
        poolContract.totalStake(),
        poolContract.getTokenPrice(),
        poolContract.viewStake(),
        this._getDPY(index),
      ]);
    const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXEDPOINT);
    const poolAPY = math
      .chain(poolDPY)
      .add(1)
      .pow(365)
      .subtract(1)
      .multiply(100)
      .round(2)
      .done()
      .toFixed(2);
    const estDR = math
      .chain(poolDPY)
      .multiply(myStakeInAMB.toString())
      .divide(FIXEDPOINT.toString())
      .round(2)
      .done()
      .toFixed(2);
    const estAR = math
      .chain(poolAPY)
      .divide(100)
      .multiply(myStakeInAMB.toString())
      .divide(FIXEDPOINT.toString())
      .round(2)
      .done()
      .toFixed(2);
    return {
      totalStakeInAMB,
      myStakeInAMB,
      tokenPriceAMB,
      myStakeInTokens,
      poolAPY,
      estDR,
      estAR,
    };
  }

  async _getDPY(index = null) {
    await this._initPromise;

    const poolAddr = this._pools[index].address;

    const rewardEvents = await this.poolEventsEmitter.queryFilter(
      this.poolEventsEmitter.filters.PoolReward(null, null, null),
      -Math.floor(AVERAGING_PERIOD / 5),
    );

    if (!rewardEvents || rewardEvents.length < 2) return 0;

    const sortedPoolRewards = rewardEvents
      .filter((event) => event.args.pool === poolAddr)
      .sort((a, b) => {
        if (a.args.tokenPrice.gt(b.args.tokenPrice)) {
          return 1;
        }
        if (a.args.tokenPrice.lt(b.args.tokenPrice)) {
          return -1;
        }
        return 0;
      });
    if (!sortedPoolRewards || sortedPoolRewards.length < 2) return 0;

    const [firstReward, lastReward] = await Promise.all(
      sortedPoolRewards
        .filter((_, index, array) => index === 0 || index === array.length - 1)
        .map(async (event) => ({
          blockNumber: event.blockNumber,
          timestamp: (await event.getBlock()).timestamp,
          pool: event.args.pool,
          reward: event.args.reward,
          tokenPrice: event.args.tokenPrice,
        })),
    );

    if (lastReward.timestamp - firstReward.timestamp < 300) return 0;

    return exprDPY.evaluate({
      s1: math.bignumber(firstReward.tokenPrice.toString()),
      s2: math.bignumber(lastReward.tokenPrice.toString()),
      t1: firstReward.timestamp,
      t2: lastReward.timestamp,
    });
  }
}

export {
  StakingWrapper,
  formatRounded,
  parseFloatToBigNumber,
  checkValidNumberString,
  ZERO,
  ONE,
  TEN,
  FIXEDPOINT,
  MINSHOWSTAKE,
  THOUSAND,
};
