/* eslint-disable */

import {contractJsons, pool} from 'ambrosus-node-contracts';
import { ethers, BigNumber } from 'ethers';
import EthDater from 'ethereum-block-by-date';


const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18); // 1.0 ether
const MINSHOWSTAKE = FIXEDPOINT.div(100); // 0.01 ether

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
    console.log('StakingWrapper', providerOrSigner);
    if (!providerOrSigner) {
      providerOrSigner = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
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
    // console.log('contextAddr',contextAddr);
    const contextContract = new ethers.Contract(
      contextAddr,
      contractJsons.context.abi,
      this.providerOrSigner,
    );
    const storageCatalogueAddr = await contextContract.storageCatalogue();
    // console.log('storageCatalogueAddr',storageCatalogueAddr);
    const storageCatalogueContr = new ethers.Contract(
      storageCatalogueAddr,
      contractJsons.storageCatalogue.abi,
      this.providerOrSigner,
    );
    const poolEventsEmitterAddr = await storageCatalogueContr.poolEventsEmitter();
    this.poolEventsEmitter = new ethers.Contract(
      poolEventsEmitterAddr,
      contractJsons.poolEventsEmitter.abi,
      this.providerOrSigner,
    );
    const poolsStoreAddr = await storageCatalogueContr.poolsStore();
    // console.log('poolsStoreAddr',poolsStoreAddr);
    this.poolsStore = new ethers.Contract(
      poolsStoreAddr,
      contractJsons.poolsStore.abi,
      this.providerOrSigner,
    );

    const poolsCount = (await this.poolsStore.getPoolsCount()).toNumber();
    const poolsAddrs = await this.poolsStore.getPools(0, poolsCount);
    // console.log('pools', poolsAddrs);
    this.pools = poolsAddrs.map((poolAddr) => new ethers.Contract(
      poolAddr,
      pool.abi,
      this.providerOrSigner,
    ));
    // console.log(this.pools[0]);
  }

  async getPools() {
    await this.initPromise;
    
    return Promise.all(this.pools.map(async (_pool, index) => {
      const info = await Promise.all([
        _pool.name(),
        _pool.active()
      ]);
      return {
        index,
        contractName: info[0],
        address: _pool.address,
        abi: pool.abi,
        active: info[1],
      }
    }));
  }

  async getPoolData(index) {
    if (typeof index !== 'number') {
      throw new Error('no pool index provided');
    }
    await this.initPromise;

    const poolContract = this.pools[index];

    console.log('getPoolData');
    //console.log('pools:', await this.getPools());
    //console.log('apy:', await this.getAPY());

    // console.log('count', await this.getPoolsCount());

    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens] = await Promise.all(
      [
        poolContract.totalStake(),
        poolContract.getTokenPrice(),
        poolContract.viewStake(),
      ],
    );
    const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXEDPOINT);
    return {totalStakeInAMB, myStakeInAMB, tokenPriceAMB, myStakeInTokens};
  }

  async getAPY(index = null) {
    await this.initPromise;

    const dater = new EthDater(this.providerOrSigner);
    const block = await dater.getDate(
      new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    );
    // console.log('block', block);

    const rewardEvents = await this.poolEventsEmitter.queryFilter(
      this.poolEventsEmitter.filters.PoolReward(null,null,null),
      block.block,
    );
    console.log('rewardEvents:', rewardEvents);
    return;

    /*
    const rewardsLogs = await this.providerOrSigner.getLogs({
      fromBlock: block.block,
      toBlock: 'latest',
      topics: [ethers.utils.id('PoolReward(address,uint256)')],
    });
    console.log(rewardsLogs);
    */
    // 0x732FA022168eF1F669fF2A4a6c5C632646a1822b poolEventsEmitter
    /*
    if (rewardsLogs !== undefined) {
      const rewards =
        rewardsLogs &&
        rewardsLogs.map((log) => iface.parseLog(log).args.reward);
      if (rewards) {
        const totalRewards = rewards.reduce(
          (acc, reward) => acc.add(reward),
          ethers.BigNumber.from('0'),
        );
        if (totalRewards) {
          const formatTotalReward =
            ethers.utils.formatEther(totalRewards);
            prevState.add(formatTotalReward),
          );
        }
      }
    }
    */
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