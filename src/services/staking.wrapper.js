import { ethers, providers } from 'ethers';
import { contractJsons, pool } from 'ambrosus-node-contracts';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';
import { ethereum, transactionGasLimit, transactionGasPrice } from '../config';
import { math, FIXED_POINT, parseFloatToBigNumber } from './numbers';

const AVERAGING_PERIOD = 7 * 24 * 60 * 60; // 7 days

const dailyPercentageYieldExpression = math.compile(
  '(price2 / price1) ^ (86400 / (time2 - time1)) - 1',
);

const start = Date.now();

function xxxLog(...agrs) {
  console.log(`${((Date.now() - start) / 1000).toFixed(2)}`, ...agrs);
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
    // this.getRewardEvents(); // prefetch events
    xxxLog('StakingWrapper done');
  })();

  static async getRewardEvents() {
    const currentBlockNumber = await this.privateProvider.getBlockNumber();
    if (currentBlockNumber > this.privateLastBlock) {
      const startBlockNumber =
        currentBlockNumber - Math.floor(AVERAGING_PERIOD / 5);
      const rewardEvents = await this.poolEventsEmitter.queryFilter(
        this.poolEventsEmitter.filters.PoolReward(null, null, null),
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
    const providerOrSigner = loggedIn
      ? new providers.Web3Provider(ethereum).getSigner()
      : this.privateProvider;

    await this.privateStaticConstructorPromise;

    const [poolsAddrs] = await Promise.all([
      this.getPoolsXX(),
      this.getRewardEvents(),
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
      const { poolAPY, estAR } = this.privateGetAPY(poolDPY, myStakeInAMB);
      return {
        index,
        contractName,
        address: poolAddr,
        // abi: pool.abi,
        active,
        contract: poolContract,
        // totalStake: totalStakeInAMB,
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
    // await this.privateStaticConstructorPromise;

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
    const estAR = math
      .chain(poolAPY)
      .divide(100)
      .multiply(myStakeInAMB.toString())
      .divide(FIXED_POINT.toString())
      .round(2)
      .done()
      .toFixed(2);

    return { poolAPY, estAR };
  }

  static async stake(poolInfo, value) {
    const overrides = {
      value: parseFloatToBigNumber(value),
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    const poolContract = poolInfo.contract;

    console.log('.stake', poolInfo.index, value);

    try {
      overrides.gasLimit = await poolContract.estimateGas.stake(overrides);
      console.log('gasLimit', overrides.gasLimit.toString());
    } catch (err) {
      console.log('stake error', err);
      return null;
    }

    return poolContract.stake(overrides);
  }

  static async unstake(poolInfo, value, fullUnstake = false) {
    console.log('unstake', poolInfo.contractName, value, fullUnstake);

    const poolContract = poolInfo.contract;
    const [tokenPriceAMB, myStakeInTokens] = await Promise.all([
      poolContract.getTokenPrice(),
      poolContract.viewStake(),
    ]);

    const tokens = fullUnstake
      ? myStakeInTokens
      : parseFloatToBigNumber(value).mul(FIXED_POINT).div(tokenPriceAMB);

    console.log(
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
      console.log('gasLimit', overrides.gasLimit.toString());
    } catch (err) {
      console.log('unstake error', err);
      return null;
    }

    return poolContract.unstake(tokens, overrides);
  }
}
