import React from 'react';
import { ChainId, DAppProvider } from '@usedapp/core';

import RenderRoutes from './components/RenderRoutes';
import routes from './routes';
import './styles/Main.scss';

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
};
const Main = () => (
  <DAppProvider config={config}>
    <RenderRoutes routes={routes} />
  </DAppProvider>
);

export default Main;
