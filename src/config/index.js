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
export const abiPoolsWithLimit = {
  contractName: 'PoolWithLimits',
  updatedAt: '2022-03-24T07:31:53.820Z',
  abi: [
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
  ],
  bytecode:
    '0x60806040523480156200001157600080fd5b506040516200611738038062006117833981018060405281019080805182019291906020018051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008711151562000142576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f506f6f6c206e6f6465207374616b652076616c7565206973207a65726f00000081525060200191505060405180910390fd5b600086111515620001bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f506f6f6c206d696e207374616b652076616c7565206973207a65726f0000000081525060200191505060405180910390fd5b60008510158015620001cf5750620f424085105b15156200026a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f506f6f6c20666565206d7573742062652066726f6d203020746f20313030303081526020017f303000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415151562000310576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f53657276696365206d757374206e6f742062652030783000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515620003b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f48656164206d757374206e6f742062652030783000000000000000000000000081525060200191505060405180910390fd5b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000442620007dc565b604051809103906000f0801580156200045f573d6000803e3d6000fd5b50600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555087600860006101000a81548160ff02191690836003811115620004bf57fe5b02179055508660098190555085600a81905550816006819055508060078190555084600c819055508860109080519060200190620004ff929190620007ed565b5062000519620005cf640100000000026401000000009004565b73ffffffffffffffffffffffffffffffffffffffff166361b8ce8c6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156200057d57600080fd5b505af115801562000592573d6000803e3d6000fd5b505050506040513d6020811015620005a957600080fd5b81019080805190602001909291905050506011819055505050505050505050506200089c565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0496d6a6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156200065857600080fd5b505af11580156200066d573d6000803e3d6000fd5b505050506040513d60208110156200068457600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff166324e4013a6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015620006f957600080fd5b505af11580156200070e573d6000803e3d6000fd5b505050506040513d60208110156200072557600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663e6f61b746040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156200079a57600080fd5b505af1158015620007af573d6000803e3d6000fd5b505050506040513d6020811015620007c657600080fd5b8101908080519060200190929190505050905090565b6040516117f9806200491e83390190565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200083057805160ff191683800117855562000861565b8280016001018555821562000861579182015b828111156200086057825182559160200191906001019062000843565b5b50905062000870919062000874565b5090565b6200089991905b80821115620008955760008160009055506001016200087b565b5090565b90565b61407280620008ac6000396000f3006080604052600436106101cd576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302fb0c5e146101cf578063038d67e8146101fe57806303c2f34a1461028a57806304636349146102c157806306fdde03146102ec5780630d8e6e2c1461037c5780630f15f4c01461040c5780631c53c2801461041657806327020a39146104835780632e17de78146104ae5780633a4b66f1146104db5780633fa9a8de146104e55780634b94f50e1461051e5780635c3dbc7f14610549578063611a212e1461059057806361ea7208146105bb57806364904071146105e65780636e8bbfeb14610611578063715018a61461065c578063750142e6146106735780638b0e9f3f1461069e5780638da5cb5b146106c9578063900cb0df146107205780639168ae7214610767578063916b9bef146107c95780639f4c350b146107f6578063a8d6e68e1461084d578063af640d0f14610878578063bf8bdac1146108a3578063c47f0027146108e6578063d598d4c914610921578063ddca3f4314610978578063e59a58ee146109a3578063f2fde38b146109ad578063f566b04d146109f0578063fc0c546a14610a58578063fc0e3d9014610aaf575b005b3480156101db57600080fd5b506101e4610ada565b604051808215151515815260200191505060405180910390f35b34801561020a57600080fd5b506102336004803603810190808035906020019092919080359060200190929190505050610aed565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561027657808201518184015260208101905061025b565b505050509050019250505060405180910390f35b34801561029657600080fd5b506102bf600480360381019080803567ffffffffffffffff169060200190929190505050610cdb565b005b3480156102cd57600080fd5b506102d6610f06565b6040518082815260200191505060405180910390f35b3480156102f857600080fd5b50610301611005565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610341578082015181840152602081019050610326565b50505050905090810190601f16801561036e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561038857600080fd5b506103916110a3565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103d15780820151818401526020810190506103b6565b50505050905090810190601f1680156103fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104146110e0565b005b34801561042257600080fd5b5061044160048036038101908080359060200190929190505050611284565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561048f57600080fd5b506104986112c2565b6040518082815260200191505060405180910390f35b3480156104ba57600080fd5b506104d9600480360381019080803590602001909291905050506112c8565b005b6104e3611b6f565b005b3480156104f157600080fd5b506104fa61230a565b6040518082600381111561050a57fe5b60ff16815260200191505060405180910390f35b34801561052a57600080fd5b5061053361231d565b6040518082815260200191505060405180910390f35b34801561055557600080fd5b5061058e600480360381019080803567ffffffffffffffff169060200190929190803563ffffffff169060200190929190505050612446565b005b34801561059c57600080fd5b506105a56127f4565b6040518082815260200191505060405180910390f35b3480156105c757600080fd5b506105d06127fa565b6040518082815260200191505060405180910390f35b3480156105f257600080fd5b506105fb612807565b6040518082815260200191505060405180910390f35b34801561061d57600080fd5b50610646600480360381019080803567ffffffffffffffff16906020019092919050505061280d565b6040518082815260200191505060405180910390f35b34801561066857600080fd5b50610671612931565b005b34801561067f57600080fd5b50610688612a33565b6040518082815260200191505060405180910390f35b3480156106aa57600080fd5b506106b3612a39565b6040518082815260200191505060405180910390f35b3480156106d557600080fd5b506106de612a3f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561072c57600080fd5b50610765600480360381019080803567ffffffffffffffff169060200190929190803563ffffffff169060200190929190505050612a64565b005b34801561077357600080fd5b506107a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612be9565b60405180831515151581526020018281526020019250505060405180910390f35b3480156107d557600080fd5b506107f460048036038101908080359060200190929190505050612c1a565b005b34801561080257600080fd5b5061084b60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050612d8a565b005b34801561085957600080fd5b506108626131e4565b6040518082815260200191505060405180910390f35b34801561088457600080fd5b5061088d6131ea565b6040518082815260200191505060405180910390f35b3480156108af57600080fd5b506108e4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506131f0565b005b3480156108f257600080fd5b5061091f600480360381019080803590602001908201803590602001919091929391929390505050613334565b005b34801561092d57600080fd5b506109366133a5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561098457600080fd5b5061098d6133cb565b6040518082815260200191505060405180910390f35b6109ab6133d1565b005b3480156109b957600080fd5b506109ee600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506136e3565b005b3480156109fc57600080fd5b50610a1b6004803603810190808035906020019092919050505061374a565b604051808367ffffffffffffffff1667ffffffffffffffff1681526020018263ffffffff1663ffffffff1681526020019250505060405180910390f35b348015610a6457600080fd5b50610a6d61379d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015610abb57600080fd5b50610ac46137c3565b6040518082815260200191505060405180910390f35b600d60009054906101000a900460ff1681565b60606000808410158015610b055750600b8054905084105b1515610b79576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f46726f6d20696e646578206f7574206f6620626f756e6473000000000000000081525060200191505060405180910390fd5b8383118015610b8d5750600b805490508311155b1515610c01576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f546f20696e646578206f7574206f6620626f756e64730000000000000000000081525060200191505060405180910390fd5b838303604051908082528060200260200182016040528015610c325781602001602082028038833980820191505090505b5091508390505b82811015610cd457600b81815481101515610c5057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682858303815181101515610c8b57fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508080600101915050610c39565b5092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d3857600080fd5b5b601280549050811015610da4578167ffffffffffffffff16601282815481101515610d6057fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff161415610d9757610da4565b8080600101915050610d39565b60128054905081101515610e20576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f46656520666f722074686520616765206e6f7420666f756e640000000000000081525060200191505060405180910390fd5b60016012805490500381141515610ee9576012600160128054905003815481101515610e4857fe5b90600052602060002001601282815481101515610e6157fe5b906000526020600020016000820160009054906101000a900467ffffffffffffffff168160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055506000820160089054906101000a900463ffffffff168160000160086101000a81548163ffffffff021916908363ffffffff1602179055509050505b6001601281818054905003915081610f019190613e7c565b505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015610fc557600080fd5b505af1158015610fd9573d6000803e3d6000fd5b505050506040513d6020811015610fef57600080fd5b8101908080519060200190929190505050905090565b60108054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561109b5780601f106110705761010080835404028352916020019161109b565b820191906000526020600020905b81548152906001019060200180831161107e57829003601f168201915b505050505081565b60606040805190810160405280600581526020017f302e302e34000000000000000000000000000000000000000000000000000000815250905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561113b57600080fd5b600d60009054906101000a900460ff161515156111c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f506f6f6c20697320616c7265616479206163746976650000000000000000000081525060200191505060405180910390fd5b6009543414151561125f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001807f53656e642076616c7565206e6f7420657175616c73206e6f6465207374616b6581526020017f2076616c7565000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b6001600d60006101000a81548160ff02191690831515021790555061128261380d565b565b600b8181548110151561129357fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60075481565b6000806000806000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561138d57600080fd5b505af11580156113a1573d6000803e3d6000fd5b505050506040513d60208110156113b757600080fd5b8101908080519060200190929190505050861115151561143f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f53656e64657220686173206e6f7420656e6f75676820746f6b656e730000000081525060200191505060405180910390fd5b601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209450846002018054905093505b846002018054905083101561156f578585600201848154811015156114ac57fe5b9060005260206000209060030201600201541415611562578284101561155d5784600201848154811015156114dd57fe5b906000526020600020906003020160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16856002018481548110151561151e57fe5b906000526020600020906003020160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff161015611558578293505b611561565b8293505b5b828060010193505061148b565b8460020180549050841015156115ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f53656e64657220686173206e6f20617661696c61626c65207374616b6573000081525060200191505060405180910390fd5b600061162e866002018681548110151561160357fe5b906000526020600020906003020160000160009054906101000a900467ffffffffffffffff1661280d565b1415156116a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f53656e646572206d7573742070617920616e20756e7374616b6520666565000081525060200191505060405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff16634b94f50e6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561170757600080fd5b505af115801561171b573d6000803e3d6000fd5b505050506040513d602081101561173157600080fd5b81019080805190602001909291905050509150611771670de0b6b3a7640000611763888561393990919063ffffffff16565b61397190919063ffffffff16565b905061178a60055460045461398790919063ffffffff16565b8111151515611801576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f546f74616c207374616b65206973206c657373207468616e206465706f73697481525060200191505060405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639dc29fac33886040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1580156118c657600080fd5b505af11580156118da573d6000803e3d6000fd5b505050505b803073ffffffffffffffffffffffffffffffffffffffff1631101561190b576119066139a3565b6118df565b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611951573d6000803e3d6000fd5b5061195a613b43565b73ffffffffffffffffffffffffffffffffffffffff1663eaf1311f3383600003896000036040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b158015611a0a57600080fd5b505af1158015611a1e573d6000803e3d6000fd5b5050505060055481111515611a5157611a4281600554613d4790919063ffffffff16565b60058190555060009050611a71565b611a6660055482613d4790919063ffffffff16565b905060006005819055505b6000811115611a9657611a8f81600454613d4790919063ffffffff16565b6004819055505b600185600201805490500384141515611b4c57846002016001866002018054905003815481101515611ac457fe5b90600052602060002090600302018560020185815481101515611ae357fe5b90600052602060002090600302016000820160009054906101000a900467ffffffffffffffff168160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555060018201548160010155600282015481600201559050505b60018560020181818054905003915081611b669190613ea8565b50505050505050565b600080600d60009054906101000a900460ff161515611bf6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f506f6f6c206973206e6f7420616374697665000000000000000000000000000081525060200191505060405180910390fd5b600a543410151515611c70576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f506f6f6c3a207374616b652076616c756520746f6f206c6f770000000000000081525060200191505060405180910390fd5b60006006541480611c975750600654611c946004543461398790919063ffffffff16565b11155b1515611d0b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f506f6f6c3a207374616b652076616c756520746f6f206869676800000000000081525060200191505060405180910390fd5b600060075414158015611d6a5750601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff165b15611e3e57600754611dc734601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015461398790919063ffffffff16565b11151515611e3d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f506f6f6c3a206c696d697420666f722075736572207374616b652076616c756581525060200191505060405180910390fd5b5b3073ffffffffffffffffffffffffffffffffffffffff16634b94f50e6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015611ea257600080fd5b505af1158015611eb6573d6000803e3d6000fd5b505050506040513d6020811015611ecc57600080fd5b81019080805190602001909291905050509150611f0c82611efe670de0b6b3a76400003461393990919063ffffffff16565b61397190919063ffffffff16565b9050601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161515611fc0576001601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff0219169083151502179055505b61201534601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015461398790919063ffffffff16565b601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010181905550601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016060604051908101604052806120b242613d60565b67ffffffffffffffff168152602001348152602001838152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055506020820151816001015560408201518160020155505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561220157600080fd5b505af1158015612215573d6000803e3d6000fd5b5050505061222e3460045461398790919063ffffffff16565b60048190555061223c613b43565b73ffffffffffffffffffffffffffffffffffffffff1663eaf1311f3334846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b1580156122e657600080fd5b505af11580156122fa573d6000803e3d6000fd5b5050505061230661380d565b5050565b600860009054906101000a900460ff1681565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156123a657600080fd5b505af11580156123ba573d6000803e3d6000fd5b505050506040513d60208110156123d057600080fd5b8101908080519060200190929190505050905060008111156124365761242f81612421670de0b6b3a764000061241360055460045461398790919063ffffffff16565b61393990919063ffffffff16565b61397190919063ffffffff16565b9150612442565b670de0b6b3a764000091505b5090565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156124a657600080fd5b5b601280549050831015612512578467ffffffffffffffff166012848154811015156124ce57fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16141561250557612512565b82806001019350506124a7565b6012805490508314151561258e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f46656520666f72207468652061676520616c726561792065786973747300000081525060200191505060405180910390fd5b601260408051908101604052808767ffffffffffffffff1681526020018663ffffffff1681525090806001815401808255809150509060018203906000526020600020016000909192909190915060008201518160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555060208201518160000160086101000a81548163ffffffff021916908363ffffffff160217905550505050600160128054905011156127ed57600191505b81156127ec5760009150600092505b6001601280549050038310156127e75760126001840181548110151561267957fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff166012848154811015156126b457fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff1611156127da576012838154811015156126f557fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff16905060126001840181548110151561272b57fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1660128481548110151561275c57fe5b9060005260206000200160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550806012600185018154811015156127a257fe5b9060005260206000200160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550600191505b8280600101935050612657565b612648565b5b5050505050565b60095481565b6000600b80549050905090565b60065481565b6000806000806012805490501115612925578361282942613d60565b0391508167ffffffffffffffff16601260016012805490500381548110151561284e57fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16101515612924575b601280549050811015612923578167ffffffffffffffff166012828154811015156128a957fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16111515612916576012818154811015156128eb57fe5b9060005260206000200160000160089054906101000a900463ffffffff1663ffffffff16925061292a565b8080600101915050612882565b5b5b600092505b5050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561298c57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60055481565b60045481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612ac157600080fd5b5b601280549050811015612b2d578267ffffffffffffffff16601282815481101515612ae957fe5b9060005260206000200160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff161415612b2057612b2d565b8080600101915050612ac2565b60128054905081101515612ba9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f46656520666f722074686520616765206e6f7420666f756e640000000000000081525060200191505060405180910390fd5b81601282815481101515612bb957fe5b9060005260206000200160000160086101000a81548163ffffffff021916908363ffffffff160217905550505050565b60136020528060005260406000206000915090508060000160009054906101000a900460ff16908060010154905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612c7557600080fd5b600d60009054906101000a900460ff161515612cf9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f506f6f6c206973206e6f7420616374697665000000000000000000000000000081525060200191505060405180910390fd5b5b80600b805490501115612d1457612d0f6139a3565b612cfa565b6000600b805490501415612d87576000600d60006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc6009549081150290604051600060405180830381858888f19350505050158015612d85573d6000803e3d6000fd5b505b50565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612e77576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001807f546865206d6573736167652073656e646572206973206e6f742073657276696381526020017f650000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515612f1c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f4e6f64652063616e206e6f74206265207a65726f00000000000000000000000081525060200191505060405180910390fd5b6000600e54111515612f96576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6f20616374697665207265717565737473000000000000000000000000000081525060200191505060405180910390fd5b600d60009054906101000a900460ff168015612fb35750600f5484145b1561313857600b8054905082148015612fe55750600e543073ffffffffffffffffffffffffffffffffffffffff163110155b1561313757612ff2613b43565b73ffffffffffffffffffffffffffffffffffffffff1663238eba78600e5485600860009054906101000a900460ff166040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600381111561308e57fe5b60ff168152602001925050506000604051808303818588803b1580156130b357600080fd5b505af11580156130c7573d6000803e3d6000fd5b5050505050600b8390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050600190505b5b613140613b43565b73ffffffffffffffffffffffffffffffffffffffff16638560081c85836040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050600060405180830381600087803b1580156131b657600080fd5b505af11580156131ca573d6000803e3d6000fd5b505050506000600e819055506131de61380d565b50505050565b600a5481565b60115481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561324b57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156132f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f53657276696365206d757374206e6f742062652030783000000000000000000081525060200191505060405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561338f57600080fd5b8181601091906133a0929190613eda565b505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600c5481565b6000806000600b80549050111561365d573491503373ffffffffffffffffffffffffffffffffffffffff16600b600081548110151561340c57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156134b95760095460045481151561346257fe5b066009540390506009548110156134b3576134ac61349d60095461348f848661393990919063ffffffff16565b61397190919063ffffffff16565b83613d4790919063ffffffff16565b91506134b8565b600091505b5b600082111561365c576000600c54111561350c576135096134fa620f42406134ec600c548661393990919063ffffffff16565b61397190919063ffffffff16565b83613d4790919063ffffffff16565b91505b6135218260055461398790919063ffffffff16565b60058190555061352f613b43565b73ffffffffffffffffffffffffffffffffffffffff166354d7948f833073ffffffffffffffffffffffffffffffffffffffff16634b94f50e6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156135af57600080fd5b505af11580156135c3573d6000803e3d6000fd5b505050506040513d60208110156135d957600080fd5b81019080805190602001909291905050506040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050600060405180830381600087803b15801561364357600080fd5b505af1158015613657573d6000803e3d6000fd5b505050505b5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6136ab8434613d4790919063ffffffff16565b9081150290604051600060405180830381858888f193505050501580156136d6573d6000803e3d6000fd5b506136df61380d565b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561373e57600080fd5b61374781613d82565b50565b60128181548110151561375957fe5b906000526020600020016000915090508060000160009054906101000a900467ffffffffffffffff16908060000160089054906101000a900463ffffffff16905082565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154905090565b600d60009054906101000a900460ff16801561382b57506000600e54145b801561385057506009543073ffffffffffffffffffffffffffffffffffffffff163110155b1561393757600954600e81905550613866613b43565b73ffffffffffffffffffffffffffffffffffffffff16632f14c804600e54600f60008154600101919050819055600b80549050600860009054906101000a900460ff166040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808581526020018481526020018381526020018260038111156138f657fe5b60ff168152602001945050505050600060405180830381600087803b15801561391e57600080fd5b505af1158015613932573d6000803e3d6000fd5b505050505b565b60008083141561394c576000905061396b565b818302905081838281151561395d57fe5b0414151561396757fe5b8090505b92915050565b6000818381151561397e57fe5b04905092915050565b6000818301905082811015151561399a57fe5b80905092915050565b6139ab613b43565b73ffffffffffffffffffffffffffffffffffffffff1663f30b5925600b6001600b80549050038154811015156139dd57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600860009054906101000a900460ff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001826003811115613a8557fe5b60ff16815260200192505050602060405180830381600087803b158015613aab57600080fd5b505af1158015613abf573d6000803e3d6000fd5b505050506040513d6020811015613ad557600080fd5b810190808051906020019092919050505050600b6001600b8054905003815481101515613afe57fe5b9060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600b805480919060019003613b409190613f5a565b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0496d6a6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015613bcb57600080fd5b505af1158015613bdf573d6000803e3d6000fd5b505050506040513d6020811015613bf557600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff166324e4013a6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015613c6957600080fd5b505af1158015613c7d573d6000803e3d6000fd5b505050506040513d6020811015613c9357600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663e6f61b746040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015613d0757600080fd5b505af1158015613d1b573d6000803e3d6000fd5b505050506040513d6020811015613d3157600080fd5b8101908080519060200190929190505050905090565b6000828211151515613d5557fe5b818303905092915050565b60008190508067ffffffffffffffff1682141515613d7a57fe5b809050919050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515613dbe57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b815481835581811115613ea357818360005260206000209182019101613ea29190613f86565b5b505050565b815481835581811115613ed557600302816003028360005260206000209182019101613ed49190613fd7565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613f1b57803560ff1916838001178555613f49565b82800160010185558215613f49579182015b82811115613f48578235825591602001919060010190613f2d565b5b509050613f569190614021565b5090565b815481835581811115613f8157818360005260206000209182019101613f809190614021565b5b505050565b613fd491905b80821115613fd057600080820160006101000a81549067ffffffffffffffff02191690556000820160086101000a81549063ffffffff021916905550600101613f8c565b5090565b90565b61401e91905b8082111561401a57600080820160006101000a81549067ffffffffffffffff02191690556001820160009055600282016000905550600301613fdd565b5090565b90565b61404391905b8082111561403f576000816000905550600101614027565b5090565b905600a165627a7a72305820f791ccd2cd1b796d36fb0fcd028ea7f22edf9d408f81f59cc7eb5211a85d396c0029608060405233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506117a5806100546000396000f3006080604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b3146100ca57806318160ddd1461012f57806323b872dd1461015a57806340c10f19146101df578063661884631461022c57806370a0823114610291578063715018a6146102e85780638da5cb5b146102ff5780639dc29fac14610356578063a9059cbb146103a3578063d73dd62314610408578063dd62ed3e1461046d578063f2fde38b146104e4575b600080fd5b3480156100d657600080fd5b50610115600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610527565b604051808215151515815260200191505060405180910390f35b34801561013b57600080fd5b50610144610619565b6040518082815260200191505060405180910390f35b34801561016657600080fd5b506101c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610623565b604051808215151515815260200191505060405180910390f35b3480156101eb57600080fd5b5061022a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109de565b005b34801561023857600080fd5b50610277600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a49565b604051808215151515815260200191505060405180910390f35b34801561029d57600080fd5b506102d2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610cdb565b6040518082815260200191505060405180910390f35b3480156102f457600080fd5b506102fd610d23565b005b34801561030b57600080fd5b50610314610e28565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561036257600080fd5b506103a1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610e4e565b005b3480156103af57600080fd5b506103ee600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610eb8565b604051808215151515815260200191505060405180910390f35b34801561041457600080fd5b50610453600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d8565b604051808215151515815260200191505060405180910390f35b34801561047957600080fd5b506104ce600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112d4565b6040518082815260200191505060405180910390f35b3480156104f057600080fd5b50610525600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061135b565b005b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561067257600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156106fd57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561073957600080fd5b61078a826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061081d826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506108ee82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a3a57600080fd5b610a4482826113f8565b505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610b5b576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610bef565b610b6e83826113c390919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d7f57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610eaa57600080fd5b610eb48282611518565b5050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610f0757600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610f4357600080fd5b610f94826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611027826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061116982600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113b757600080fd5b6113c08161167d565b50565b60008282111515156113d157fe5b818303905092915050565b600081830190508281101515156113ef57fe5b80905092915050565b600061140f826001546113dc90919063ffffffff16565b600181905550611466826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113dc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115151561156557600080fd5b6115b6816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113c390919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061160d816001546113c390919063ffffffff16565b600181905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156116b957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820bf9b91a70bc6d08aa8b0b4f10598ac4a5ef61ee2269290aaee8a3c4781832a840029',
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
  abiPoolsWithLimit,
};
