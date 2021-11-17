import React from 'react';
import githubIcon from '../assets/svg/github-icon.svg';
import mediumIcon from '../assets/svg/medium-icon.svg';
import redditIcon from '../assets/svg/reddit-icon.svg';
import telegramIcon from '../assets/svg/telegram-icon.svg';
import twitterIcon from '../assets/svg/twitter-icon.svg';
import linkedinIcon from '../assets/svg/linkedin-icon.svg';
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

export const { ethereum } = window;
const host = window.location.hostname;

export const network =
  host.includes('local') || host.includes('dev') || host.includes('test')
    ? 'Ambrosus (Test net)'
    : 'Ambrosus (Main net)';
export const socialsLinks = [
  {
    url: 'https://github.com/ambrosus',
    title: 'Ambrosus Github',
    icon: githubIcon,
  },
  {
    url: 'https://linkedin.com/company/ambrosus-ecosystem/',
    title: 'Ambrosus LinkedIn',
    icon: linkedinIcon,
  },
  {
    url: 'https://t.me/Ambrosus',
    title: 'Ambrosus Telegram',
    icon: telegramIcon,
  },
  {
    url: 'https://www.reddit.com/r/AmbrosusEcosystem',
    title: 'Ambrosus Reddit',
    icon: redditIcon,
  },
  {
    url: 'https://blog.ambrosus.io',
    title: 'Ambrosus Medium',
    icon: mediumIcon,
  },
  {
    url: 'https://t.me/AmbrosusEcosystem',
    title: 'Ambrosus Ecosystem Telegram',
    icon: telegramIcon,
  },
  {
    url: 'https://twitter.com/AMB_Ecosystem',
    title: 'Ambrosus Twitter',
    icon: twitterIcon,
  },
];

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
