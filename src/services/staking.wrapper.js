/* eslint-disable */

import { contractJsons, pool } from 'ambrosus-node-contracts';
import { ethers, BigNumber } from 'ethers';
import { create, all } from 'mathjs';
import EthDater from 'ethereum-block-by-date';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18); // 1.0 ether
const MINSHOWSTAKE = FIXEDPOINT.div(100); // 0.01 ether

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

const headContractAddress = '0x0000000000000000000000000000000000000F10';

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
    this.headContract = new ethers.Contract(
      headContractAddress,
      contractJsons.head.abi,
      this.providerOrSigner,
    );
    const contextAddr = await this.headContract.context();
    //  console.log('contextAddr',contextAddr);
    const contextContract = new ethers.Contract(
      contextAddr,
      contractJsons.context.abi,
      this.providerOrSigner,
    );
    const storageCatalogueAddr = await contextContract.storageCatalogue();
    //  console.log('storageCatalogueAddr',storageCatalogueAddr);
    const storageCatalogueContr = new ethers.Contract(
      storageCatalogueAddr,
      contractJsons.storageCatalogue.abi,
      this.providerOrSigner,
    );
    const poolEventsEmitterAddr =
      await storageCatalogueContr.poolEventsEmitter();
    this.poolEventsEmitter = new ethers.Contract(
      poolEventsEmitterAddr,
      contractJsons.poolEventsEmitter.abi,
      this.providerOrSigner,
    );
    const poolsStoreAddr = await storageCatalogueContr.poolsStore();
    //  console.log('poolsStoreAddr',poolsStoreAddr);
    this.poolsStore = new ethers.Contract(
      poolsStoreAddr,
      contractJsons.poolsStore.abi,
      this.providerOrSigner,
    );

    const poolsCount = (await this.poolsStore.getPoolsCount()).toNumber();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    //  console.log('pools', poolsAddrs);
    this.pools = poolsAddrs.map(
      (poolAddr) =>
        new ethers.Contract(poolAddr, pool.abi, this.providerOrSigner),
    );
    //  console.log(this.pools[0]);
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
        this.getDPY(index),
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
      .toNumber()
      .toFixed(2);
    const estDR = math
      .chain(myStakeInAMB.toString())
      .multiply(poolDPY)
      .divide(FIXEDPOINT.toString())
      .round(2)
      .done()
      .toNumber()
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

  async getDPY(index = null) {
    await this.initPromise;
    /*
    const dater = new EthDater(this.providerOrSigner);
    const block = await dater.getDate(
      new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    );
    //  console.log('block', block);
*/
    const rewardEvents = await this.poolEventsEmitter.queryFilter(
      this.poolEventsEmitter.filters.PoolReward(null, null, null),
      452200,
      'latest',
    );
    //console.log('rewardEvents:', index, rewardEvents);

    const poolRewards = [];
    for (let ev of rewardEvents) {
      if (ev.args.pool !== this.pools[index].address) continue;
      //console.log('ev', ev.blockNumber, ev.args.pool, ev.args.tokenPrice.toString(), (await ev.getBlock()).timestamp);
      poolRewards.push({
        bn: ev.blockNumber,
        ts: (await ev.getBlock()).timestamp,
        pool: ev.args.pool,
        price: ethers.utils.formatEther(ev.args.tokenPrice),
        rewardS: ethers.utils.formatEther(ev.args.reward),
        reward: ev.args.reward,
        tokenPrice: ev.args.tokenPrice,
      });
    }
    const fee = await this.pools[index].fee();
    //console.log('fee', fee.toString(), fee.toNumber()/1000000);
    //console.log('poolRewards',poolRewards);
    const f = poolRewards.shift();
    const l = poolRewards.pop();

    const n = (365 * 24 * 60 * 60) / (+l.ts - +f.ts);
    const s = l.tokenPrice.mul(FIXEDPOINT).div(f.tokenPrice);
    //console.log({n, s:s.toString(), ss:ethers.utils.formatEther(s), f, l});

    const s1 = f.tokenPrice.toString();
    const s2 = l.tokenPrice.toString();

    const xx = `( ((${s2}) / (${s1})) ^ ( 86400 / ((${l.ts}) - (${f.ts})) ) ) - 1`;
    const dpy = math.evaluate(xx);
    //console.log(math.chain(dpy).add(1).pow(365).subtract(1).round(8).toString(), math.round(dpy,8).toString(), '=', xx);

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
};
