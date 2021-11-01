import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';

import Home from '../../pages/Home';
import Stacking from '../../pages/Stacking';
import appStore from '../../store/app.store';
import Footer from '../../layouts/Footer';

const RenderRoutes = observer(() =>
  !appStore.auth ? (
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
      <Route path="/stacking" exact render={() => <Stacking />} />
      <Redirect to="/stacking" />
    </Switch>
  ),
);

export default RenderRoutes;
