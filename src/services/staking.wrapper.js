/* eslint-disable */

import { ethers, providers } from 'ethers';
import { contractJsons, pool } from 'ambrosus-node-contracts';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';
import {
  abiPoolsWithLimit,
  network,
  transactionGasLimit,
  transactionGasPrice,
} from 'config';
import { math, FIXED_POINT, parseFloatToBigNumber, ZERO } from './numbers';
import { debugLog, formatDate } from 'utils/helpers';
import moment from 'moment';
import { object } from 'prop-types';

const AVERAGING_PERIOD = 10 * 24 * 60 * 60; // 10 days

const dailyPercentageYieldExpression = math.compile(
  '(price2 / price1) ^ (86400 / (time2 - time1)) - 1',
);

export default class StakingWrapper {
  static privateProvider = null;

  static privateLastBlock = 0;

  static privateRewardEvents = [];

  static poolsStore = null;

  static poolEventsEmitter = null;

  static privateStaticConstructorPromise = (async () => {
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
    debugLog('StakingWrapper done');
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
      const startBlockNumber = Math.max(
        0,
        currentBlockNumber - Math.floor(AVERAGING_PERIOD / 5),
      );

      const rewardEvents = await this.getRewardEvents(
        this.privateLastBlock ? this.privateLastBlock + 1 : startBlockNumber,
        currentBlockNumber,
      );
      this.privateLastBlock = currentBlockNumber;
      this.privateRewardEvents = this.privateRewardEvents
        .filter((event) => event.blockNumber > startBlockNumber)
        .concat(rewardEvents);
    }
  }

  static async getPools() {
    const poolsCount = await this.poolsStore.getPoolsCount();
    return poolsCount && poolsCount.gt(ZERO)
      ? this.poolsStore.getPools(0, poolsCount)
      : null;
  }

