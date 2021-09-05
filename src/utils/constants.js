import { Connectors } from 'web3-react';

const { InjectedConnector } = Connectors;

export const CONNECT_TEXT = 'Connect Your Wallet';

const MetaMask = new InjectedConnector({
  supportedNetworks: [1, 4],
});
export default {
  MetaMask,
};
