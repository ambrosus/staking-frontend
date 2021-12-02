import { ethers, providers } from 'ethers';
import { contractJsons, pool } from 'ambrosus-node-contracts';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';
import { ethereum, transactionGasLimit, transactionGasPrice } from '../config';
import { math, FIXED_POINT, parseFloatToBigNumber } from './numbers';
import { debugLog } from '../utils/helpers';

const AVERAGING_PERIOD = 10 * 24 * 60 * 60; // 10 days

const dailyPercentageYieldExpression = math.compile(
  '(price2 / price1) ^ (86400 / (time2 - time1)) - 1',
);

const start = Date.now();

function xxxLog(...agrs) {
  debugLog(`${((Date.now() - start) / 1000).toFixed(2)}`, ...agrs);
}

export default class StakingWrapper {
  static privateProvider = null;

  static privateLastBlock = 0;

  static privateRewardEvents = [];

  static poolsStore = null;

  static poolEventsEmitter = null;

  static privateStaticConstructorPromise = (async () => {
    xxxLog('StakingWrapper static constructor');

    this.privateProvider = new providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL,
    );

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
    const [poolEventsEmitterAddr, poolsStoreAddr] = await Promise.all([
      storageCatalogueContr.poolEventsEmitter(),
      storageCatalogueContr.poolsStore(),
    ]);
    this.poolEventsEmitter = new ethers.Contract(
      poolEventsEmitterAddr,
      contractJsons.poolEventsEmitter.abi,
      this.privateProvider,
    );
    this.poolsStore = new ethers.Contract(
      poolsStoreAddr,
      contractJsons.poolsStore.abi,
      this.privateProvider,
    );
    xxxLog('StakingWrapper done');
  })();

  static async getRewardEvents(from, to) {
    const blocks = 20000;
    const eventsPromises = [];
    for (let xFrom = from; xFrom < to; xFrom += blocks) {
      const xTo = Math.min(xFrom + blocks - 1, to);
      eventsPromises.push(
        this.poolEventsEmitter.queryFilter(
          this.poolEventsEmitter.filters.PoolReward(null, null, null),
          xFrom,
          xTo,
        ),
      );
    }
    const eventsArrays = await Promise.all(eventsPromises);
    return eventsArrays.flatMap((arr) => arr);
  }

  static async updateRewardEvents() {
    const currentBlockNumber = await this.privateProvider.getBlockNumber();
    if (currentBlockNumber > this.privateLastBlock) {
      const startBlockNumber =
        currentBlockNumber - Math.floor(AVERAGING_PERIOD / 5);

      const rewardEvents = await this.getRewardEvents(
        this.privateLastBlock ? this.privateLastBlock + 1 : startBlockNumber,
        currentBlockNumber,
      );
      this.privateLastBlock = currentBlockNumber;
      this.privateRewardEvents = this.privateRewardEvents
        .filter((event) => event.blockNumber > startBlockNumber)
        .concat(rewardEvents);
      xxxLog(
        'getRewardEvents',
        startBlockNumber,
        this.privateLastBlock ? this.privateLastBlock + 1 : startBlockNumber,
        currentBlockNumber,
        this.privateRewardEvents.length,
      );
    }
  }

  static async getPoolsXX() {
    const poolsCount = await this.poolsStore.getPoolsCount();
    return this.poolsStore.getPools(0, poolsCount);
  }

  static async getPools(loggedIn = false) {
    xxxLog('## getPools');
    const providerOrSigner = loggedIn
      ? new providers.Web3Provider(ethereum).getSigner()
      : this.privateProvider;

    await this.privateStaticConstructorPromise;

    const [poolsAddrs] = await Promise.all([
      this.getPoolsXX(),
      this.updateRewardEvents(),
    ]);

    const poolsDataPromises = poolsAddrs.map(async (poolAddr, index) => {
      const poolContract = new ethers.Contract(
        poolAddr,
        pool.abi,
        providerOrSigner,
      );
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
        this.privateGetDPY(poolAddr),
      ]);

      const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXED_POINT);

      const poolAPY = math
        .chain(poolDPY)
        .add(1)
        .pow(365)
        .subtract(1)
        .multiply(100)
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

      return {
        index,
        contractName,
        address: poolAddr,
        active,
        contract: poolContract,
        totalStakeInAMB,
        tokenPriceAMB,
        myStakeInTokens,
        myStakeInAMB,
        poolAPY,
        estAR,
      };
    });

    return Promise.all(poolsDataPromises);
  }

  static async privateGetDPY(poolAddr) {
    const rewardEvents = this.privateRewardEvents;
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

    return dailyPercentageYieldExpression.evaluate({
      price1: math.bignumber(firstReward.tokenPrice.toString()),
      price2: math.bignumber(lastReward.tokenPrice.toString()),
      time1: firstReward.timestamp,
      time2: lastReward.timestamp,
    });
  }

  static async stake(poolInfo, value) {
    const overrides = {
      value: parseFloatToBigNumber(value),
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    const poolContract = poolInfo.contract;

    xxxLog('.stake', poolInfo.index, value);

    try {
      overrides.gasLimit = await poolContract.estimateGas.stake(overrides);
      xxxLog('gasLimit', overrides.gasLimit.toString());
      return poolContract.stake(overrides);
    } catch (err) {
      xxxLog('stake error', err);
      return null;
    }
  }

  static async unstake(poolInfo, value, fullUnstake = false) {
    xxxLog('unstake', poolInfo.contractName, value, fullUnstake);

    const poolContract = poolInfo.contract;
    const [tokenPriceAMB, myStakeInTokens] = await Promise.all([
      poolContract.getTokenPrice(),
      poolContract.viewStake(),
    ]);

    const tokens = fullUnstake
      ? myStakeInTokens
      : parseFloatToBigNumber(value).mul(FIXED_POINT).div(tokenPriceAMB);

    xxxLog(
      'unstake ##',
      poolInfo.index,
      value,
      fullUnstake,
      tokens.toString(),
      tokenPriceAMB.toString(),
    );

    const overrides = {
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    try {
      overrides.gasLimit = await poolContract.estimateGas.unstake(
        tokens,
        overrides,
      );
      xxxLog('gasLimit', overrides.gasLimit.toString());
      return poolContract.unstake(tokens, overrides);
    } catch (err) {
      xxxLog('unstake error', err);
      return null;
    }
  }
}
