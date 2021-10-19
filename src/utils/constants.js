import { ethers } from 'ethers';
import { pool } from 'ambrosus-node-contracts';

export const CONNECT_TEXT = 'Connect Your Wallet';
export const ambMounthUSD = (amb, usdPrice) => {
  const result = amb * parseFloat(usdPrice, 10);
  return result.toFixed(7);
};

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
    contractName: 'Alpha_20211019_0.0.1',
    address: '0xcbeb3386AE31260640E757Ca56cc560241569E6c',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Beta_20211019_0.0.1',
    address: '0x08EE4fF517D50765D6ba5538E33Fa77C9a511F06',
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
