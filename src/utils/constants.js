import React from 'react';
import {cssTransition, toast} from 'react-toastify';

import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

export const STAKING_PAGE = '/staking';
export const MAIN_PAGE = '/';
export const CONNECT_TEXT = 'Connect Your Wallet';
export const HIDE = 'HIDE';
export const SHOW = 'SHOW';
export const STAKE = 'STAKE';
export const COMING_SOON = 'COMING SOON';
export const TWENTY_FIVE_PERCENT = '25%';
export const FIFTY_PERCENT = '50%';
export const SEVENTY_FIVE_PERCENT = '75%';
export const ONE_HUNDRED_PERCENT = '100%';

export const {ethereum} = window;

export const menuLinks = [
  {
    taget: true,
    href: 'https://ambrosus.io/',
    title: 'Main',
    route: false,
  },
  {
    taget: true,
    href: 'https://explorer.ambrosus.io/',
    title: 'Explorer',
    route: false,
  },
  {
    taget: false,
    href: '/staking',
    title: 'Staking',
    route: true,
  },
  {
    taget: true,
    href: 'https://amb.to/',
    title: 'amb.to',
    route: false,
  },
];
export const tooltips = {
  earnings: (
    <span>
      Estimated earnings for the next 24h. <br />
      This function is in early beta, <br />
      the data is for reference only
    </span>
  ),
  copyState: {
    isCopied: `Copied`,
    notCopied: `Copy to clipboard`,
  },
  totalStaked: `The amount of staked coins in all pools`,
  deposit: `-`,
  unstake: `-`,
};

export const ambMounthUSD = async (amb) => {
  try {
    const ambPriceInUsd = await fetch('https://token.ambrosus.io')
      .then((response) => response.json())
      .then((data) => data?.data?.price_usd);
    const result = amb * parseFloat(ambPriceInUsd, 10);
    return result.toFixed(7);
  } catch (err) {
    return 0;
  }
};

export const priceInPercent24h = async () => {
  try {
    return await fetch('https://token.ambrosus.io')
        .then((response) => response.json())
        .then((data) => data?.data?.percent_change_24h);
  } catch (err) {
    return 0;
  }
};

export const notificationMassage = (type, alertText) => {
  const bounce = cssTransition({
    enter: 'animate__animated animate__bounceIn',
    exit: 'animate__animated animate__bounceOut',
  });

  if (type === 'SUCCESS') {
    toast.success(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else if (type === 'PENDING') {
    toast.info(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  } else {
    toast.error(alertText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: bounce,
    });
  }
};

export const collapsedReducer = (state, {type, index}) => {
  const stateCopy = [false];
  switch (type) {
    case 'toggle':
      stateCopy[index] = !stateCopy[index];
      return [...stateCopy];
    case 'hide':
      stateCopy[index] = false;
      return [...stateCopy];
    case 'show':
      stateCopy[index] = true;
      return [...stateCopy];
    default:
      throw new Error();
  }
};

export const formatThousand = (num) => {
  if (Math.abs(Number(num)) >= 1.0e9) {
    return `${Math.abs(Number(num) / 1.0e9).toFixed(2)}b`;
  }
  if (Math.abs(Number(num)) >= 1.0e6) {
    return `${Math.abs(Number(num) / 1.0e6).toFixed(2)}m`;
  }
  if (Math.abs(Number(num)) > 1.0e3) {
    return `${Math.abs(Number(num) / 1.0e3).toFixed(2)}k`;
  }
  return Number(num).toFixed(2);
};

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return rand.toFixed(2);
}
