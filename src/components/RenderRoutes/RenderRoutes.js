import React from 'react';
import { Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import Staking from '../../pages/Staking';
import { MAIN_PAGE, STAKING_PAGE } from 'config';
import PoolsContextProvider from '../../context/poolsContext';
// eslint-disable-next-line
const Footer = React.lazy(() => import('../layouts/Footer'));

const RenderRoutes = observer(() => (
  <PoolsContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path={MAIN_PAGE} exact render={() => <Home />} />
        <Route path={STAKING_PAGE} exact render={() => <Staking />} />
      </Switch>
      <React.Suspense fallback={<div />}>
        <Footer />
      </React.Suspense>
    </BrowserRouter>
  </PoolsContextProvider>
));

export default RenderRoutes;
