import React from 'react';
import { DAppProvider } from '@usedapp/core';

import RenderRoutes from './components/RenderRoutes';
import './styles/Main.scss';

const config = {
  readOnlyChainId: 22032,
};
const Main = () => (
  <DAppProvider config={config}>
    <RenderRoutes />
  </DAppProvider>
);

export default Main;
