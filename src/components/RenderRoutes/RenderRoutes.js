import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import Staking from '../../pages/Staking';
import appStore from '../../store/app.store';
import Footer from '../layouts/Footer';

const RenderRoutes = observer(() => (
  <BrowserRouter>
    {!appStore.auth ? (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <Home />
              <Footer />
            </>
          )}
        />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/staking" exact render={() => <Staking />} />
        <Redirect to="/staking" />
      </Switch>
    )}
  </BrowserRouter>
));

export default RenderRoutes;
