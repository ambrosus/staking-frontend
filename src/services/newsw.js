import { ethers, providers } from 'ethers';
import { Mutex } from 'async-mutex';
import { contractJsons, pool } from 'ambrosus-node-contracts';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';
import { ethereum } from '../config';
import {
  math,
  // ZERO,
  // ONE,
  // TEN,
  FIXED_POINT,
  // THOUSAND,
  // MIN_SHOW_STAKE,
} from './numbers';

const AVERAGING_PERIOD = 7 * 24 * 60 * 60; // 7 days

const exprDPY = math.compile('(s2 / s1) ^ (86400 / (t2 - t1)) - 1');

const start = Date.now();

function xxxLog(...agrs) {
  console.log(`${((Date.now() - start) / 1000).toFixed(2)}`, ...agrs);
}

export default class NewStakingWrapper {
  static privateProvider = null;

  static privateLastBlock = 0;

  static privateRewardEvents = [];

  static poolsStore = null;

  static poolEventsEmitter = null;

  static mutex = new Mutex();

  static privateStaticConstructorPromise = (async () => {
    xxxLog('NewStakingWrapper static constructor called'); // once!

    this.privateProvider = new providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL,
    );
    xxxLog('privateProvider', this.privateProvider);

    const headContract = new ethers.Contract(
      headContractAddress,
      contractJsons.head.abi,
      this.privateProvider,
    );
    const contextContract = new ethers.Contract(
      await headContract.context(),
      contractJsons.context.abi,
      this.privateProvider,
    );
    const storageCatalogueContr = new ethers.Contract(
      await contextContract.storageCatalogue(),
      contractJsons.storageCatalogue.abi,
      this.privateProvider,
    );
    this.poolEventsEmitter = new ethers.Contract(
      await storageCatalogueContr.poolEventsEmitter(),
      contractJsons.poolEventsEmitter.abi,
      this.privateProvider,
    );
    this.poolsStore = new ethers.Contract(
      await storageCatalogueContr.poolsStore(),
      contractJsons.poolsStore.abi,
      this.privateProvider,
    );
    this.getRewardEvents(); // prefetch events
    xxxLog('NewStakingWrapper done');
  })();

  static async getRewardEvents() {
    xxxLog('getRewardEvents start');
    await this.privateStaticConstructorPromise;

    await this.mutex.runExclusive(async () => {
      xxxLog('getRewardEvents enter');
      const currentBlockNumber = await this.privateProvider.getBlockNumber();
      const startBlockNumber =
        currentBlockNumber - Math.floor(AVERAGING_PERIOD / 5);
      // ^ move down
      if (currentBlockNumber > this.privateLastBlock) {
        xxxLog(
          'getRewardEvents request',
          this.privateLastBlock ? this.privateLastBlock + 1 : startBlockNumber,
          currentBlockNumber,
        );
        const rewardEvents = await this.poolEventsEmitter.queryFilter(
          this.poolEventsEmitter.filters.PoolReward(null, null, null),
          this.privateLastBlock ? this.privateLastBlock + 1 : startBlockNumber,
          currentBlockNumber,
        );
        this.privateLastBlock = currentBlockNumber;
        this.privateRewardEvents = this.privateRewardEvents
          .filter((event) => event.blockNumber > startBlockNumber)
          .concat(rewardEvents);
      }

      xxxLog(
        'getRewardEvents',
        startBlockNumber,
        currentBlockNumber,
        this.privateRewardEvents.length,
      );
    });

    // const sleep = (t) => new Promise((s) => setTimeout(s, t));

    // await sleep(10000);

    // xxxLog('###########################################');

    return this.privateRewardEvents;
  }

  static async getPools(loggedIn = false) {
    await this.privateStaticConstructorPromise;

    const providerOrSigner = loggedIn
      ? new providers.Web3Provider(ethereum).getSigner()
      : this.privateProvider;

    xxxLog('## getPools', loggedIn, providerOrSigner);

    const poolsCount = await this.poolsStore.getPoolsCount();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    this.pools = poolsAddrs.map(
      (poolAddr) => new ethers.Contract(poolAddr, pool.abi, providerOrSigner),
    );

    const poolsDataPromises = this.pools.map(async (poolContract, index) => {
      const [
        contractName,
        active,
        totalStakeInAMB,
        tokenPriceAMB,
        myStakeInTokens,
        poolDPY,
      ] = await Promise.all([
        poolContract.name(),
        poolContract.active(),
        poolContract.totalStake(),
        poolContract.getTokenPrice(),
        poolContract.viewStake(),
        this.privateGetDPY(poolContract.address),
      ]);

      const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXED_POINT);
      const { poolAPY, estDR, estAR } = this.privateGetAPY(
        poolDPY,
        myStakeInAMB,
      );
      return {
        index,
        contractName,
        address: poolContract.address,
        abi: poolContract.abi,
        active,
        contract: poolContract,
        totalStake: totalStakeInAMB,
        totalStakeInAMB,
        tokenPriceAMB,
        myStakeInTokens,
        myStakeInAMB,
        poolAPY,
        estDR,
        estAR,
      };
    });

    return Promise.all(poolsDataPromises);
  }

  static async privateGetDPY(poolAddr) {
    await this.privateStaticConstructorPromise;

    const rewardEvents = await this.getRewardEvents();
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
        .filter((_, idx, array) => idx === 0 || idx === array.length - 1)
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

  static privateGetAPY(poolDPY, myStakeInAMB) {
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
      .divide(FIXED_POINT.toString())
      .round(2)
      .done()
      .toFixed(2);
    const estAR = math
      .chain(poolAPY)
      .divide(100)
      .multiply(myStakeInAMB.toString())
      .divide(FIXED_POINT.toString())
      .round(2)
      .done()
      .toFixed(2);

    return { poolAPY, estDR, estAR };
  }
}
