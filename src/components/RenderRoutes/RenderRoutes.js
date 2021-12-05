import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import Staking from '../../pages/Staking';
import Footer from '../layouts/Footer';
import { MAIN_PAGE, STAKING_PAGE } from '../../config';
import PoolsContextProvider from '../../context/poolsContext';

const RenderRoutes = observer(() => (
  <PoolsContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path={MAIN_PAGE} exact render={() => <Home />} />
        <Route path={STAKING_PAGE} exact render={() => <Staking />} />
        <Redirect to={MAIN_PAGE} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </PoolsContextProvider>
));

export default RenderRoutes;
