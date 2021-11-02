/* eslint-disable */

import { ethers, BigNumber } from 'ethers';
import EthDater from 'ethereum-block-by-date';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXEDPOINT = TEN.pow(18); // 1.0 ether
const MINSHOWSTAKE = FIXEDPOINT.div(100); // 0.01 ether

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
  constructor(poolInfo, providerOrSigner = null) {
    if (!providerOrSigner || !poolInfo) {
      providerOrSigner = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL,
      );
    }
    this.poolInfo = poolInfo;
    this.providerOrSigner = providerOrSigner;
    this.poolContract = new ethers.Contract(
      poolInfo.address,
      poolInfo.abi,
      providerOrSigner,
    );
  }

  async getPoolData() {
    const [totalStakeInAMB, tokenPriceAMB, myStakeInTokens] = await Promise.all(
      [
        this.poolContract.totalStake(),
        this.poolContract.getTokenPrice(),
        this.poolContract.viewStake(),
      ],
    );
    const myStakeInAMB = myStakeInTokens.mul(tokenPriceAMB).div(FIXEDPOINT);
    return [totalStakeInAMB, myStakeInAMB, tokenPriceAMB, myStakeInTokens];
  }

  async getAPY() {
    const dater = new EthDater(this.providerOrSigner);
    const block = await dater.getDate(
      new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    );
    // console.log('block', block);

    const rewardsLogs = await this.providerOrSigner.getLogs({
      fromBlock: block.block,
      toBlock: 'latest',
      topics: [ethers.utils.id('PoolReward(address,uint256)')],
    });
    // console.log(rewardsLogs);
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
