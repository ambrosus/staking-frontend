import React from 'react';
import { Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';

// import Home from '../../pages/Home';
import HomeStatic from '../../pages/HomeStatic';
// import Staking from '../../pages/Staking';
import { MAIN_PAGE } from 'config';
import PoolsContextProvider from '../../context/poolsContext';
// import Footer from 'components/layouts/Footer';
// eslint-disable-next-line

const RenderRoutes = observer(() => (
  <PoolsContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path={MAIN_PAGE} exact render={() => <HomeStatic />} />
        {/* <Route path={STAKING_PAGE} exact render={() => <Staking />} /> */}
      </Switch>
      <React.Suspense fallback={<div />}>{/* <Footer /> */}</React.Suspense>
    </BrowserRouter>
  </PoolsContextProvider>
));

export default RenderRoutes;
