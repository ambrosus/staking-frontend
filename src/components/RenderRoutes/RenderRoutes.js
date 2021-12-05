import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import Staking from '../../pages/Staking';
import Footer from '../layouts/Footer';
import { MAIN_PAGE, STAKING_PAGE } from '../../config';

const RenderRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={MAIN_PAGE} exact render={() => <Home />} />
      <Route path={STAKING_PAGE} exact render={() => <Staking />} />
      <Redirect to={MAIN_PAGE} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default RenderRoutes;
