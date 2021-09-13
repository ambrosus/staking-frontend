import React from 'react';
import { ChainId, DAppProvider } from '@usedapp/core';

import RenderRoutes from './components/RenderRoutes';
import './styles/Main.scss';

const config = {
  readOnlyChainId: ChainId.Mainnet,
};
const Main = () => (
  <DAppProvider config={config}>
    <RenderRoutes />
  </DAppProvider>
);

export default Main;
