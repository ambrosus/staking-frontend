import { ethers } from 'ethers';
import { pool } from 'ambrosus-node-contracts';

export const CONNECT_TEXT = 'Connect Your Wallet';
export const ambMounthUSD = (amb, usdPrice) => {
  const result = amb * parseFloat(usdPrice, 10);
  return result.toFixed(7);
};
export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return rand.toFixed(2);
}
export const getBalance = async () => {
  let balance;
  if (typeof window.ethereum !== 'undefined') {
    setInterval(async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
