import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home';
import Staking from '../../pages/Staking';
import appStore from '../../store/app.store';
import Footer from '../layouts/Footer';
import { MAIN_PAGE, STAKING_PAGE } from '../../utils/constants';

const RenderRoutes = observer(() => (
  <BrowserRouter>
    {!appStore.auth ? (
      <Switch>
        <Route
          path={MAIN_PAGE}
          exact
          render={() => (
            <>
              <Home />
              <Footer />
            </>
          )}
        />
        <Redirect to={MAIN_PAGE} />
      </Switch>
    ) : (
      <Switch>
        <Route path={STAKING_PAGE} exact render={() => <Staking />} />
        <Redirect to={STAKING_PAGE} />
      </Switch>
    )}
  </BrowserRouter>
));

export default RenderRoutes;
