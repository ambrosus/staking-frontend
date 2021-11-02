import { ethers } from 'ethers';
import { pool } from 'ambrosus-node-contracts';

export const { ethereum } = window;

export const CONNECT_TEXT = 'Connect Your Wallet';
export const HIDE = 'HIDE';
export const SHOW = 'SHOW';
export const STAKE = 'STAKE';
export const COMING_SOON = 'COMING SOON';

export const ambMounthUSD = async (amb) => {
  const ambPriceInUsd = await fetch('https://token.ambrosus.io')
    .then((response) => response.json())
    .then((data) => data?.data?.price_usd);
  const result = amb * parseFloat(ambPriceInUsd, 10);
  return result.toFixed(7);
};

export const priceInPercent24h = async () => {
  const ambPercentChange = await fetch('https://token.ambrosus.io')
    .then((response) => response.json())
    .then((data) => data?.data?.percent_change_24h);
  return ambPercentChange && ambPercentChange;
};

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return rand.toFixed(2);
}

export const getBalance = async () => {
  let balance;
  if (typeof ethereum !== 'undefined') {
    setInterval(async () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.listAccounts().then(async (accounts) => {
        const defaultAccount = accounts[0];
        if (defaultAccount) {
          await provider.getBalance(defaultAccount).then((balanceObj) => {
            const balanceInEth = ethers.utils.formatEther(balanceObj);
            balance = balanceInEth;
          });
        }
      });
    });
  }
  return balance && balance.toString();
};

export const pools = [
  {
    contractName: 'Alpha',
    address: '0x10e6fBB9e86F9e0363FDDF3072055C871837E3Ce',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Beta',
    address: '0xC25Ce9cb3B5253a7153e2E64Aa6147a82127f07D',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Charlie',
    active: false,
  },
  {
    contractName: 'Echo',
    active: false,
  },
];
