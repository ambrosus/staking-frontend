import React, { createContext } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { cssTransition } from 'react-toastify';
import { utils, providers } from 'ethers';

import secondSectionIcon1 from '../assets/svg/home/second-section/Icon1-66x85.svg';
import secondSectionIcon2 from '../assets/svg/home/second-section/Icon2-66x85.svg';
import secondSectionIcon3 from '../assets/svg/home/second-section/Icon3-66x85.svg';
import secondSectionIcon4 from '../assets/svg/home/second-section/Icon4-66x85.svg';

import BinanceIcon from '../assets/svg/home/whereToByAmb/Binance.svg';
import KuCoinIcon from '../assets/svg/home/whereToByAmb/KuCoin.svg';
import WhiteBITIcon from '../assets/svg/home/whereToByAmb/WhiteBIT.svg';
import probitIcon from '../assets/svg/home/whereToByAmb/probit.svg';

import githubIcon from '../assets/svg/github-icon.svg';
import mediumIcon from '../assets/svg/medium-icon.svg';
import redditIcon from '../assets/svg/reddit-icon.svg';
import telegramIcon from '../assets/svg/telegram-icon.svg';
import twitterIcon from '../assets/svg/twitter-icon.svg';
import linkedinIcon from '../assets/svg/linkedin-icon.svg';

export const STAKING_PAGE = '/staking';
export const MAIN_PAGE = '/';
export const CONNECT_TEXT = '↖ Connect to Wallet';
export const HIDE = '↖ Hide';
export const SHOW = '↖ Show';
export const STAKE = '↖ Stake';
export const COMING_SOON = 'COMING SOON';
export const TWENTY_FIVE_PERCENT = '25%';
export const FIFTY_PERCENT = '50%';
export const SEVENTY_FIVE_PERCENT = '75%';
export const ONE_HUNDRED_PERCENT = '100%';
export const NetworkContextName = 'NETWORK';

export const { ethereum } = window;

export const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});

export const PoolsContext = createContext([]);

export const network = process.env.NODE_ENV === 'production';

export const ENABLE_DEBUG_LOG = false;

export const provider = ethereum ? new providers.Web3Provider(ethereum) : null;

export const transactionGasLimit = 8000000;

export const transactionGasPrice = utils.parseUnits('20', 'gwei');

export const SupportedChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  AMBROSUS: process.env.REACT_APP_CHAIN_ID,
};

export const injected = new InjectedConnector({
  supportedChainIds: [+process.env.REACT_APP_CHAIN_ID],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 16718: process.env.REACT_APP_RPC_URL },
  qrcode: true,
  chainId: 16718,
  bridge: 'https://bridge.walletconnect.org',
  pollingInterval: 12000,
});

export const ConnectorNames = {
  Injected: 'Injected',
  WalletConnect: 'WalletConnect',
};

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const faqsList = [
  {
    title: 'What is Ambrosus and what is the AMB coin?',
    description: (
      <>
        Ambrosus is a decentralized network of over hundreds of masternodes,
        each validating or storing data from assets and corresponding events
        from supply chains, IoT devices, and more.
        <br />
        <br />
        AMB is used to keep information on the Ambrosus network up to date as
        tracked products and objects move across a supply chain. The coin
        enables a transparent ecosystem with trustworthy information that can be
        accessed by interested parties.
      </>
    ),
    key: 0,
  },
  {
    title: <>How does Arcadia Staking work?</>,
    description: (
      <>
        {' '}
        Arcadia allows users to stake AMB coins quickly, without having to set
        up a node manually. Here is how the automation works—all coins that go
        into one of the pools are distributed among running nodes. When there is
        a sufficient amount in the pool to enable another node, it will be
        automatically configured and launched.
      </>
    ),
    key: 1,
  },
  {
    title: <>Why stake AMB?</>,
    description: (
      <>
        {' '}
        The simplest answer—you earn great rewards while contributing to an
        ecosystem that is constantly expanding through successful partnerships
        and real, working solutions. What’s more, you have the flexibility to
        unstake your coins at any time.
      </>
    ),
    key: 2,
  },
  {
    title: <>Can I trade AMB coins when they are staked?</>,
    description: <> No, you cannot trade staked coins.</>,
    key: 3,
  },
  {
    title: <>How often are rewards distributed?</>,
    description: (
      <>
        {' '}
        Payments occur approximately every 6 hours, with your reward
        automatically being added to your stake.
      </>
    ),
    key: 4,
  },
  {
    title: (
      <>Does staking generate the same rewards as setting up a masternode?</>
    ),
    description: (
      <>
        No, as staking is a simplified way of setting up a node. Those who have
        the required amount of AMB and set up a masternode receive greater
        rewards.
      </>
    ),
    key: 5,
  },
  {
    title: <>When can I redeem my staked AMB?</>,
    description: (
      <>You can redeem staked AMB at any time and withdraw instantly.</>
    ),
    key: 6,
  },
  {
    title: <>What is the minimum & maximum amount of AMB that can be staked?</>,
    description: (
      <>
        {' '}
        The minimum staking amount is 1000 AMB, and there is no upper limit to
        the amount of AMB that can be staked.
      </>
    ),
    key: 7,
  },
  {
    title: <>Are there any staking fees?</>,
    description: (
      <>
        The commission is set by the pool owner upon creation and cannot be
        changed. We recommend setting the commission between 20% and 30%.
        <br /> Importantly, commission is accrued from staked rewards only, not
        the initial staked AMB.
      </>
    ),
    key: 8,
    last: true,
  },
];

