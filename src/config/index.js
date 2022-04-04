import React, { createContext } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { cssTransition } from 'react-toastify';
import { utils, providers } from 'ethers';

import secondSectionIcon1 from 'assets/svg/home/second-section/Icon1-66x85.svg';
import secondSectionIcon2 from 'assets/svg/home/second-section/Icon2-66x85.svg';
import secondSectionIcon3 from 'assets/svg/home/second-section/Icon3-66x85.svg';
import secondSectionIcon4 from 'assets/svg/home/second-section/Icon4-66x85.svg';

import BinanceIcon from 'assets/svg/home/whereToByAmb/Binance.svg';
import KuCoinIcon from 'assets/svg/home/whereToByAmb/KuCoin.svg';
import WhiteBITIcon from 'assets/svg/home/whereToByAmb/WhiteBIT.svg';
import probitIcon from 'assets/svg/home/whereToByAmb/probit.svg';

import HoverBinanceIcon from 'assets/svg/home/whereToByAmb/hover-binance.svg';
import HoverKuCoinIcon from 'assets/svg/home/whereToByAmb/hover-kukoin.svg';
import HoverWhiteBITIcon from 'assets/svg/home/whereToByAmb/hover-wb.svg';
import HoverprobitIcon from 'assets/svg/home/whereToByAmb/hover-probit.svg';

import githubIcon from 'assets/svg/github-icon.svg';
import mediumIcon from 'assets/svg/medium-icon.svg';
import redditIcon from 'assets/svg/reddit-icon.svg';
import telegramIcon from 'assets/svg/telegram-icon.svg';
import twitterIcon from 'assets/svg/twitter-icon.svg';
import linkedinIcon from 'assets/svg/linkedin-icon.svg';

export const STAKING_PAGE = '/staking';
export const MAIN_PAGE = '/';
export const CONNECT_TEXT = '↖ Connect to Wallet';
export const HIDE = 'Hide';
export const SHOW = 'Show';
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

export const network = !process.env.REACT_APP_RPC_URL.includes('test');

export const ENABLE_DEBUG_LOG = true;

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
  chainId: 16718,
  bridge: 'https://bridge.walletconnect.org',
  pollingInterval: 12000,
  qrcodeModalOptions: {
    mobileLinks: ['metamask'],
  },
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
      hoverSrc: HoverBinanceIcon,
      text: 'Binance',
      url: 'https://accounts.binance.com/en/register?ref=E8NGKMF8',
    },
    {
      src: KuCoinIcon,
      hoverSrc: HoverKuCoinIcon,
      text: 'KuCoin',
      url: 'https://www.kucoin.com/',
    },
    {
      src: WhiteBITIcon,
      hoverSrc: HoverWhiteBITIcon,
      text: 'WhiteBIT',
      url: 'https://whitebit.com/',
    },
    {
      src: probitIcon,
      hoverSrc: HoverprobitIcon,
      text: 'ProBit',
      url: 'https://www.probit.com/',
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
  totalMaxStaked: `The maximum allowed number of bet coins in the pool`,
  deposit: `-`,
  unstake: `-`,
};
export const abiPoolsWithLimit = [
  {
    constant: true,
    inputs: [],
    name: 'active',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nodes',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'maxUserTotalStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'nodeType',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'nodeStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'maxTotalStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalReward',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'stakers',
    outputs: [
      {
        name: 'exists',
        type: 'bool',
      },
      {
        name: 'total',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minStakeValue',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'id',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'service',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'unstakeFees',
    outputs: [
      {
        name: 'age',
        type: 'uint64',
      },
      {
        name: 'fee',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'token',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'poolName',
        type: 'string',
      },
      {
        name: 'poolNodeType',
        type: 'uint8',
      },
      {
        name: 'poolNodeStake',
        type: 'uint256',
      },
      {
        name: 'poolMinStakeValue',
        type: 'uint256',
      },
      {
        name: 'poolFee',
        type: 'uint256',
      },
      {
        name: 'poolService',
        type: 'address',
      },
      {
        name: 'head',
        type: 'address',
      },
      {
        name: 'poolMaxTotalStake',
        type: 'uint256',
      },
      {
        name: 'poolMaxUserTotalStake',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipRenounced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'getVersion',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'activate',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'maxNodes',
        type: 'uint256',
      },
    ],
    name: 'deactivate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newService',
        type: 'address',
      },
    ],
    name: 'setService',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newName',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'stake',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'tokens',
        type: 'uint256',
      },
    ],
    name: 'unstake',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'tokens',
        type: 'uint256',
      },
    ],
    name: 'unstakeWithFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'age',
        type: 'uint64',
      },
      {
        name: 'unstakeFee',
        type: 'uint32',
      },
    ],
    name: 'addUnstakeFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'age',
        type: 'uint64',
      },
      {
        name: 'unstakeFee',
        type: 'uint32',
      },
    ],
    name: 'changeUnstakeFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'age',
        type: 'uint64',
      },
    ],
    name: 'removeUnstakeFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'time',
        type: 'uint64',
      },
    ],
    name: 'getUnstakeFee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'viewStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTokenPrice',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'addReward',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'requestId',
        type: 'uint256',
      },
      {
        name: 'node',
        type: 'address',
      },
      {
        name: 'nodeId',
        type: 'uint256',
      },
    ],
    name: 'addNode',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getNodesCount',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'from',
        type: 'uint256',
      },
      {
        name: 'to',
        type: 'uint256',
      },
    ],
    name: 'getNodes',
    outputs: [
      {
        name: '_nodes',
        type: 'address[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

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
  abiPoolsWithLimit,
};
