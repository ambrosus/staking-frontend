import { contractJsons, pool } from 'ambrosus-node-contracts';
import { BigNumber, ethers, providers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { all, create } from 'mathjs';
import { headContractAddress } from 'ambrosus-node-contracts/config/config';
import { ethereum } from '../config';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXED_POINT = TEN.pow(18);
const MIN_SHOW_STAKE = FIXED_POINT.div(100);
const THOUSAND = FIXED_POINT.mul(1000);

const AVERAGING_PERIOD = 7 * 24 * 60 * 60; // 7 days

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

const exprDPY = math.compile('(s2 / s1) ^ (86400 / (t2 - t1)) - 1');

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

  constructor(providerOrSigner) {
    this.providerOrSigner = providerOrSigner;

    this.privateInitPromise = this.privateInitialize();
  }

  async privateInitialize() {
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
  }

  static createInstance(loggedIn = false) {
    console.log('## createInstance', loggedIn);
    if (loggedIn) {
      const provider = new providers.Web3Provider(ethereum);
      this.privateInstance = new StakingWrapper(provider.getSigner());
    } else {
      this.privateInstance = new StakingWrapper(
        new JsonRpcProvider(process.env.REACT_APP_RPC_URL),
      );
    }
    return this.privateInstance;
  }

  static getInstance() {
    console.log('## getInstance');
    return this.privateInstance;
  }

  async getPools() {
    await this.privateInitPromise;

    const poolsCount = await this.poolsStore.getPoolsCount();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    this.pools = poolsAddrs.map(
      (poolAddr) =>
        new ethers.Contract(poolAddr, pool.abi, this.providerOrSigner),
    );

    return Promise.all(
      this.pools.map(async (poolItem, index) => {
        const info = await Promise.all([
          poolItem.name(),
          poolItem.active(),
          poolItem.totalStake(),
        ]);
        return {
          index,
          contractName: info[0],
          address: poolItem.address,
          abi: poolItem.abi,
          active: info[1],
          contract: poolItem,
          totalStake: info[2],
        };
      }),
    );
  }

  async getPoolData(index) {
    if (typeof index !== 'number') {
      throw new Error('no pool index provided');
    }
    await this.privateInitPromise;
    if (!this.pools) await this.getPools();
    const poolContract = this.pools[index];

    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens, poolDPY] =
      await Promise.all([
        poolContract.totalStake(),
        poolContract.getTokenPrice(),
        poolContract.viewStake(),
        this.privateGetDPY(this.pools[index].address),
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

  async privateGetDPY(poolAddr) {
    await this.privateInitPromise;

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