  static async getPoolsData(loggedIn, connector) {
    const providerOrSigner = loggedIn
      ? new providers.Web3Provider(connector).getSigner()
      : this.privateProvider;

    await this.privateStaticConstructorPromise;

    const [poolsAddrs] = await Promise.all([
      this.getPools(),
      this.updateRewardEvents(),
    ]);

    if (!poolsAddrs || !poolsAddrs.length) return [];
    const poolsApi = await fetch(
      network
        ? 'https://staking-api.ambrosus.io/pools/v2'
        : 'https://staking-api.ambrosus-test.io/pools/v2',
    );
    const response = await poolsApi.json();
    const polsApiData = response.data;

    const poolsDataPromises = poolsAddrs.map(async (poolAddr, index) => {
      const poolContract = new ethers.Contract(
        poolAddr,
        poolAddr === '0x7fecce438b087a83E95C91DC168ad3D150225543'
          ? abiPoolsWithLimit
          : pool.abi,
        providerOrSigner,
      );
      const [
        contractName,
        active,
        totalStakeInAMB,
        tokenPriceAMB,
        myStakeInTokens,
        maxPoolTotalStake,
        maxUserTotalStake,
        userStake,
      ] = await Promise.all([
        poolContract.name && poolContract.name(),
        poolContract.active && poolContract.active(),
        poolContract.totalStake && poolContract.totalStake(),
        poolContract.getTokenPrice && poolContract.getTokenPrice(),
        poolContract.viewStake && poolContract.viewStake(),
        poolContract.maxTotalStake && poolContract.maxTotalStake(),
        poolContract.maxUserTotalStake && poolContract.maxUserTotalStake(),
        poolContract.getStake && poolContract.getStake(),
      ]);

      let days = [];
      let day = moment();
      let count = 0;
      while (count <= 10) {
        count++;
        days.push(formatDate(day.valueOf(), true));
        day = day.clone().add(-1, 'd');
      }
      const rewardsArr =
        contractName &&
        days.reverse().map((day, indexN) => {
          return {
            timestamp: day,
            reward:
              polsApiData &&
              polsApiData[contractName] &&
              polsApiData[contractName].rewards
                ? polsApiData[contractName].rewards[10 - indexN]
                : null,
          };
        });
      const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXED_POINT);
      const estAR = math
        .chain(
          polsApiData[contractName] && polsApiData[contractName].apy
            ? polsApiData[contractName].apy
            : '0',
        )
        .divide(100)
        .multiply(myStakeInAMB.toString())
        .divide(FIXED_POINT.toString())
        .round(2)
        .done()
        .toFixed(2);

      return (
        rewardsArr && {
          index,
          contractName,
          address: poolAddr,
          active,
          contract: poolContract,
          totalStakeInAMB,
          tokenPriceAMB,
          myStakeInTokens,
          myStakeInAMB,
          poolAPY:
            polsApiData &&
            polsApiData[contractName] &&
            polsApiData[contractName]?.apy,
          estAR,
          poolRewards: rewardsArr.slice(1, rewardsArr.length - 1),
          maxPoolTotalStake,
          maxUserTotalStake,
          userStake,
        }
      );
    });
    return Promise.all(poolsDataPromises);
  }

  static privateCompareRewards(a, b) {
    if (a.args.tokenPrice.gt(b.args.tokenPrice)) {
      return 1;
    }
    if (a.args.tokenPrice.lt(b.args.tokenPrice)) {
      return -1;
    }
    return 0;
  }

  // static async privateGetDPY(poolAddr) {
  //   const rewardEvents = this.privateRewardEvents;
  //   if (!rewardEvents || rewardEvents.length < 2) return 0;
  //
  //   const sortedPoolRewards = rewardEvents
  //     .filter((event) => event.args.pool === poolAddr)
  //     .sort(this.privateCompareRewards);
  //   if (!sortedPoolRewards || sortedPoolRewards.length < 2) return 0;
  //
  //   const [firstReward, lastReward] = await Promise.all(
  //     sortedPoolRewards
  //       .filter((_, idx, array) => idx === 0 || idx === array.length - 1)
  //       .map(async (event) => ({
  //         blockNumber: event.blockNumber,
  //         timestamp: (await event.getBlock()).timestamp,
  //         // pool: event.args.pool,
  //         reward: event.args.reward,
  //         tokenPrice: event.args.tokenPrice,
  //       })),
  //   );
  //
  //   if (lastReward.timestamp - firstReward.timestamp < 300) return 0;
  //
  //   return dailyPercentageYieldExpression.evaluate({
  //     price1: math.bignumber(firstReward.tokenPrice.toString()),
  //     price2: math.bignumber(lastReward.tokenPrice.toString()),
  //     time1: firstReward.timestamp,
  //     time2: lastReward.timestamp,
  //   });
  // }

  static async privateGetRewards(poolAddr) {
    const rewardEvents = this.privateRewardEvents;
    if (!rewardEvents || rewardEvents.length < 2) return [];

    const sortedPoolRewards = rewardEvents
      .filter((event) => event.args.pool === poolAddr)
      .sort(this.privateCompareRewards);
    if (!sortedPoolRewards || sortedPoolRewards.length < 2) return [];

    const firstReward = sortedPoolRewards[0];
    const lastReward = sortedPoolRewards[sortedPoolRewards.length - 1];

    const [firstTimestamp, lastTimestamp] = await Promise.all(
      [firstReward, lastReward].map(
        async (event) => (await event.getBlock()).timestamp,
      ),
    );

    if (lastTimestamp - firstTimestamp < 300) return [];

    const avgBlockTime =
      (lastTimestamp - firstTimestamp) /
      (lastReward.blockNumber - firstReward.blockNumber);

    const rewards = sortedPoolRewards.map((event) => ({
      blockNumber: event.blockNumber,
      timestamp:
        firstTimestamp +
        Math.floor(
          avgBlockTime * (event.blockNumber - firstReward.blockNumber),
        ),
      reward: event.args.reward,
      tokenPrice: event.args.tokenPrice,
    }));

    return rewards;
  }

  static async stake(poolInfo, value) {
    const overrides = {
      value: parseFloatToBigNumber(value),
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    const poolContract = poolInfo.contract;
    try {
      overrides.gasLimit = await poolContract.estimateGas.stake(overrides);
      return poolContract.stake(overrides);
    } catch (err) {
      debugLog('stake error', err);
      return null;
    }
  }

  static async unstake(poolInfo, value, fullUnstake = false) {
    const poolContract = poolInfo.contract;
    const [tokenPriceAMB, myStakeInTokens] = await Promise.all([
      poolContract.getTokenPrice(),
      poolContract.viewStake(),
    ]);

    const tokens = fullUnstake
      ? myStakeInTokens
      : parseFloatToBigNumber(value).mul(FIXED_POINT).div(tokenPriceAMB);

    const overrides = {
      gasPrice: transactionGasPrice,
      gasLimit: transactionGasLimit,
    };

    try {
      overrides.gasLimit = await poolContract.estimateGas.unstake(
        tokens,
        overrides,
      );
      return poolContract.unstake(tokens, overrides);
    } catch (err) {
      debugLog('unstake error', err);
      return null;
    }
  }
}
