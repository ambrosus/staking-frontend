/* eslint-disable */

import { contractJsons, pool } from 'ambrosus-node-contracts';
import { ethers, BigNumber } from 'ethers';
import { create, all } from 'mathjs';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18); // 1.0 ether
const MINSHOWSTAKE = FIXEDPOINT.div(100); // 0.01 ether
const THOUSAND = FIXEDPOINT.mul(1000); // 1000 ether

const AVERAGING_PERIOD = 0.8 * 24 * 60 * 60; // 1 day

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

const exprDPY = math.compile('(s1 / s2) ^ (86400 / (t2 - t1)) - 1');

const headContractAddress = '0x0000000000000000000000000000000000000F10';

function formatFixed(bigNumber, digits = 18) {
  digits = Math.floor(digits);
  if (bigNumber && ethers.BigNumber.isBigNumber(bigNumber)) {
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
}

class StakingWrapper {
  constructor(providerOrSigner = null) {
    //  console.log('StakingWrapper', providerOrSigner);
    if (!providerOrSigner) {
      providerOrSigner = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL,
      );
    }
    this.providerOrSigner = providerOrSigner;

    this.initPromise = this._initialize();
  }

  async _initialize() {
    const now = Math.floor(Date.now()/1000);
    const blocksCount = Math.floor(AVERAGING_PERIOD/5);
    const block = await this.providerOrSigner.provider.getBlock(-blocksCount);
    console.log('block', blocksCount, block.number, now - block.timestamp - AVERAGING_PERIOD, (now - block.timestamp)/blocksCount);

    this.headContract = new ethers.Contract(
      headContractAddress,
      contractJsons.head.abi,
      this.providerOrSigner,
    );
    const contextContract = new ethers.Contract(
      await this.headContract.context(),
      contractJsons.context.abi,
      this.providerOrSigner,
    );
    const storageCatalogueContr = new ethers.Contract(
      await contextContract.storageCatalogue(),
      contractJsons.storageCatalogue.abi,
      this.providerOrSigner,
    );
    this.poolEventsEmitter = new ethers.Contract(
      await storageCatalogueContr.poolEventsEmitter(),
      contractJsons.poolEventsEmitter.abi,
      this.providerOrSigner,
    );
    this.poolsStore = new ethers.Contract(
      await storageCatalogueContr.poolsStore(),
      contractJsons.poolsStore.abi,
      this.providerOrSigner,
    );

    const poolsCount = await this.poolsStore.getPoolsCount();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    this.pools = poolsAddrs.map(
      (poolAddr) =>
        new ethers.Contract(poolAddr, pool.abi, this.providerOrSigner),
    );
  }

  async getPools() {
    await this.initPromise;

    return Promise.all(
      this.pools.map(async (_pool, index) => {
        const info = await Promise.all([_pool.name(), _pool.active()]);
        return {
          index,
          contractName: info[0],
          address: _pool.address,
          abi: pool.abi,
          active: info[1],
        };
      }),
    );
  }

  async getPoolData(index) {
    if (typeof index !== 'number') {
      throw new Error('no pool index provided');
    }
    await this.initPromise;

    const poolContract = this.pools[index];

    //  console.log('getPoolData');
    // console.log('pools:', await this.getPools());
    //if (typeof index === 'number') console.log('apy:', await this.getAPY(index));

    //  console.log('count', await this.getPoolsCount());

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
    const poolData = {
      totalStakeInAMB,
      myStakeInAMB,
      tokenPriceAMB,
      myStakeInTokens,
      poolAPY,
      estDR,
    };
    console.log(poolData);
    return poolData;
  }

  async _getDPY(index = null) {
    await this.initPromise;

    const rewardEvents = await this.poolEventsEmitter.queryFilter(
      this.poolEventsEmitter.filters.PoolReward(null, null, null),
      -Math.floor(AVERAGING_PERIOD/5),
      'latest',
    );

    const sortedPoolRewards = rewardEvents
      .filter(event => event.args.pool === this.pools[index].address)
      .sort((a, b) => a.args.tokenPrice.gte(b.args.tokenPrice));

    // console.log(sortedPoolRewards);

    console.log('REWARD:', await Promise.all(sortedPoolRewards.map(async event => ({
      n:event.blockNumber,
      p:event.args.tokenPrice.toString(),
      f:(await event.getTransactionReceipt()).from,
      r:event.args.reward.toString()
    }))));

    const [firstReward, lastReward] = await Promise.all(sortedPoolRewards
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .map(async event => ({
        blockNumber: event.blockNumber,
        timestamp: (await event.getBlock()).timestamp,
        pool: event.args.pool,
        reward: event.args.reward,
        tokenPrice: event.args.tokenPrice,
      })));

    const dpy = exprDPY.evaluate({
      s1:math.bignumber(firstReward.tokenPrice.toString()),
      s2:math.bignumber(lastReward.tokenPrice.toString()),
      t1: lastReward.timestamp,
      t2: firstReward.timestamp
    });

    console.log('dpy:', dpy.toString());
    return dpy;
  }
}

export {
  StakingWrapper,
  formatFixed,
  ZERO,
  ONE,
  TEN,
  FIXEDPOINT,
  MINSHOWSTAKE,
  THOUSAND,
};