export const homePageStatic = {
  lastSection: [
    {
      index: 0,
      title: 'Stake AMB',
      text: 'Unleash the power of your AMB and earn staking rewards. Click and start earning now!',
      btnText: '↖ Stake Now',
    },
    {
      index: 1,
      title: 'Join Ambrosus',
      text: 'You contribute to a decentralized network that is the backbone of the Ambrosus Ecosystem and its partners.',
      links: [
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
          url: 'https://twitter.com/AMB_Ecosystem',
          title: 'Ambrosus Twitter',
          icon: twitterIcon,
        },
      ],
    },
    {
      index: 2,
      title: 'Run a Node',
      text: 'Add to the speed, stability, and security of Ambrosus! Validate or store transactions on AMB-NET with greater rewards than staking.',
      btnText: '↖ Learn more',
    },
  ],
  arcadiaStaking: [
    {
      src: secondSectionIcon1,
      text: 'Staking starts from 1000 AMB',
    },
    {
      src: secondSectionIcon2,
      text: 'Secure the network and earn rewards.',
    },
    {
      src: secondSectionIcon3,
      text: 'Rewards are distributed every 6 hours',
    },
    {
      src: secondSectionIcon4,
      text: 'Unstake at any time',
    },
  ],
  whereToByAmb: [
    {
      src: BinanceIcon,
      text: 'Binance',
    },
    {
      src: KuCoinIcon,
      text: 'KuCoin',
    },
    {
      src: WhiteBITIcon,
      text: 'WhiteBIT',
    },
    {
      src: probitIcon,
      text: 'ProBit',
    },
  ],
};

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
    target: true,
    href: 'https://ambrosus.io/',
    title: 'Main',
    route: false,
  },
  {
    target: true,
    href: 'https://explorer.ambrosus.io/',
    title: 'Explorer',
    route: false,
  },
  {
    target: false,
    href: MAIN_PAGE,
    title: 'Staking',
    route: true,
  },
  {
    target: true,
    href: 'https://amb.to/',
    title: 'amb.to',
    route: false,
  },
];

export const tooltips = {
  earnings: (
    <span>
      Estimated earnings for the next year. <br />
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

export default {
  ethereum,
  bounce,
  network,
  transactionGasLimit,
  homePageStatic,
  transactionGasPrice,
  injected,
  connectorsByName,
  socialsLinks,
  faqsList,
  menuLinks,
  tooltips,
  STAKING_PAGE,
  MAIN_PAGE,
  CONNECT_TEXT,
  HIDE,
  SHOW,
  PoolsContext,
  STAKE,
  COMING_SOON,
  TWENTY_FIVE_PERCENT,
  FIFTY_PERCENT,
  SEVENTY_FIVE_PERCENT,
  ONE_HUNDRED_PERCENT,
  provider,
};
