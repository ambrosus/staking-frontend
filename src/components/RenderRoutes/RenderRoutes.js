import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';

import storageService from '../../services/storage.service';
import Home from '../../pages/Home';
import Layout from '../../layouts/Layout';
import Stacking from '../../pages/Stacking';
import appStore from '../../store/app.store';

const RenderRoutes = observer(() => {
  useEffect(() => {
    if (!storageService.get('auth')) {
      appStore.setAuth(false);
    } else {
      appStore.setAuth(true);
    }
    return <div>Loading...</div>;
  }, [appStore.auth, storageService.get('auth')]);
  return !appStore.auth ? (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route
        path="/stacking"
        exact
        render={() => (
          <Layout>
            <Stacking />
          </Layout>
        )}
      />
      <Redirect to="/stacking" />
    </Switch>
  );
});

export default RenderRoutes;
