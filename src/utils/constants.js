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
    contractName: 'Alpha',
    address: '0x39a499cd81C494E8EBC226D416B245978820414e',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Beta',
    address: '0x349065aE4D828F6116D8964df28DBbE5A91220CF',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Gamma',
    address: '0xc2Bba6D7f38924a7cD8532BF15463340A7551516',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Delta',
    address: '0x97d079Ff9D6c26481adDFa07cad058EdD1894D9a',
    abi: pool.abi,
    active: true,
  },
  {
    contractName: 'Charlie',
    active: false,
    address: '0x97d079Ff9D6c26481adDFa07cad058EdD1894D9a',
    abi: [],
  },
  {
    contractName: 'Echo',
    active: false,
    address: '0x97d079Ff9D6c26481adDFa07cad058EdD1894D9a',
    abi: [],
  },
];
